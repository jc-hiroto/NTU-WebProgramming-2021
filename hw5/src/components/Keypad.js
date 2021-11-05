function Keypad(props){
    const numkeys = [
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
            return;
        }
        if(props.operator){
            props.setdispNum(key);
            props.setOperator("");
        }
        else if(props.dispNum === '0'){
            if(key === '.'){
                props.setdispNum("0.")
            }else{
                props.setdispNum(key);
            }
        }
        else{
            props.setdispNum(props.dispNum + key);
        }
    }
    const handle_operator_keypress = (e) => {
        const key = e.target.id;
        console.log(key);
    }
    const renderKeypad = () => {
        return (
            <div className="grid-cols-3 grid-rows-4">
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
            <div className="">
            {operator_keys.map((key) => {
                return (
                    <div>
                        <button className="calc-keypad-btn justify-center m-1" id={key.id} onClick={handle_operator_keypress}>
                            <i className={key.icon + " self-center"}></i>
                        </button>
                    </div>

                )
            })}
            
            </div>
        )
    }
    return (
        <div className="grid grid-cols-3">
            <div></div>
            {renderKeypad()}
            {renderOperatorKeypad()}
        </div>
    )
}
export default Keypad;