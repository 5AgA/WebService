import {useState, useEffect} from 'react';
import './Timer.css';

export default function Timer() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(10);
	const [calc1, setCalc1] = useState(0);
  const [calc2, setCalc2] = useState(0);
  const [calc3, setCalc3] = useState(0);
  const [calc4, setCalc4] = useState(0);

  useEffect(() => {     // <Timer>가 (re)rendering된 후 항상 실행됨 
		setTimeout(() => setCount1(count1 + 1), 1000);    // 1초마다 timer 재설정 (count 값 1 증가)
	});   

	useEffect(() => setCalc1(count1 + count2));   // <Timer>가 (re)rendering 될 때마다 항상 실행됨   
  useEffect(() => setCalc2(count1 + count2), [count1]); // count1 값이 초기화되거나 변경되어 (re)rendering 된 경우에만 실행됨 
  useEffect(() => setCalc3(count1 + count2), [count2]); // count2 값이 초기화되거나 변경되어 (re)rendering 된 경우에만 실행됨 
  useEffect(() => setCalc4(count1 + count2), []);  // <Timer>가 최초로 rendering된 직후 한 번만 실행됨   
  
  return (
    <div className="timer">
      <span className="text">{count1}</span> 
      <span className="text">{count2}</span>
      <p><button className="btn" 
        onClick={() => setCount2(count2+1)}>Click</button></p>
			Calc 1: {calc1}<br/>
      Calc 2: {calc2}<br/>
      Calc 3: {calc3}<br/>
      Calc 4: {calc4}<br/>
    </div>
  );
}
