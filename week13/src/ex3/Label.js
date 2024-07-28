export default function Label(props) {
  var labelStyle = {
    color: props.color,
    fontSize: props.labelSize
  };

  return (
    <p id="label" style={labelStyle}>{props.color}</p>
  );
}
