const express = require('express');
const router = express.Router();
const { Tourist } = require('../models');

router.post('/', async (req, res) => {
    try {
        const tourist = new Tourist(req.body);
        await tourist.save();
        res.status(201).send(tourist);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const tourists = await Tourist.find({});
        res.send(tourists);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).send();
        }
        res.send(tourist);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const tourist = await Tourist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tourist) {
            return res.status(404).send();
        }
        res.send(tourist);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const tourist = await Tourist.findByIdAndDelete(req.params.id);
        if (!tourist) {
            return res.status(404).send();
        }
        res.send(tourist);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;