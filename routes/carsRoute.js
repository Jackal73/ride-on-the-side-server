const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async(req, res) =>{
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
      return res.status(400).json(error);
  }
});

router.post("/addcar", async(req, res) =>{
  try {
    const newcar = new Car(req.body)
    await newcar.save();
    res.send("The New Car was added successfully");
  } catch (error) {
      return res.status(400).json(error);
  }
});

router.post("/editcar", async(req, res) => {
  try { 
    const car = await Car.findOne({_id : req.body._id})

    // Add statically to avoid mongoDB _id issues
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();
    res.send("The Car was updated successfully");
  } catch (error) {
      return res.status(400).json(error);
  }
});
module.exports = router;
