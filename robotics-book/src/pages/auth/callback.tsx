import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { authApi } from '../../services/authApi';

const AuthCallback = () => {
  const [status, setStatus] = useState('Processing...');
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL params
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userId = params.get('user');

        if (!token) {
          throw new Error('No authentication token received');
        }

        // Store token
        localStorage.setItem('auth_token', token);

        // Get user info
        const userInfo = await authApi.getUserInfo();
        localStorage.setItem('user', JSON.stringify(userInfo));

        setStatus('Login successful! Redirecting...');

        // Redirect to home
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);

      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Authentication failed');
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [history]);

  return (
    <div className="container margin-vert--lg">
      <div className="row">
        <div className="col col--6 col--offset-3">
          <div className="card">
            <div className="card__header">
              <h2>Authenticating...</h2>
            </div>
            <div className="card__body">
              {error ? (
                <div className="alert alert--danger" role="alert">
                  {error}
                  <br />
                  <small>Redirecting to login...</small>
                </div>
              ) : (
                <div className="alert alert--info" role="alert">
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
