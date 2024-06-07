import React from 'react';
import './Filters.scss';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      {/* <input
        type="text"
        name="query"
        placeholder="Keyword"
        value={filters.query}
        onChange={handleChange}
      /> */}
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
      />
      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
      <select name="source" value={filters.source} onChange={handleChange}>
        <option value="">All Sources</option>
        <option value="bbc-news">BBC News</option>
        <option value="cnn">CNN</option>
        <option value="the-verge">The Verge</option>
      </select>
    </div>
  );
};

export default Filters;
