import './article.css';

export default function Article({title, desc}) {
  console.log("Article.render()");

  return (
    <article>
      <h2>{title}</h2>
      {desc}
    </article>
  );
}

