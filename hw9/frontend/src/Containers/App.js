import { useEffect, useState } from "react";
//import './App.css'
import styled from "styled-components";
import {ChatRoom} from "./ChatRoom";
import SignIn from "./SignIn";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const LOCALSTORAGE_KEY = "save-me";

function App() {
  const savedme = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedme || "");
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    if(signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);

  return (
    <Wrapper>
      {
        signedIn ? 
        <ChatRoom me={me}/>
        :
        <SignIn me={me} setSignedIn={setSignedIn} setMe={setMe}/>
      }
    </Wrapper>
  );
}

export default App;
