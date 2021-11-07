function Keypad(props){
    const numkeys = [
        ['(', ')', 'e'],
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['0', '.', 'AC']
    ];
    const operator_keys = [
        {
            id: "+",
            icon: "fas fa-plus"
        },
        {
            id: "-",
            icon: "fas fa-minus"
        },
        {
            id: "*",
            icon: "fas fa-times"
        },
        {
            id: "/",
            icon: "fas fa-divide"
        },
        {
            id: "=",
            icon: "fas fa-equals"
        }
    ];
    const handle_num_keypress = (e) => {
        const key = e.target.id;
        if(key === "." && props.dispNum.indexOf('.') > -1){
            return;
        }
        if(key === "AC"){
            props.setdispNum("0");
            props.setOperation("");
            props.setError("");
            return;
        }
        if(key === "="){
            if(!props.dispNum.match(/[(e+\-*\/^)]/)){
                return;
            }
            props.setOperation(props.dispNum);
            try{
                var ans = eval(props.dispNum.replace("^","**"));
            }catch(e){
                props.setError(e.message);
                return;
            }
            if(!props.error){
                let exp = Math.floor(Math.log(ans)/Math.log(10));
                console.log(exp);
                console.log(ans/(10**exp));
                if(exp > 9){
                    ans = ans/(10**exp)+"e"+exp;
                }
                props.setdispNum(ans.toString());
                return;
            }
        }
        else if(props.dispNum === '0'){
            if(key === '.'){
                props.setdispNum("0.")
            }
            else{
                props.setdispNum(key);
            }
        }
        else{
            props.setdispNum(props.dispNum + key);
        }
    }
    const handleRecall = (num) => {
        console.log(num);
        if(props.dispNum === '0'){
            props.setdispNum(num);
        }else{
            props.setdispNum(props.dispNum + num);
        }
    }
    const renderKeypad = () => {
        return (
            <div className="grid grid-cols-3 w-64 h-96 justify-self-center ml-5 mr-5">
            {numkeys.map((row, i) => {
                return (
                            row.map((numkey) => {
                                return (
                                    <button className="calc-keypad-btn m-1" id={numkey} onClick={handle_num_keypress}>
                                        {numkey}
                                    </button>
                                )
                            })
                )
            })}
            </div>
        )
    }
    const renderOperatorKeypad = () => {
        return (
            <div className="grid grid-cols-1">
            {operator_keys.map((key) => {
                return (
                    <button className="calc-keypad-btn justify-center m-1" id={key.id} onClick={handle_num_keypress}>
                        <i className={key.icon + " self-center"} id={key.id}></i>
                    </button>

                )
            })}
            
            </div>
        )
    }
    const renderNumHist = () => {
        return props.numMem.map((num, i) => {
            return (
                <div className="flex flex-row mt-1 mb-1 h-10 w-40 bg-indigo-100 hover:bg-indigo-300 rounded-xl justify-center self-center cursor-pointer" key={i} onClick={() => handleRecall(num)}>
                    <i className="fas fa-history fa-lg self-center"></i>
                    <p className="self-center font-bold text-xl text-indigo-800 ml-2">{num}</p>
                </div>
            )
        })
    }
    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-start">
                <div className="flex flex-row justify-center self-center mr-1 ml-1">
                    <button className="calc-keypad-btn justify-center m-1" id="btn-save" onClick={props.handleSaveNum}>
                        <i className="fas fa-file-import self-center"></i>
                    </button>
                    <button className="calc-keypad-btn justify-center m-1" id="btn-clear-mem" onClick={props.handleClearMem}>
                        <i className="fas fa-eraser self-center"></i>
                    </button>
                </div>
                <div className="flex flex-col">
                    {renderNumHist()}
                </div>
            </div>
            {renderKeypad()}
            {renderOperatorKeypad()}
        </div>
    )
}
export default Keypad;