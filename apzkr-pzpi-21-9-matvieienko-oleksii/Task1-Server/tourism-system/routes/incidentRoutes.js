const express = require('express');
const router = express.Router();
const { Incident } = require('../models');

router.post('/', async (req, res) => {
    try {
        const incident = new Incident(req.body);
        await incident.save();
        res.status(201).send(incident);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.find({});
        res.send(incidents);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).send();
        }
        res.send(incident);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!incident) {
            return res.status(404).send();
        }
        res.send(incident);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);
        if (!incident) {
            return res.status(404).send();
        }
        res.send(incident);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;