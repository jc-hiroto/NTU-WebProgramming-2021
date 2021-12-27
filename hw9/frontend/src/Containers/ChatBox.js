import { useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import Message from "../Components/Message";
import { CHATBOX_MSG_QUERY, CHATBOX_SUBSCRIPTION } from "../graphql";
import { Space } from "antd";
const ChatBox = ({ me, to, ...props}) => { 
  const { data, loading, error, subscribeToMore } = useQuery(CHATBOX_MSG_QUERY, {
    variables: { name1: me, name2: to },
    pollInterval: 1000
  });
  const messageEnd = useRef(null);
  const scrollToLastMessage = () => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToLastMessage();
  }, [data]);

  useEffect(() => {
    try {
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: { name1: me, name2: to },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMsg = subscriptionData.data.chatBox.data;
          const newData = [...prev.allMessages, newMsg];
          return {
            ...prev,
            allMessages: newData
          };
        }
      });
    }
    catch (e) {
      console.log(e);
    }
  }, [subscribeToMore, me, to]);
  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;
  return(
    <Space direction="vertical" style={{width: "100%"}}>
      {
        data.allMessages.map(({ sender: {name}, body }, i) => {
          return (
            <Message me={me} name={name} body={body} key={i}/>
          );
        })
      }
      <div ref={messageEnd} />
    </ Space>
  );
};


export default ChatBox;