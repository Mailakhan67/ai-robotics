import React from 'react';
import Layout from '@theme/Layout';
// import SignupForm from '@site/src/components/Auth/SignupForm';


import SignupForm from '../components/Auth/SignupForm';

export default function SignupPage() {
  return (
    <Layout title="Sign Up" description="Create an account for the robotics course">
      <SignupForm />
    </Layout>
  );
}