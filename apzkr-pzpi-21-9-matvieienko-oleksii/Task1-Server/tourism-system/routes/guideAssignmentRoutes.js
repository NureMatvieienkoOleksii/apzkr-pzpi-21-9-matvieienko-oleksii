const express = require('express');
const router = express.Router();
const { GuideAssignment } = require('../models');

router.post('/', async (req, res) => {
    try {
        const guideAssignment = new GuideAssignment(req.body);
        await guideAssignment.save();
        res.status(201).send(guideAssignment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const guideAssignments = await GuideAssignment.find({});
        res.send(guideAssignments);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const guideAssignment = await GuideAssignment.findById(req.params.id);
        if (!guideAssignment) {
            return res.status(404).send();
        }
        res.send(guideAssignment);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const guideAssignment = await GuideAssignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!guideAssignment) {
            return res.status(404).send();
        }
        res.send(guideAssignment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const guideAssignment = await GuideAssignment.findByIdAndDelete(req.params.id);
        if (!guideAssignment) {
            return res.status(404).send();
        }
        res.send(guideAssignment);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;