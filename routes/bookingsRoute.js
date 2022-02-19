const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const stripe = require('stripe')('sk_test_51KOtvLAN05eIhtIj6p0kYXbJhITQ0WBhFiyXjEwrCaiDr5QxMC7ixnDRVTbRlKAL1CxpiGMpzhjUozgqzB7tvmip00f56gShQ4')
const { v4: uuidv4 } = require("uuid");

router.post('/bookcar', async (req, res) => {

  const {token} = req.body
  try {

    const customer = await stripe.customers.create({
      email : token.email,
      source : token.id
    })

    const payment = await stripe.charges.create({
      amount : req.body.totalAmount * 100,
      currency : 'usd',
      customer : customer.id,
      receipt_email : token.email
    }, {
      idempotencyKey : uuidv4(),
    }
    );

    if(payment)
    {
      req.body.transactionId = payment.source.id
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send('Your booking was successfully saved.')
    }
    else {
        return res.status(400).json(error);
    }

    } catch (error) {
      console.log(error)
      return res.status(400).json(error);
    }
});

module.exports = router;