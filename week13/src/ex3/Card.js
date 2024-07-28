import Square from './Square';
import Label from './Label';
import './Card.css';

export default function Card(props) {
  return (
    <div className="card">
      <Square color={props.color}/>
      <Label color={props.color} labelSize={props.labelSize}/> 
        {/* 위 행은 <Label {...props}/> 로 표현 가능 */}     
    </div>
  );
}
