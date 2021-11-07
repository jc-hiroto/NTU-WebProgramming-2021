function NumDisplay(props) {
    const render_error_msg = () => {
        if (props.error) {
            console.log(props.error);
            return (
                <div class="text-center py-4 lg:px-4">
                    <div class="p-2 bg-red-800 items-center text-red-100 leading-none rounded-full inline-flex" role="alert">
                        <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
                        <span class="font-semibold mr-2 text-left flex-auto">{props.error}</span>
                        </div>
                </div>
            )
        }
    }
    return (
        <div className="grid">
            {render_error_msg()}
            <div className="flex flex-row justify-center">
                <div className="text-gray-600 fas fa-undo fa-2x self-center cursor-pointer hover:text-indigo-600" onClick={props.handleUndo}/>
                <div className="num-display-container flex flex-col">
                    <p className="num-hist-display-text">{props.operation + " ="}</p>
                    <p className="num-display-text">{props.error === "" ? props.dispNum : "ERR"}</p>
                </div>
                <i className="text-gray-600 fas fa-backspace self-center fa-2x cursor-pointer hover:text-indigo-600" onClick={props.handleBackspace}/>
            </div>
        </div>
    );
}
export default NumDisplay;