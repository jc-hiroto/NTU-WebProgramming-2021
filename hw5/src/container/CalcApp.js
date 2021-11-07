import NumDisplay from "../components/NumDisplay";
import Keypad from "../components/Keypad";
import {useState} from "react";
function CalcApp(){
    const [operation, setOperation] = useState("");
    const [dispNum, setDispNum] = useState("0");
    const [error, setError] = useState("");
    const [numMem, setNumMem] = useState([]);
    const handleSaveNum = () => {
        console.log(dispNum);
        if(dispNum === "0" || dispNum === "")
            return;
        if(numMem.length === 0){
            setNumMem([dispNum]);
        }else{
            setNumMem([...numMem, dispNum]);
        }
    }
    const handleClearMem = () => {
        setNumMem([]);
    }
    const handleUndo = () => {
        if(operation !== ""){
            setError("");
            setDispNum(operation);
            setOperation("");
        }
    }
    const handleBackspace = () => {
        if (dispNum.length > 1) {
            setDispNum(dispNum.slice(0, -1));
        }else{
            setDispNum("0");
        }
    }
    return (
        <div className="grid grid-flow-row">
            <NumDisplay setDispNum={setDispNum} dispNum={dispNum} error={error} operation={operation} handleBackspace={handleBackspace} handleUndo={handleUndo}/>
            <Keypad dispNum={dispNum} operation={operation} setOperation={setOperation} setdispNum={setDispNum} setError={setError} numMem={numMem} handleSaveNum={handleSaveNum} handleClearMem={handleClearMem}/>
        </div>
    );
}
export default CalcApp;