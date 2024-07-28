import React from 'react';
import ReactDOM from 'react-dom/client';
import ES6 from './ES6/ES6';	  // ./ES6/ES6 모듈에서 기본적으로 노출된 객체를 import
import Greeting, {Greet} from './ex1/Greeting';	 
import List from './ex2/List';	 
import Card from './ex3/Card';
import Counter from './ex4/Counter';
import Timer from './ex5/Timer';
import ArticleApp from './ex6-article/ArticleApp';
import Top5CDApp from './ex7-top5/Top5CDApp';
//import Colorizer from './ex6/Colorizer';
//import ColorizerProvider from './ex7/ColorizerProvider';

import './index.css';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render (
  <>
    <div>
      <h2>ES6 Examples</h2>
      <ES6 />       
    </div>
    <div>
      <h2>Example #1</h2>         {/* Chap.3 */}
      <Greet />
      <Greeting name="World"/>    {/*아래의 함수 호출 시 name 속성을 인자로 전달*/}
      <Greeting name="Jain"/>  
    </div>
    <div>
      <h2>Example #2</h2>         
      <List />
    </div>    
    <div>
      <h2>Example #3: Props</h2>         {/* Chap.5 */}
      <Card color="green" labelSize="15px"/>
      <Card color="red" labelSize="25px"/>
      {/* <Card color="blue" labelSize="30px"/> */}
    </div>       
    <div>
      <h2>Example #4: States, useState hook</h2>         {/* Chap.10 */}
      <Counter />
    </div>    
    <div>
      <h2>Example #5: useEffect hook</h2>         {/* Chap.10 */}
      <Timer />
    </div>   
    <div>
      <h2>Example #6: Article App</h2>
      <ArticleApp />         
    </div>
    <div>      
      <h2>Example #7: Top5 CDs App</h2>
      <Top5CDApp />         
    </div>          
    {/*
    <div>
      <h2>Example #6: Form input, useRef hook</h2>         {/* Chap.12 
      <Colorizer />
    </div> 
    <div>
      <h2>Example #7: useContext hook</h2>         
      <ColorizerProvider />
    </div>     
    <div>
      <h2>Example #8</h2>         {/* Chap.15 *
        {/* <IPAddressViewer />      
    </div> 
    */}
  </>
);
