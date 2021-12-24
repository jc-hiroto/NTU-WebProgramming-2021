import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

function mongo(){
  mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
      console.log('connected to mongo');
  });
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true }
  });
  const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true }
  })
  const chatBoxSchema = new mongoose.Schema({
    name: { type: String, required: true },
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
  });
  const UserModel = mongoose.model('User', userSchema)
  const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema)
  const MessageModel = mongoose.model('Message', messageSchema)
}

export default mongo