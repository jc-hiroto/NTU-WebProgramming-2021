import NumDisplay from "../components/NumDisplay";
import Keypad from "../components/Keypad";
import {useState} from "react";
function CalcApp(){
    const [operator, setOperator] = useState("")
    const [dispNum, setdispNum] = useState("0")
    return (
        <div className="grid grid-flow-row">
            <NumDisplay num={dispNum}/>
            <Keypad dispNum={dispNum} operator={operator} setOperator={setOperator} setdispNum={setdispNum}/>
        </div>
    );
}
export default CalcApp;