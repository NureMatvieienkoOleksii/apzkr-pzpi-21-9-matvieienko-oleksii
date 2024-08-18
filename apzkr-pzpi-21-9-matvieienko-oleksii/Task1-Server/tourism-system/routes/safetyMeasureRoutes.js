const express = require('express');
const router = express.Router();
const { SafetyMeasure } = require('../models');

router.post('/', async (req, res) => {
    try {
        const safetyMeasure = new SafetyMeasure(req.body);
        await safetyMeasure.save();
        res.status(201).send(safetyMeasure);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const safetyMeasures = await SafetyMeasure.find({});
        res.send(safetyMeasures);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const safetyMeasure = await SafetyMeasure.findById(req.params.id);
        if (!safetyMeasure) {
            return res.status(404).send();
        }
        res.send(safetyMeasure);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const safetyMeasure = await SafetyMeasure.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!safetyMeasure) {
            return res.status(404).send();
        }
        res.send(safetyMeasure);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const safetyMeasure = await SafetyMeasure.findByIdAndDelete(req.params.id);
        if (!safetyMeasure) {
            return res.status(404).send();
        }
        res.send(safetyMeasure);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;