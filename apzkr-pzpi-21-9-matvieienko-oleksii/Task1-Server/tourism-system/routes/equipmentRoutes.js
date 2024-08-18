const express = require('express');
const router = express.Router();
const { Equipment } = require('../models');

router.post('/', async (req, res) => {
    try {
        const equipment = new Equipment(req.body);
        await equipment.save();
        res.status(201).send(equipment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const equipments = await Equipment.find({});
        res.send(equipments);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).send();
        }
        res.send(equipment);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!equipment) {
            return res.status(404).send();
        }
        res.send(equipment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) {
            return res.status(404).send();
        }
        res.send(equipment);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;