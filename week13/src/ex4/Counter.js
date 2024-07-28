import {useState} from 'react';
import Count from './Count';
import ResetButton from './ResetButton';
import './Counter.css';

export default function Counter() {
  const btnStyle = {
    width: 60,
    height: 30,    
    margin: 2,
    fontFamily: "sans-serif",
    fontSize: "1em",
    fontWeight: "bold",
    color: "blue"
  };

  const [count, setCount] = useState(0);

  // const increase = (e) => setCount(count + 1);
  const increase = (e) => {
    if (e.shiftKey === true)  // shift key is on
      setCount(count + 10);   // increase 10
    else
      setCount(count + 1);    // increase 1
  };

  const reset = (e) => setCount(0); 

  return (
    <div className="counter">
      <Count display={count}/>
      <button style={btnStyle} onClick={increase}>Click</button>
      <ResetButton buttonStyle={btnStyle} clickHandler={reset}/>
        {/* transfer btnStyle object and reset function to ResetButton component */}      
      <p>You clicked {count} times</p>     
    </div>
  );
}
