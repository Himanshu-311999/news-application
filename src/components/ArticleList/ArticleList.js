import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ArticleList.scss';
import ArticleCard from '../ArticleCard/ArticleCard';
import Filters from '../Filters/Filters';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const fetchNewsAPIArticles = async (filters) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: filters.category || 'sport', // Use 'sport' as default query
        from: filters.date || '2024-05-31',
        to: filters.date || '2024-05-31', // Use the same date for 'from' and 'to'
        sortBy: 'popularity',
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
        q: filters.query || 'technology',
        from: filters.date || '2024-05-31',
        category: filters.category || 'general',
        sources: filters.sources.join(','),
        apiKey: 'Add_API_KEY'
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
        q: filters.query || 'technology',
        begin_date: filters.date.replace(/-/g, '') || '20240531',
        fq: filters.category ? `news_desk:("${filters.category}")` : '',
        'api-key': 'Add_API_KEY'
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

  // const allArticles = [...newsAPIArticles, ...openNewsArticles, ...nytArticles];  // To collect all API Response
  const allArticles = [...newsAPIArticles];

  return allArticles;
};

const ArticleList = ({searchQuery}) => {

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filters, setFilters] = useState({
  query: '',
  date: '2024-05-31', //getTodayDate(),
  category: '',
  sources: []
});

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      const allArticles = await fetchAllArticles(filters);
      setArticles(allArticles);
      setLoading(false)
    };

    fetchArticles();
  }, [filters]);

// For Header Search
  useEffect(() => {
    setLoading(true)
    if (searchQuery) {
      setFilteredArticles(articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredArticles(articles);
    }
    setLoading(false)
  }, [searchQuery, articles]);

  if(loading){
    return(
      <div className='loadingContainer'>
        <h4>Loading...</h4>
        <LoadingSpinner/>
      </div>
    )
  }
  return (
    <div className="article-list">
      <Filters filters={filters} setFilters={setFilters} />
      <>
        {
          filteredArticles.length > 0 ? 
          <div className="articles">
            {filteredArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
          </div>
          : 
          <div className='noRecordFound'>
            <h3>No Record Found!!</h3>
            <h5>Please do not select future date. Because We don't know the future! 😉</h5>
          </div>
        }
       
      </>
    </div>
  );
};

export default ArticleList;
