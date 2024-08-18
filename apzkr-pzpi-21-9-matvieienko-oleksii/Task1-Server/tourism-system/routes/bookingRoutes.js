const express = require('express');
const router = express.Router();
const { Booking } = require('../models');

router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;