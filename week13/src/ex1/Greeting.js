import './Greeting.css';

function Greet() {
  const greetStyle = {
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: 'green',
    margin: '20px'
  };

  return (<h3 style={greetStyle}>Hello World!</h3>);     // <h1>Hello World!</h1> 출력
}

function Greeting(props) {
  return (<h3 className="greeting">Hello {props.name}!</h3>);   // 전달된 name 속성 값 참조(출력)
}

export {Greet};     
export default Greeting;      // 외부에 기본적으로 노출하는 객체 이름 지정