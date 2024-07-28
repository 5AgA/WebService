export default function Square(props) {
  var squareStyle = {
    backgroundColor: props.color   
  };

  return (
    <div id="square" style={squareStyle}></div>
  );
}
