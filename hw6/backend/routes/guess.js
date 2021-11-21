import express from 'express';
import { genNumber, getNumber } from '../core/getNumber';
const router = express.Router();
router.get('/', (req, res) => {
    res.json({
      msg: 'Hi!'
    })
  });
router.post('/start', (req, res) => {
  genNumber()
  res.json({
    msg: 'The game has started.'
  })
});
router.get('/guess', (req, res) => {
    const number = getNumber();
    console.log(number);
    const guess = parseInt(req.query.number, 10);
    if (!guess || guess < 0 || guess > 100) {
        res.status(400).send({
            msg: 'Invalid guess. Number illegal. (Number should be in the range of 1 to 100)',
            status: -1
        })
    }
    else if(number > guess) {
        res.json({
            msg: 'Bigger',
            status: 2
        })
    }
    else if(number < guess) {
        res.json({
            msg: 'Smaller',
            status: 1
        })
    }
    else if(number === guess){
        res.json({
            msg: 'You guessed the number!',
            status: 0
        })
    }
});
router.post('/restart', (req, res) => {
    genNumber();
    res.json({
        msg: 'The game has restarted.'
    })
});

export default router;