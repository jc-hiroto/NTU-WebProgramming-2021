import {
  checkUser,
  checkChatBox,
  checkMessage,
  newUser,
  newChatBox,
  newMessage,
  makeName,
} from './utility';

const Mutation = {
  async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
    if (!name1 || !name2) {
      throw new Error('Missing chatbox name.');
    }
    if(!(await checkUser(db, name1, "createChatBox"))){
      console.log("User not exist for createChatBox");
      await newUser(db, name1);
    }
    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox){
      chatBox = await newChatBox(db, chatBoxName);
    }
    return chatBox;
  },

  async createMessage(parent, {from, to, body}, {db, pubsub}, info){
    const { chatBox, sender } = await checkMessage(db, from, to, body, "createMessage");
    if (!chatBox){
      throw new Error('Chatbox not exist for createMessage.');
    }
    if(!sender){
      throw new Error('User not exist for createMessage.');
    }
    const chatBoxName = makeName(from, to);
    const message = await newMessage(db, sender, body);
    chatBox.messages.push(message);
    await chatBox.save();
    pubsub.publish(`chatBox_${chatBoxName}`, {
      chatBox: {
        mutation: 'CREATED',
        data: message
      }
    });
    return message;
  }
};

export { Mutation };