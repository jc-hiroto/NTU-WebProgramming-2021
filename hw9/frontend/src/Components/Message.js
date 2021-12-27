import { Tag, Row, Col, Typography } from "antd";
const { Text } = Typography;
const Message = ({me, name, body}) => {
  return (
    <Row justify={ name === me ? "end" : "start"} align="middle" >
        <Tag color={ name === me ? "#108ee9" : "blue"}>{name}</Tag>
        <Text>{body}</Text>
    </Row>
  );
};

export default Message;
