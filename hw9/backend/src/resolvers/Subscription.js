import {
  checkUser,
  checkChatBox,
  checkMessage,
  newUser,
  newChatBox,
  newMessage,
  makeName,
} from './utility';

const Subscription = {
  chatBox: {
    async subscribe(parent, { name1, name2 }, { pubsub, db }, info) {
      const chatBoxName = makeName(name1, name2);
      const chatBox = await checkChatBox(db, chatBoxName, "subscribe");
      if (!chatBox) {
        throw new Error('Chatbox not exist for subscribe.');
      }
      return pubsub.asyncIterator(`chatBox_${chatBoxName}`);
    }
  }
};

export { Subscription };