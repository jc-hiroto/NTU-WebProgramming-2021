//import './App.css'
import { Button, Input, Tag } from "antd";
import { useState, useEffect } from "react";
import Title from "../Components/Title";
import Message from "../Components/Message";
import displayStatus from "../Components/DisplayStatus";

const ChatRoom = ({me, status, messages, clearMessages, sendData}) => {
  const [body, setBody] = useState("");
  const sendMessage = (payload) => {
    sendData(["input", payload]);
  }
  useEffect(() => {
    displayStatus(status)}, [status]);
  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </Title>
      <Message>
        {messages.map(({ name, body }, i) => (
          <p className="App-message" key={i}>
            <Tag color="blue">{name}</Tag> {body}
          </p>
        ))}
      </Message>
      <Input.Search value={body} onChange={e => setBody(e.target.value)}
                    enterButton="Send" placeholder="Say something..." onSearch={
                      (msg) => {
                        if (!msg || !me) {
                          displayStatus({
                            type: "error",
                            msg: "Please enter message and name."
                          });
                          return;
                        }
                        console.log({ name: me, body: msg});
                        sendMessage({ name: me, body: msg});
                        setBody("");
                      }
                    }></Input.Search>
    </>
  );
};

export {ChatRoom, displayStatus};
