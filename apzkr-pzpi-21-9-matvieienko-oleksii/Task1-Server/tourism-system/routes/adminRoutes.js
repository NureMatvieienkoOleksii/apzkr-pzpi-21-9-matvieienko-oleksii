const express = require('express');
const router = express.Router();
const { Admin } = require('../models');

router.post('/', async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.send(admins);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send();
        }
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!admin) {
            return res.status(404).send();
        }
        res.send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).send();
        }
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;