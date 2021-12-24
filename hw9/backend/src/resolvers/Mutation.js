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
  }
};

export default Mutation;