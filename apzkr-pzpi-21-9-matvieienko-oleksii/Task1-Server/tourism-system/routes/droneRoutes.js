const express = require('express');
const router = express.Router();
const { Drone } = require('../models');

router.post('/', async (req, res) => {
    try {
        const drone = new Drone(req.body);
        await drone.save();
        res.status(201).send(drone);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const drones = await Drone.find({});
        res.send(drones);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id);
        if (!drone) {
            return res.status(404).send();
        }
        res.send(drone);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const drone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!drone) {
            return res.status(404).send();
        }
        res.send(drone);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const drone = await Drone.findByIdAndDelete(req.params.id);
        if (!drone) {
            return res.status(404).send();
        }
        res.send(drone);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;