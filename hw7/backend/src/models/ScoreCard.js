import mongoose from 'mongoose';

const ScoreCardSchema = mongoose.Schema({
    name: String,
    subject: String,
    score: Number
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);

module.exports = ScoreCard;
