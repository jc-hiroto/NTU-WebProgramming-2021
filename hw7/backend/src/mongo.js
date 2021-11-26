import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
dotenv.config();
const ScoreCard = require('./models/ScoreCard');

const connect_mongo = () => {
    mongoose.connect(process.env.MONGO_URL, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected to mongo');
    });
};

const clearDB = () => {
    ScoreCard.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
            return err;
        }
    });
};

const addScoreCard = (scoreCard) => {
    const newScoreCard = new ScoreCard(scoreCard);
    newScoreCard.save((err) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            return newScoreCard;
        }
    });
};

const queryByName = (name) => {
    return ScoreCard.find({ name: name });
};

const queryBySubject = (subject) => {
    return ScoreCard.find({ subject: subject });
};

export { connect_mongo, addScoreCard, queryByName, queryBySubject, clearDB };
