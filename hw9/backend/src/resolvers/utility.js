const checkUser = (db, name, errorFunc) => {
  if (!name){
    throw new Error(`${errorFunc}: Missing user name.`);
  }
  return db.UserModal.findOne({name});
};

const newUser = (db, name) => {
  return new db.UserModal({name}).save();
};

const newChatBox = (db, name) => {
  return new db.ChatBoxModal({name}).save();
}