//import './App.css'
import { Button, Input, Tabs } from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
import Title from "../Components/Title";
import ChatBox from "./ChatBox";
import ChatModal from "./ChatModal";
import displayStatus from "../Components/DisplayStatus";
import useChatBox from "../Hooks/useChatBox";

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #f0f2f5;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  display: flex;
  overflow: auto;
`;

const ChatRoom = ({me}) => {
  const [body, setBody] = useState("");
  const [ act, setAct ] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [ toggleModal, setToggleModal ] = useState(false);

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const renderModal = () => {
    setToggleModal(true);
  };

  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
      </Title>
      <Wrapper tabBarStyle={{height: "36px"}}type="editable-card" activeKey={act}
        onChange={ () => {setAct(act)} }
        onEdit={(targetKey, action) => {
          if (action === 'add') {
            renderModal();
          }else if (action === 'remove') {
            setAct(removeChatBox(targetKey, act));
          }
        }}
      >
        {
          chatBoxes.map((to) => {
            return (
              <Tabs.TabPane tab={to} closable={true} key={to}>
                <ChatBox me={me} to={to} key={to} />
              </Tabs.TabPane>
            );
          })
        }

      </Wrapper>
      <ChatModal visible={toggleModal}
          onCreate={async ({ name }) => {
              if (chatBoxes.includes(name)) {
                  displayStatus({
                      type: 'error',
                      msg: `You are already chatting with ${name}`,
                  });
                  return;
              }
              await startChat({variables: {name1: me, name2: name}});
              setAct(createChatBox(name));
              setToggleModal(false);
          }}
          onCancel={() => {
              setToggleModal(false);
          }}
      />

      <Input.Search value={body} onChange={e => setBody(e.target.value)}
          enterButton="Send" placeholder="Say something..." onSearch={(msg) => {
            if (!msg || !me) {
              displayStatus({
                type: "error",
                msg: "Please enter message and name."
              });
              return;
            }
            sendMessage({
              variables: {
                  from: me,
                  to: act,
                  message: body
              }
            });
            setBody("");}
          }>
        </Input.Search>
    </>
  );
};

export {ChatRoom, displayStatus};
