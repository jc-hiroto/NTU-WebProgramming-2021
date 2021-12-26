import mongoose from 'mongoose';
const chatBoxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

export default mongoose.model('ChatBox', chatBoxSchema);