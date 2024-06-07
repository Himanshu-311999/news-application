import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ArticleCard from '../ArticleCard/ArticleCard';
import { UserPreferencesContext } from '../../contexts/UserPreferencesContext';
import './PersonalizedFeed.scss';

const fetchNewsAPIArticles = async (filters) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: filters.query || 'news', // Use a default query if not provided
        // from: filters.date || new Date().toISOString().split('T')[0],
        from: '2024-05-31',
        to:  '2024-05-31',
        sortBy: 'popularity',
        // sources: filters.sources.length ? filters.sources.join(',') : undefined,
        apiKey: '19ddf0d2ce33411e9411d5b82684c9bc'
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching NewsAPI articles:", error);
    return [];
  }
};

const fetchOpenNewsArticles = async (filters) => {
  try {
    const response = await axios.get('https://api.opennews.com/v2/everything', {
      params: {
        q: filters.query || 'news',
        from: filters.date || new Date().toISOString().split('T')[0],
        sources: filters.sources.length ? filters.sources.join(',') : undefined,
        apiKey: 'YOUR_OPENNEWS_API_KEY'
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching OpenNews articles:", error);
    return [];
  }
};

const fetchNYTArticles = async (filters) => {
  try {
    const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        q: filters.query || 'news',
        begin_date: filters.date.replace(/-/g, '') || new Date().toISOString().split('T')[0].replace(/-/g, ''),
        fq: filters.category ? `news_desk:("${filters.category}")` : undefined,
        'api-key': 'YOUR_NYT_API_KEY'
      }
    });
    return response.data.response.docs;
  } catch (error) {
    console.error("Error fetching New York Times articles:", error);
    return [];
  }
};

const fetchAllArticles = async (filters) => {
  const newsAPIArticles = await fetchNewsAPIArticles(filters);
  // const openNewsArticles = await fetchOpenNewsArticles(filters);
  // const nytArticles = await fetchNYTArticles(filters);

  // const allArticles = [...newsAPIArticles, ...openNewsArticles, ...nytArticles];
  const allArticles = [...newsAPIArticles];

  return allArticles;
};

const PersonalizedFeed = () => {
  const { preferences } = useContext(UserPreferencesContext);
  const [articles, setArticles] = useState([]);
  const filters = {
    query: preferences.query || 'news',
    date: preferences.date || new Date().toISOString().split('T')[0],
    category: preferences.category || '',
    sources: preferences.sources || []
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = await fetchAllArticles(filters);
      setArticles(allArticles);
    };

    fetchArticles();
  }, [preferences]);

  return (
    <div className="personalized-feed">
      <h1>Your Personalized Feed</h1>
      <div className="articles">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedFeed;
