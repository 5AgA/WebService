export default function Count({display}) {
  const textStyle = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 50,
    color: "#333",
    padding: 10
  };

  return (
    <div style={textStyle}>{display}</div>
  );
}
