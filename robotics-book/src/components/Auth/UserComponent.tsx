import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserComponent = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null; // Don't show anything if not authenticated
  }

  return (
    <div className="dropdown dropdown--right dropdown--username">
      <button 
        className="button button--secondary dropdown__trigger"
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="navbar__link-user">
          👤 {user.full_name || user.email.split('@')[0]}
        </span>
      </button>
      <ul className="dropdown__menu">
        <li>
          <a className="dropdown__link" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <button 
            className="dropdown__link"
            onClick={logout}
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserComponent;