
export default function List() {
  const listStyle = {
    fontSize: '20px',
    fontFamily: 'sans-serif',
    color: 'purple',
  };
  
  const list1 = () => {
    const data = ["a", "b", "c"];
    let listItems = [];  			// 배열 생성
    for (let i = 0; i < data.length; i++)    // 배열의 원소들 생성 및 저장
      listItems.push(<li key={i}>Data Value: {data[i]}</li>); 
    let list = <ul>{listItems}</ul>;  // 배열의 원소(<li>)들이 모두 포함됨  
    return list;
  };
  
  const data = ["D", "E", "F"];
  const list2 = (
    <ul>  
      {data.map((val, i) => <li key={i}>Data Value: {val}</li>)}  {/* array itertaion */}
    </ul>
  );
  
  return (
    <div style={listStyle}>
      {list1()} 
      {list2}
    </div>
  );
}