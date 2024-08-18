const express = require('express');
const router = express.Router();
const { Guide } = require('../models');

router.post('/', async (req, res) => {
    try {
        const guide = new Guide(req.body);
        await guide.save();
        res.status(201).send(guide);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const guides = await Guide.find({});
        res.send(guides);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) {
            return res.status(404).send();
        }
        res.send(guide);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!guide) {
            return res.status(404).send();
        }
        res.send(guide);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id);
        if (!guide) {
            return res.status(404).send();
        }
        res.send(guide);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;