import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/authApi';


export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const history = useHistory();

  if (!isAuthenticated) {
    return (
      <Layout title="Profile" description="User profile page">
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="card">
                <div className="card__body">
                  <h2>Please log in to view your profile</h2>
                  <p><a href="/login">Log in</a> or <a href="/signup">Sign up</a> to access your profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Profile" description="User profile page">
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="card">
                <div className="card__body">
                  <h2>Loading profile...</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Even if the API call fails, still clear local state
    } finally {
      await logout();
      history.push('/'); // Redirect to home after logout
    }
  };

  return (
    <Layout title="Profile" description="Your profile information">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2>Your Profile</h2>
              </div>
              <div className="card__body">
                <div className="margin-bottom--md">
                  <strong>Name:</strong> {user.full_name}
                </div>
                <div className="margin-bottom--md">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="margin-bottom--md">
                  <strong>Software Background:</strong> {user.software_background || 'Not specified'}
                </div>
                <div className="margin-bottom--md">
                  <strong>Hardware/Robotics Background:</strong> {user.hardware_background || 'Not specified'}
                </div>
                <div className="margin-bottom--md">
                  <strong>Purpose of Learning:</strong> {user.purpose_of_learning || 'Not specified'}
                </div>
                <div className="margin-bottom--md">
                  <strong>Member Since:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                </div>
              </div>
              <div className="card__footer">
                <button
                  className="button button--outline button--primary"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}