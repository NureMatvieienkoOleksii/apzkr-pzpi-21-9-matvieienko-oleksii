const express = require('express');
const router = express.Router();
const { DroneOperator } = require('../models');

router.post('/', async (req, res) => {
    try {
        const droneOperator = new DroneOperator(req.body);
        await droneOperator.save();
        res.status(201).send(droneOperator);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const droneOperators = await DroneOperator.find({});
        res.send(droneOperators);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const droneOperator = await DroneOperator.findById(req.params.id);
        if (!droneOperator) {
            return res.status(404).send();
        }
        res.send(droneOperator);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const droneOperator = await DroneOperator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!droneOperator) {
            return res.status(404).send();
        }
        res.send(droneOperator);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const droneOperator = await DroneOperator.findByIdAndDelete(req.params.id);
        if (!droneOperator) {
            return res.status(404).send();
        }
        res.send(droneOperator);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;