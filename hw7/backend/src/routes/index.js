import express from 'express';
import { clearDB, addScoreCard, queryByName, queryBySubject } from '../mongo';
const ScoreCard = require('../models/ScoreCard.js');
const router = express.Router();
router.delete('/clear-db', (req, res) => {
    clearDB();
    res.json({
    message: 'Database cleared'
  })
});
router.get('/query-cards', (req, res) => {
    if (req.query.type === 'name') {
        queryByName(req.query.queryString).then(cards => {
            if (cards.length === 0) {
                cards[0] = `Name (${req.query.queryString}) not found!`;
                res.json({
                    messages: cards,
                    message: 'Success.'
                })
            }
            else{
                const resp = cards.map(card => {
                    return `Name: ${card.name}, Subject: ${card.subject}, Score: ${card.score}`;
                });
                res.json({
                    messages: resp,
                    message: 'Success.'
                })
            }
        })
    }
    if(req.query.type === 'subject') {
        queryBySubject(req.query.queryString).then(cards => {
            if (cards.length === 0) {
                cards[0] = `Subject (${req.query.queryString}) not found!`;
            }
            res.json({
                messages: cards,
                message: 'Success.'
            })
        })
    }
});
router.post('/create-card', (req, res) => {
    // TODO: Add validation
    const newScoreCard = new ScoreCard({
        name: req.body.name,
        subject: req.body.subject,
        score: req.body.score
    });
    const operation = "Adding";
    const msg = `${operation} (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
    res.json({
        message: msg,
        card: addScoreCard(newScoreCard)
    });
});

export default router;