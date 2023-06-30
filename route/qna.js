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

module.exports = router;