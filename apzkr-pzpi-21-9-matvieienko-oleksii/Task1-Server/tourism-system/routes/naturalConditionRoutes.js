const express = require('express');
const router = express.Router();
const { NaturalCondition } = require('../models');

router.post('/', async (req, res) => {
    try {
        const naturalCondition = new NaturalCondition(req.body);
        await naturalCondition.save();
        res.status(201).send(naturalCondition);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const naturalConditions = await NaturalCondition.find({});
        res.send(naturalConditions);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const naturalCondition = await NaturalCondition.findById(req.params.id);
        if (!naturalCondition) {
            return res.status(404).send();
        }
        res.send(naturalCondition);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const naturalCondition = await NaturalCondition.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!naturalCondition) {
            return res.status(404).send();
        }
        res.send(naturalCondition);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const naturalCondition = await NaturalCondition.findByIdAndDelete(req.params.id);
        if (!naturalCondition) {
            return res.status(404).send();
        }
        res.send(naturalCondition);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;