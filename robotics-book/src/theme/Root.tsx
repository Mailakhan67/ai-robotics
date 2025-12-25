// import React from 'react';

// //  import RAGChatbot from '@site/src/components/RAGChatbot';
// // import { chatbotConfig } from '@site/src/config/chatbot.config';


// import RAGChatbot from '../components/RAGChatbot';
// import { chatbotConfig } from '../config/chatbot.config';

// import { AuthProvider } from '../context/AuthContext';

// // Default implementation, that you can customize
// export default function Root({ children }) {
//   return (
//     <AuthProvider>
//       {children}
//       {chatbotConfig.ENABLED && <RAGChatbot />}
//     </AuthProvider>
//   );
// }





























import React, { ReactNode } from 'react';
import RAGChatbot from '../components/RAGChatbot';
import { chatbotConfig } from '../config/chatbot.config';
import { AuthProvider } from '../context/AuthContext';

// Default implementation, that you can customize
interface RootProps {
  children: ReactNode; // ← yahi fix hai
}

export default function Root({ children }: RootProps) {
  return (
    <AuthProvider>
      {children}
      {chatbotConfig.ENABLED && <RAGChatbot />}
    </AuthProvider>
  );
}

