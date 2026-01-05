// Utility functions for language detection and switching

// Check if the current language is Urdu
export const isUrdu = (): boolean => {
  const savedLanguage = localStorage.getItem('preferredLanguage');
  return savedLanguage === 'ur';
};

// Get the current language from localStorage or default to English
export const getCurrentLanguage = (): 'en' | 'ur' => {
  const savedLanguage = localStorage.getItem('preferredLanguage') as 'en' | 'ur' | null;
  return savedLanguage || 'en';
};

// Set the current language in localStorage
export const setCurrentLanguage = (lang: 'en' | 'ur'): void => {
  localStorage.setItem('preferredLanguage', lang);
  
  // Update the language class on the body
  if (lang === 'ur') {
    document.body.classList.add('urdu-mode');
    document.body.classList.remove('english-mode');
  } else {
    document.body.classList.add('english-mode');
    document.body.classList.remove('urdu-mode');
  }
};

// Get the direction (ltr/rtl) based on current language
export const getLanguageDirection = (): 'ltr' | 'rtl' => {
  return isUrdu() ? 'rtl' : 'ltr';
};

// Toggle between English and Urdu
export const toggleLanguage = (): 'en' | 'ur' => {
  const currentLang = getCurrentLanguage();
  const newLang = currentLang === 'en' ? 'ur' : 'en';
  setCurrentLanguage(newLang);
  return newLang;
};