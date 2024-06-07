import React, { createContext, useState } from 'react';

export const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });

  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
