import {React, useState} from "react";
const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);
  const createChatBox = (to) => {
    if (chatBoxes.some((name) => to === name)) {
      throw new Error("You are already chatting with " +to);
    }
    setChatBoxes([...chatBoxes, to]);
    return to;
  };

  const removeChatBox = (tar, act) => {
    const idx = chatBoxes.indexOf(act);
    const newChatBoxes = chatBoxes.filter((name) => name !== tar);
    setChatBoxes(newChatBoxes);
    return act
  };
  return { chatBoxes, createChatBox, removeChatBox };
};

export default useChatBox;