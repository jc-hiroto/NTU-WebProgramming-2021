const checkUser = (db, name, errorFunc) => {
  if (!name){
    throw new Error(`${errorFunc}: Missing user name.`);
  }
  return db.UserModel.findOne({name});
};

const checkChatBox = (db, name, errorFunc) => {
  if (!name){
    throw new Error(`${errorFunc}: Missing chat box name.`);
  }
  return db.ChatBoxModel.findOne({name});
};

const checkMessage = async (db, from, to, message, errorFunc) => {
  const name = makeName(from, to);
  return{
    chatBox: await checkChatBox(db, name, errorFunc),
    sender: await checkUser(db, from, errorFunc),
    receiver: await checkUser(db, to, errorFunc),
  };
};

const newUser = (db, name) => {
  return new db.UserModel({name}).save();
};

const newChatBox = (db, name) => {
  return new db.ChatBoxModel({name}).save();
}

const newMessage = (db, sender, body) => {
  console.log(body);
  return new db.MessageModel({sender, body}).save();
};

const makeName = (name1, name2) => {
  return [name1, name2].sort().join('_');
};

export {
  checkUser,
  checkChatBox,
  checkMessage,
  newUser,
  newChatBox,
  newMessage,
  makeName,
};