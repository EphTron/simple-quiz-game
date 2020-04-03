import express, {CookieOptions, Request, Response} from 'express';
import config from 'config';
import {getMsg} from "../lib/util";
import Question, {IQuestion} from "../models/question";
import *  as  sampleQuestions from '../questions.json';

// sampleQuestions: IQuestion = (sampleQuestionsRaw as IQuestion).default;

const router = express.Router();

function random(mx): number {
    return Math.floor(Math.random() * (mx - 0));
}

function addQuestions(): boolean {
    return true;
}

router.get('/:category', async (req, res) => {
    try {
        const requestedCategory = req.params.category;
        console.log('Request for ' + requestedCategory);
        const questions = await Question.find({category: requestedCategory});
        if (questions.length == 0) {
            try {
                let createdQuestions: any[] = [];
                sampleQuestions.questions.forEach( async(value) => {
                    const q = await new Question({
                        question: value.question,
                        answer: value.answer,
                        category: value.category
                    }).save();
                    createdQuestions.push(q);
                });
                const qid = random(createdQuestions.length);
                const selectedQuestion = createdQuestions[qid];
                return res.status(200).send(getMsg(true, 'Created questions.', selectedQuestion));
            } catch (e) {
                return res.status(401).send(getMsg(false, 'Could not create questions.'));
            }
        }
        const qid = random(questions.length);
        const selectedQuestion = questions[qid];
        console.log('Selected question: ', selectedQuestion.question, ' with id: ', qid);
        return res.status(200).send(getMsg(true, 'Question id: ', selectedQuestion));
    } catch (err) {
        return res.status(500).send({success: false, data: err});
    }
});

export const QuestionController = router;
