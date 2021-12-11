import mongoose from 'mongoose';

const dbMsgSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required/"]
    },
    body: {
        type: String,
        required: [true, "Body field is required/"]
    },
});
const dbMsg = mongoose.model('dbMsg', dbMsgSchema);

module.exports = dbMsg;
