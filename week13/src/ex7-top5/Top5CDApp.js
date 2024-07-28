import React, { useEffect, useState } from 'react';
import CDs from './CDs';
import Top5Listings from './Top5Listings';
import './top5.css';

export default function Top5CDApp() {
	const [cdList, setCdList] = useState([]);		
	const [top5List, setTop5List] = useState([]);

	useEffect(() => { 					// cdList 초기화 (App 시작 시 한 번만 호출됨)
		console.log("useEffect()");
		fetch('cdList.json')       // Ajax로 CD list data를 가져와서 cdList state에 저장
		.then(response => response.json())      
		.then(list => setCdList(list))
		.catch(error => console.error(error));
	}, []);
	
	const instr = `Click on a CD cover to add it to the Top 5 list
		If you want to start over, click the "Start Over" button to clear the Top 5 list.`;

	const addToTop5 = (selectedCd) => {
		if (top5List.length < 5) {
			const newCdList = cdList.filter(cd => (cd !== selectedCd));
				// selectedCd가 아닌 cd들만 추출해서 새로운 배열 생성 및 반환						
			setCdList(newCdList);
			const newTop5List = top5List.concat(selectedCd);	// selectedCd를 추가한 새로운 배열 생성 및 반환
			setTop5List(newTop5List);
		}
		else {
			alert("You already have 5 cdList. Click \"Start Over\" to try again.");
		}
	};

	const startOver = () => {		
		const list = Array.from(cdList); 	// 또는 [...cdList];	// 배열 복사	
		for (let curCd of top5List) {	// top5List의 각 원소 curCd를 처리	
			list.push(curCd);	 		// curCd를 list의 마지막에 추가
		}						
		setCdList(list);
		setTop5List([]);
	}
/*
	const moveToOriginalPosition = (selectedCd) => {
		const newTop5List = ...
			// top5List에서 selectedCd가 아닌 cd들만 추출하여 새로운 배열 생성(Array.filter() 이용)					
		setTop5List(newTop5List);
	
		const list = ...  // cdList 배열 복사(또는 Array.from() 또는 [...cdList] 이용)

		let i = ...  	//  list에서 id가 selectedCd.id 보다 큰 첫 번째 cd의 index를 구함 (Array.filter() 이용) 
		if (i >= 0) 
			...	 		// selectedCd를 list의 i 위치에 삽입 (Array.splice() 이용) 
		else 
			...		 	// selectedCd를 list의 마지막에 추가 (Array.push() 이용)
		setCdList(list);
	};
*/
	console.log('==> Top5CDApp render');
	return (
		<>
			<div id="instructions">{instr}</div>
			<CDs images={cdList} onClickImage={addToTop5} />
			<Top5Listings images={top5List} name="Jain" />
				{/*onClickImage={moveToOriginalPosition} /> */}
			<form>
				<input type="button" value="Start Over"	onClick={startOver}/>
			</form>
		</>
	);
}
