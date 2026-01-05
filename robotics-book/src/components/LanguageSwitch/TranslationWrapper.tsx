import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from './TranslationContext';
import { translateContent } from '../../services/translationService';

interface TranslationWrapperProps {
  children: React.ReactNode;
  contentId?: string; // Unique identifier for the content being translated
}

// This component will handle the actual translation of content
const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children, contentId }) => {
  const { currentLanguage } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState<React.ReactNode>(children);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to extract text content from the DOM
  const extractTextContent = useCallback((): string => {
    if (contentRef.current) {
      // Extract all text content from the element
      return contentRef.current.innerText || contentRef.current.textContent || '';
    }
    return '';
  }, []);

  // Function to translate content via service
  const translateContentService = useCallback(async (content: string, targetLang: 'en' | 'ur') => {
    if (!contentId) return content;

    setIsLoading(true);
    try {
      const result = await translateContent({
        content: content,
        target_language: targetLang,
        source_language: targetLang === 'ur' ? 'en' : 'ur'
      });
      return result.translated_content;
    } catch (error) {
      console.error('Translation error:', error);
      // On error, return original content
      return content;
    } finally {
      setIsLoading(false);
    }
  }, [contentId]);

  // When language changes, translate the content
  useEffect(() => {
    const translate = async () => {
      if (currentLanguage === 'en') {
        // If English is selected, show original content
        setTranslatedContent(children);
        return;
      }

      // Extract text content from the original content
      const textContent = extractTextContent();

      if (!textContent || !contentId) {
        // If we can't extract text content or no contentId, just show the original
        setTranslatedContent(children);
        return;
      }

      // Translate the content
      const translated = await translateContentService(textContent, currentLanguage);

      // For now, we'll just wrap the translated content in a div with appropriate direction
      setTranslatedContent(
        <div className="translated-content" dir={currentLanguage === 'ur' ? 'rtl' : 'ltr'}>
          {translated}
        </div>
      );
    };

    translate();
  }, [currentLanguage, children, translateContentService, extractTextContent, contentId]);

  // If we're still loading, show original with loading indicator
  if (isLoading) {
    return (
      <div ref={contentRef}>
        {children}
        <div className="translation-loading">Translating content...</div>
      </div>
    );
  }

  return <div ref={contentRef}>{translatedContent}</div>;
};

export default TranslationWrapper;