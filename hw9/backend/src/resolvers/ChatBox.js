const ChatBox = {
  messages(parent, args, { db }, info) {
    return Promise.all(
      parent.messages.map(messageId => db.MessageModel.findById(messageId))
    );
  },
};

export default ChatBox;