const express = require('express');
const router = express.Router();
const { DroneRental } = require('../models');

router.post('/', async (req, res) => {
    try {
        const droneRental = new DroneRental(req.body);
        await droneRental.save();
        res.status(201).send(droneRental);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const droneRentals = await DroneRental.find({});
        res.send(droneRentals);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const droneRental = await DroneRental.findById(req.params.id);
        if (!droneRental) {
            return res.status(404).send();
        }
        res.send(droneRental);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const droneRental = await DroneRental.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!droneRental) {
            return res.status(404).send();
        }
        res.send(droneRental);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const droneRental = await DroneRental.findByIdAndDelete(req.params.id);
        if (!droneRental) {
            return res.status(404).send();
        }
        res.send(droneRental);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;