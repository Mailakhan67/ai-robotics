// Test file to verify language toggle functionality
// This would typically be run as part of the test suite

import { getCurrentLanguage, setCurrentLanguage, toggleLanguage, isUrdu, getLanguageDirection } from '../src/utils/languageUtils';

describe('Language Toggle Functionality', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should default to English when no preference is set', () => {
    const currentLang = getCurrentLanguage();
    expect(currentLang).toBe('en');
  });

  test('should save and retrieve language preference', () => {
    setCurrentLanguage('ur');
    const currentLang = getCurrentLanguage();
    expect(currentLang).toBe('ur');
  });

  test('should toggle between English and Urdu', () => {
    // Start with English
    expect(getCurrentLanguage()).toBe('en');
    
    // Toggle to Urdu
    const newLang = toggleLanguage();
    expect(newLang).toBe('ur');
    expect(getCurrentLanguage()).toBe('ur');
    
    // Toggle back to English
    const nextLang = toggleLanguage();
    expect(nextLang).toBe('en');
    expect(getCurrentLanguage()).toBe('en');
  });

  test('should correctly identify Urdu language', () => {
    setCurrentLanguage('ur');
    expect(isUrdu()).toBe(true);
    
    setCurrentLanguage('en');
    expect(isUrdu()).toBe(false);
  });

  test('should return correct direction based on language', () => {
    setCurrentLanguage('ur');
    expect(getLanguageDirection()).toBe('rtl');
    
    setCurrentLanguage('en');
    expect(getLanguageDirection()).toBe('ltr');
  });
});