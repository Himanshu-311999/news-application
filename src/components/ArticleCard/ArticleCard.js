import React from 'react';
import './ArticleCard.scss';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.urlToImage} alt={article.title} loading='lazy'/>
      <div className="content">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </div>
  );
};

export default ArticleCard;
