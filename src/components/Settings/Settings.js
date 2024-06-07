import React, { useContext, useState } from 'react';
import { UserPreferencesContext } from '../../contexts/UserPreferencesContext';
import './Settings.scss';

const Settings = () => {
  const { preferences, updatePreferences } = useContext(UserPreferencesContext);
  const [sources, setSources] = useState(preferences.sources);
  const [categories, setCategories] = useState(preferences.categories);
  const [authors, setAuthors] = useState(preferences.authors);

  const handleSave = () => {
    updatePreferences({ sources, categories, authors });
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="form-group">
        <label>Preferred Sources</label>
        <input
          type="text"
          value={sources.join(',')}
          onChange={(e) => setSources(e.target.value.split(','))}
        />
      </div>
      <div className="form-group">
        <label>Preferred Categories</label>
        <input
          type="text"
          value={categories.join(',')}
          onChange={(e) => setCategories(e.target.value.split(','))}
        />
      </div>
      <div className="form-group">
        <label>Preferred Authors</label>
        <input
          type="text"
          value={authors.join(',')}
          onChange={(e) => setAuthors(e.target.value.split(','))}
        />
      </div>
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default Settings;
