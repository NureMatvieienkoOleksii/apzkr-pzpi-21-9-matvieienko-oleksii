const express = require('express');
const router = express.Router();
const { DroneFlight } = require('../models');

router.post('/', async (req, res) => {
    try {
        const droneFlight = new DroneFlight(req.body);
        await droneFlight.save();
        res.status(201).send(droneFlight);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const droneFlights = await DroneFlight.find({});
        res.send(droneFlights);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const droneFlight = await DroneFlight.findById(req.params.id);
        if (!droneFlight) {
            return res.status(404).send();
        }
        res.send(droneFlight);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const droneFlight = await DroneFlight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!droneFlight) {
            return res.status(404).send();
        }
        res.send(droneFlight);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const droneFlight = await DroneFlight.findByIdAndDelete(req.params.id);
        if (!droneFlight) {
            return res.status(404).send();
        }
        res.send(droneFlight);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;