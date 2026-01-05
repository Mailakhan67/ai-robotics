import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './styles.module.css';
import { TranslationContext } from './TranslationContext';
import { useTranslation } from './TranslationContext';

// Provider component to wrap around content that needs translation
const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ur'>('en');
  const { isAuthenticated } = useAuth();

  // Load user preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as 'en' | 'ur' | null;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Handle language change
  const switchLanguage = useCallback((lang: 'en' | 'ur') => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);

    // Update the language class on the body
    if (lang === 'ur') {
      document.body.classList.add('urdu-mode');
      document.body.classList.remove('english-mode');
    } else {
      document.body.classList.add('english-mode');
      document.body.classList.remove('urdu-mode');
    }
  }, []);

  return (
    <TranslationContext.Provider value={{ currentLanguage, switchLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Language switch component
const LanguageSwitch: React.FC = () => {
  const { currentLanguage, switchLanguage } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);

  return (
    <div className={styles.languageSwitchContainer}>
      <div className={styles.languageButtons}>
        <button
          className={`${styles.languageButton} ${currentLanguage === 'en' ? styles.active : ''}`}
          onClick={() => switchLanguage('en')}
          disabled={currentLanguage === 'en' || isTranslating}
          aria-label="Switch to English"
        >
          English
        </button>
        <button
          className={`${styles.languageButton} ${currentLanguage === 'ur' ? styles.active : ''}`}
          onClick={() => switchLanguage('ur')}
          disabled={currentLanguage === 'ur' || isTranslating}
          aria-label="Switch to Urdu"
        >
          Urdu
        </button>
      </div>
      {isTranslating && (
        <div className={styles.loadingIndicator}>
          Translating...
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
export { useTranslation, TranslationProvider };