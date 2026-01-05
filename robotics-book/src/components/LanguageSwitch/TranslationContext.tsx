import React, { createContext, useContext } from 'react';

// Context to share translation state across components
export const TranslationContext = createContext<{
  currentLanguage: 'en' | 'ur';
  switchLanguage: (lang: 'en' | 'ur') => void;
} | null>(null);

// Hook to use translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};