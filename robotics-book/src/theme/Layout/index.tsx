import React from 'react';
import Layout from '@theme-original/Layout';
import { AuthProvider } from '../../context/AuthContext';
import { TranslationProvider } from '../../components/LanguageSwitch';

export default function LayoutWrapper(props: any) {
  return (
    <AuthProvider>
      <TranslationProvider>
        <Layout {...props} />
      </TranslationProvider>
    </AuthProvider>
  );
}
