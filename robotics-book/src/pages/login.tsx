import React from 'react';
import Layout from '@theme/Layout';
// import LoginForm from '@site/src/components/Auth/LoginForm';

import LoginForm from '../components/Auth/LoginForm'; // Capital A




export default function LoginPage() {
  return (
    <Layout title="Log In" description="Log in to your account for the robotics course">
      <LoginForm />
    </Layout>
  );
}