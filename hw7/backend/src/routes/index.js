import express from 'express';
import { clearDB, addScoreCard, queryByName, queryBySubject, queryByNameAndSubject } from '../mongo';
const ScoreCard = require('../models/ScoreCard.js');
const router = express.Router();
var operation = "";
router.delete('/clear-db', async(req, res) => {
    try {
        await clearDB();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.toString(),
            message: 'Error clearing database.'
        });
    }
    res.json({
    message: 'Database cleared.'
  })
});
router.get('/query-cards', async(req, res) => {
    try {
        if (req.query.type === 'name') {
            await queryByName(req.query.queryString).then(cards => {
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
            await queryBySubject(req.query.queryString).then(cards => {
                if (cards.length === 0) {
                    cards[0] = `Subject (${req.query.queryString}) not found!`;
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
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.toString(),
            message: 'Error querying database.'
        });
    }
});
router.post('/create-card', async(req, res) => {
    // TODO: Add validation
    const newScoreCard = new ScoreCard({
        name: req.body.name,
        subject: req.body.subject,
        score: req.body.score
    });
    try {
        await queryByNameAndSubject(req.body.name, req.body.subject).then(cards => {
            if (cards.length === 0) {
                operation = "Adding";
            } else {
                operation = "Updating";
            }
        })
    }catch(err) {
        console.log(err);
        res.status(500).send({
            error: err.toString(),
            message: 'Error querying database.'
        });
    }
    const msg = `${operation} (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
    try{
        res.json({
            message: msg,
            card: await addScoreCard(newScoreCard)
        })
    }catch(err) {
        console.log(err);
        res.status(500).send({
            error: err.toString(),
            message: 'Error upserting/updating database.'
        });
    }
});

export default router;