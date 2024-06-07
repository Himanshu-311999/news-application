import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import Header from './components/Header/Header';
import './App.scss';

const ArticleList = lazy(() => import('./components/ArticleList/ArticleList'));
const PersonalizedFeed = lazy(() => import('./components/PersonalizedFeed/PersonalizedFeed'));
const Settings = lazy(() => import('./components/Settings/Settings'));

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <UserPreferencesProvider>
      <Router>
        <div className="app">
          <Header setSearchQuery={setSearchQuery} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" exact element={<ArticleList searchQuery={searchQuery} />} />
              <Route path="/feed" element={<PersonalizedFeed />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </UserPreferencesProvider>
  );
}

export default App;
