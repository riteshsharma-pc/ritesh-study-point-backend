const express = require('express');
const Qna = require('../modules/Qna');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/addqna', [
    body('course').isString(),
    body('sem').isInt(),
    body('subjectCode').isInt(),
    body('unit').isInt(),
    body('question').isString(),
    body('answer').isString()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        const { course, sem, subjectCode, unit, question, imp, ytLink, answer } = req.body;
        if (!errors.isEmpty()) res.status(500).json({ success: false, response: errors.array()[0].msg });
        const queAndAns = new Qna({ course, sem, subjectCode, unit, question, imp, ytLink, answer })
        await queAndAns.save()
        res.json({ success: true, response: "question and answer added successfully" })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, response: error.message })
    }
})

router.get('/getqna', async (req, res) => {
    try {
        // const qnas = await Qna.find().sort({_id:-1}).skip(10).limit(10)
        const qnas = await Qna.find().sort({ _id: -1 })
        res.json({ success: true, response: qnas })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, response: error.message })
    }
})

router.put('/updateqna', [
    body('course').isString(),
    body('sem').isInt(),
    body('subjectCode').isInt(),
    body('unit').isInt(),
    body('question').isString(),
    body('answer').isString()
], async (req, res) => {
    try {
        const {_id, course, sem, subjectCode, unit, question, imp, ytLink, answer } = req.body;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array()[0].msg });

        const updatedQna = {
            course,
            sem,
            subjectCode,
            unit,
            question,
            imp,
            ytLink,
            answer
        }
        let qna = await Qna.findById(_id);
        if (!qna) return res.status(404).json({ success: false, response: "QNA not found" })
        qna = await Qna.findByIdAndUpdate(_id, { $set: updatedQna }, { new: true })
        res.json({ success: true, response: qna })

    } catch (error) {
        console.error(error.msg)
        res.status(500).json({ success: false, response: error.message })
    }
})
module.exports = router;