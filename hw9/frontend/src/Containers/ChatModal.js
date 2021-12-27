import {useState} from 'react';
import { Modal, Input } from 'antd';

const ChatModal = ({ visible, onCreate, onCancel}) => {
  const [name, setName] = useState("");
  return (
    <Modal
      title="Create a new chat room"
      visible={visible}
      onOk={() => onCreate({name})}
      onCancel={onCancel}
    >
      <p>Who do you want to chat?</p>
      <Input placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
    </Modal>
  );
};

export default ChatModal;