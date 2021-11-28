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

const clearDB = async() => {
    try{
        await ScoreCard.deleteMany({});
        console.log('DB cleared');
    }catch(err){
        throw new Error("Database deletion failed. Trace: "+err.toString());
    }
};

const addScoreCard = async(scoreCard) => {
    try{
        await ScoreCard.findOneAndUpdate({ name: scoreCard.name, subject: scoreCard.subject }, {$set:{score: scoreCard.score}}, { upsert: true });
        return true;
    }catch(err){
        throw new Error("Database insertion failed. Trace: "+err.toString());
    }
};

const queryByName = async(name) => {
    try{
        return await ScoreCard.find({ name: name });
    }catch(err){
        throw new Error("Database query failed. Trace: "+err.toString());
    }
};

const queryBySubject = async(subject) => {
    try{
        return await ScoreCard.find({ subject: subject });
    }catch(err){
        throw new Error("Database query failed. Trace: "+err.toString());
    }
};

const queryByNameAndSubject = async(name, subject) => {
    try{
        return await ScoreCard.find({ name: name, subject: subject });
    }catch(err){
        throw new Error("Database query failed. Trace: "+err.toString());
    }
};

export { connect_mongo, addScoreCard, queryByName, queryBySubject, queryByNameAndSubject, clearDB };
