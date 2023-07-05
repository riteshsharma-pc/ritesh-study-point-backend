const express = require('express');
const Theory = require('../modules/Theory');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/addtheory', [
    body('course').isString(),
    body('sem').isInt(),
    body('subjectCode').isInt(),
    body('unit').isInt(),
    body('topic').isString(),
    body('description').isString()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        const { course, sem, subjectCode, unit, topic, imp, ytLink, description } = req.body;
        if (!errors.isEmpty()) res.status(500).json({ success: false, response: errors.array()[0].msg });
        const theory = new Theory({ course, sem, subjectCode, unit, topic, imp, ytLink, description })
        await theory.save()
        res.json({ success: true, response: "theory added successfully" })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, response: error.message })
    }
})

router.get('/gettheory', async (req, res) => {
    try {
        const theory = await Theory.find().sort({ _id: -1 })
        res.json({ success: true, response: theory })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, response: error.message })
    }
})

router.put('/updatetheory', [
    body('course').isString(),
    body('sem').isInt(),
    body('subjectCode').isInt(),
    body('unit').isInt(),
    body('topic').isString(),
    body('description').isString()
], async (req, res) => {
    try {
        const { _id, course, sem, subjectCode, unit, topic, imp, ytLink, description } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array()[0].msg });

        const updatedTheory = {
            course,
            sem,
            subjectCode,
            unit,
            topic,
            imp,
            ytLink,
            description
        }
        let theory = await Theory.findById(_id);
        if (!theory) return res.status(404).json({ success: false, response: "Theory not found" })
        theory = await Theory.findByIdAndUpdate(_id, { $set: updatedTheory }, { new: true })
        res.json({ success: true, response: theory })

    } catch (error) {
        console.error(error.msg)
        res.status(500).json({ success: false, response: error.message })
    }
})

router.delete('/deletetheory/:id', async (req, res) => {
    try {
        const { id } = req.params
        let theory = await Theory.findById(id);
        if (!theory) return res.status(404).json({ success: false, response: "Theory not found" })
        theory = await Theory.findByIdAndDelete(id)
        res.json({success: true, response: theory})
    } catch (error) {
        console.error(error.msg)
        res.status(500).json({ success: false, response: error.message })
    }
})
module.exports = router;