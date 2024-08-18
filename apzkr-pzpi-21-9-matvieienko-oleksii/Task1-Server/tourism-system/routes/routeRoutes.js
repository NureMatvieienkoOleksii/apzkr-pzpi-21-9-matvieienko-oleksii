const express = require('express');
const router = express.Router();
const { Route } = require('../models');

router.post('/', async (req, res) => {
    try {
        const route = new Route(req.body);
        await route.save();
        res.status(201).send(route);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const routes = await Route.find({});
        res.send(routes);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).send();
        }
        res.send(route);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!route) {
            return res.status(404).send();
        }
        res.send(route);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) {
            return res.status(404).send();
        }
        res.send(route);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;