import { Input } from "antd";
import { userOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import displayStatus from "../Components/DisplayStatus";
const SignIn = ({ me, setMe, setSignedIn }) => {
    return (
    <>
        <Title>
            <h1>My Chat Room</h1>
        </Title>
        <Input.Search
            prefix={<userOutlined />}
            value={me} enterButton="Sign In" 
            placeholder="Enter your name!" size="large"
            style={{ width: 300, margin: 50 }}
            onChange={(e) => setMe(e.target.value)}
            onSearch={(name) => {
                if(!name){
                    displayStatus({
                        type: "error",
                        msg: "Please enter a name!"
                    });
                }else{
                    setSignedIn(true);
                    displayStatus({
                        type: "success",
                        msg: "Welcome to the chat room!"
                    });
                }
                }
            }
        />
    </>
    );
};

export default SignIn;
