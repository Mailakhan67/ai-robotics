import React from 'react';
import Layout from '@theme-original/Layout';
import { AuthProvider } from '../../context/AuthContext';

export default function LayoutWrapper(props: any) {
  return (
    <AuthProvider>
      <Layout {...props} />
    </AuthProvider>
  );
}
