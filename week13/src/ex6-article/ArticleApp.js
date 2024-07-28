import React, { useState } from 'react';
import Navigator from './Navigator';  
import Article from './Article';
import './article.css';

function ArticleApp() {
  const [list, setList] = useState([        // article 목록
    { id: 1, 
      title: "HTML", 
      desc: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for its appearance."
    },
    { id: 2, 
      title: "JavaScript",
      desc: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices."
    },
    { id: 3, 
      title: "React",
      desc: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js."
    }
  ]);

  const [tagList, setTagList] = useState([   // tag 목록
    { id:1, title:"HTML"},
    { id:2, title:"JavaScript"},
    { id:3, title:"React"}
  ]);

  const [article, setArticle] = useState(   // 현재 선택된 article 정보
    {title: "Welcome", desc: "Hello! This is an example of React and Ajax."}   
  );

  return (
    <div className="App">
      <h2>Contents</h2>
      <Navigator tagList={tagList}   // navigator 생성을 위한 tag list 전달(using props)
        onClickTag={(id) => {        // navigator에서 특정 tag 클릭 시 실행되는 callback function
          let article = list.find(entry => entry.id === id);
          setArticle(article);        
          /*
          fetch(id + '.json')        // Ajax call로 선택된 tab에 관한 JSON data를 가져와서 article state에 저장
            .then(response => response.json())      
            .then(article => setArticle(article))
            .catch(error => console.error(error)); */
        }} />
      <Article 
        title={article.title} 
        desc={article.desc} />
    </div>
  );
}  

export default ArticleApp;
