import {
  checkUser,
  checkChatBox,
  checkMessage,
  newUser,
  newChatBox,
  newMessage,
  makeName,
} from './utility';

const Query = {
  async allMessages(parent, { name1, name2 }, { db }, info) {
    const chatBoxName = makeName(name1, name2);
    const chatBox = await checkChatBox(db, chatBoxName, "getAllMessages");
    if (!chatBox) {
      throw new Error('Chatbox not exist for getAllMessages.');
    }
    const messages = await chatBox.messages.map( async messageId => {
      return await db.MessageModel.findById(messageId);
    });
    return messages;
  },
};

export { Query };