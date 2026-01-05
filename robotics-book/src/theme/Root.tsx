import React, { ReactNode, useEffect } from 'react';
import RAGChatbot from '../components/RAGChatbot';
import { chatbotConfig } from '../config/chatbot.config';
import { AuthProvider } from '../context/AuthContext';

// Default implementation, that you can customize
interface RootProps {
  children: ReactNode; // ← yahi fix hai
}

export default function Root({ children }: RootProps) {
  // Handle language classes on the body element
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    // Remove existing language classes
    document.body.classList.remove('urdu-mode', 'english-mode');
    
    // Add appropriate class based on saved preference
    if (savedLanguage === 'ur') {
      document.body.classList.add('urdu-mode');
    } else {
      document.body.classList.add('english-mode');
    }
  }, []);

  return (
    <AuthProvider>
      {children}
      {chatbotConfig.ENABLED && <RAGChatbot />}
    </AuthProvider>
  );
}