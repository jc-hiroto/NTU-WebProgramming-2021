import styled from 'styled-components';

const MessageStyle = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const Message = ({me, name, msg}) => {
  return (
    <MessageStyle>
      <p>{name}</p>
      <p>{msg}</p>
    </MessageStyle>
  );
};

export default Message;
