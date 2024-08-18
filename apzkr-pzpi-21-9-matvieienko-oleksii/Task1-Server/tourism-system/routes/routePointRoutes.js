const express = require('express');
const router = express.Router();
const { RoutePoint } = require('../models');

router.post('/', async (req, res) => {
    try {
        const routePoint = new RoutePoint(req.body);
        await routePoint.save();
        res.status(201).send(routePoint);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const routePoints = await RoutePoint.find({});
        res.send(routePoints);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const routePoint = await RoutePoint.findById(req.params.id);
        if (!routePoint) {
            return res.status(404).send();
        }
        res.send(routePoint);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const routePoint = await RoutePoint.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!routePoint) {
            return res.status(404).send();
        }
        res.send(routePoint);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const routePoint = await RoutePoint.findByIdAndDelete(req.params.id);
        if (!routePoint) {
            return res.status(404).send();
        }
        res.send(routePoint);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;