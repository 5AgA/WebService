import {useState} from 'react';

export default function ES6() {

  const varTest = (e) => {
    e.preventDefault();

    var topic = "JavaScript"; 
    if (topic) {
      var topic = "React";
      console.log("topic :", topic);  // "React"
    }
    console.log("topic :", topic);    // "React"    
  };
 
  const letTest = (e) => {
    e.preventDefault();

    let topic = "JavaScript"; 
    if (topic) {
      let topic = "React";
      console.log("topic :", topic);  // "React"
    }
    console.log("topic :", topic);    // "JavaScript"    
  };
 
  const buildNameTest1 = (e) => {
    e.preventDefault();

    const buildName1 = function(firstName, lastName) {
      return {				 // 객체
        first: firstName,  
        last: lastName 
      };
    }    
    var ceoOfTesla = buildName1("Elon", "Musk"); 
    console.log(ceoOfTesla);      // {first: "Elon", last: "Musk"}        
  };

  const buildNameTest2 = (e) => {
    e.preventDefault();

    const buildName2 = (firstName, lastName) => ({    
      first: firstName,  
      last: lastName 
    });			// 괄호 ()가 없을 경우 중괄호 {}를 함수의 영역 표시로 간주하여 error 발생!
    var ceoOfApple = buildName2("Tim", "Cook"); 
    console.log(ceoOfApple);      // {first: "Elon", last: "Musk"}        
  };

  const objectDestructuring = (e) => {
    e.preventDefault();

    const sandwich = {              // 객체
      bread: "wheat", meat: "tuna", cheese: "swiss"
    };    
    let {bread, meat} = sandwich; // sandwich 객체를 구조 분해(두 속성을 추출)         
    console.log(bread + ', '+ meat); // "wheat, tuna"
    bread = "oat";                  // 변수 값 변경(sandwich 객체와 무관)  
    console.log(bread);    		      // "oat"
    console.log(sandwich.bread);    // "wheat"
    
    const printMeat = ({meat}) => {	// 함수에 전달된 객체를 구조 분해(meat 속성 추출)
       console.log(meat);	          // meat 속성 값 출력
    };  
    printMeat(sandwich);            // sandwich.meat 값 "tuna" 출력
  };

  const arrayDestructuring = (e) => {
    e.preventDefault();
    let numbers = ["one", "two", "three"];
    const [first] = numbers;   // let first = numbers[0]; 와 동일
    console.log("first :", first);    // "one"
    const [f,,third] = numbers;   // let f = numbers[0], third = numbers[2]; 와 동일
    console.log("third :", third);    // "three"                    
  };

  const objectLiteralEnhancement = (e) => {
    e.preventDefault();
    let bread = "wheat";
    let meat = "tuna";
    let cheese = "swiss";
    const sandwich = { bread, meat, cheese };    // 객체 생성
    console.log("sandwich :", sandwich);    
  };

  const spreadOperator1 = (e) => {
    e.preventDefault();
    
    const numbers = [23,55,21,87,56]; 	// 배열 
    let maxValue = Math.max(...numbers);     // Math.max(23,55,21,87,56)와 동일
    console.log("maxValue :", maxValue);    

    const q1 = ["Jan", "Feb", "Mar"];
    const q2 = ["Apr", "May", "Jun"];
    const hf1 = [...q1, ...q2];       // ["Jan","Feb","Mar","Apr","May","Jun"]
    console.log("hf1 :", hf1);    

    const sandwich1 = {		 // 객체
      bread:"wheat", meat:"tuna"
    };
    const cheese = "cheddar";
    const sandwich2 = {
      ...sandwich1, cheese
    };
    console.log("sandwich2 :", sandwich2);    
    const sandwich3 = {
      ...sandwich2, bread:"oat"
    };
    console.log("sandwich3 :", sandwich3);    
  };
 
  const spreadOperator2 = (e) => {
    e.preventDefault();
    
    const directions = function(...args) {   // args == ["Seoul", "Suwon", "Inchun", "Daegu"]
      var [start, ...remaining] = args;		 // 배열 구조 분해, spread 연산자 사용
      var [finish, ...stops] = remaining.reverse();	 // 배열 구조 분해, spread 연산자 사용
      console.log(`start: ${start}, finish: ${finish}, stops: ${stops}`);
    }
    directions("Seoul", "Suwon", "Inchun", "Daegu");      // 아래 함수 호출
  };

  const arrayFunctions = (e) => {
    e.preventDefault();

    const nums1 = [1, 2, 3, 4];
    console.log("nums1 =", nums1);
    
    let n = nums1.pop();		 	// n == 4, nums1 == [1, 2, 3]
    console.log(`n = ${n}, nums1 = ${nums1}`);    
    
    nums1.push(5);     			// nums1 ==  [1, 2, 3, 5]
    console.log("nums1 =", nums1);
    
    n = nums1.shift();			// n == 1, nums1 == [2, 3, 5]
    console.log(`n = ${n}, nums1 = ${nums1}`);    
    
    nums1.unshift(0);     			// nums1 ==  [0, 2, 3, 5]
    console.log("nums1 =", nums1);
    
    const str = nums1.join(", ");  		// str ==  "0, 2, 3, 5"
    console.log("str =", str);
    
    const nums2 = [6, 7, 8, 9];
    const nums3 = nums1.concat(nums2); 	// nums3 ==  [0, 2, 3, 5, 6, 7, 8, 9]
                                      // 주의: nums1, nums2의 원소들은 불변
    console.log(`nums1 = ${nums1}, nums3 = ${nums3}`);    

    const strs = ["A", "B", "C", "D", "E"];
    let rem = strs.splice(1, 3); 	// strs == ["A", "E"], rem == ["B", "C", "D"]
    console.log(`strs = ${strs}, rem = ${rem}`);    

    strs.splice(1, 0, "B", "C");    	// strs == ["A", "B", "C", "D"]
    console.log(`strs = ${strs}`);    

    rem = strs.splice(2, 2, "E", "F", "G"); 	
                              // strs == ["A", "B", "E", "F", "G"], rem == ["C", "D"]
    console.log(`strs = ${strs}, rem = ${rem}`);                            

    const sub1 = strs.slice(2);	// sub1 == ["E", "F", "G"] (주의:strs는 불변)
    const sub2 = strs.slice(1, 3);	// sub2 == ["B", "E"] (주의: strs는 불변)
    console.log(`sub1 = ${sub1}, sub2 = ${sub2}`);  

    let pos = strs.indexOf("B");	// pos == 1
    console.log(`pos = ${pos}`);  
  };

  const arrayIteration = (e) => {
    e.preventDefault();
    
    const nums1 = [16, 4, 9, 45, 25];
    const nums2 = nums1.map(val => val * 2);     // nums2 == [32, 8, 18, 90, 50]
    console.log("nums2 :", nums2);    

    const nums3 = nums2.reduce(
      (total, val) => (total + val), 0);         // 원소들의 합 계산: total==198
    console.log("nums3 :", nums3);    

    const nums4 = nums2.reduce(
      (max, val) => (val > max ? val : max), 0);  	// 최대값 원소 찾기: max==90
    console.log("nums4 :", nums4);    

    const nums5 = nums2.filter(val => val > 20);    	// nums5 == [32, 90, 50]
    console.log("nums5 :", nums5);    

    const nums6 = nums5.find(val => val > 40);    	// nums6 == 90
    const nums7 = nums5.findIndex(val => val > 40);  	// nums7 == 1
    console.log(`nums6 : ${nums6}, nums7 : ${nums7}`);    
  };

  return (
    <div>
      <a href="/" onClick={varTest}>varTest</a>,&nbsp;
      <a href="/" onClick={letTest}>letTest</a><br/>
      <a href="/" onClick={buildNameTest1}>buildNameTest1</a>,&nbsp;
      <a href="/" onClick={buildNameTest2}>buildNameTest2</a><br/>
      <a href="/" onClick={objectDestructuring}>객체구조분해</a>,&nbsp;
      <a href="/" onClick={arrayDestructuring}>배열구조분해</a><br/>
      <a href="/" onClick={objectLiteralEnhancement}>객체리터럴개선</a><br/>
      <a href="/" onClick={spreadOperator1}>스프레드연산자1</a>,&nbsp;
      <a href="/" onClick={spreadOperator2}>스프레드연산자2</a><br/>
      <a href="/" onClick={arrayFunctions}>Array Functions</a><br/>      
      <a href="/" onClick={arrayIteration}>Array Iteration Functions</a><br/>      
    </div>
  );
}
