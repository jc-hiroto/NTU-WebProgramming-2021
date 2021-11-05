function NumDisplay(props) {
  return (
    <div className="grid">
        <div className="num-display-container">
            <p className="num-display-text">{props.num}</p>
        </div>
    </div>
  );
}
export default NumDisplay;