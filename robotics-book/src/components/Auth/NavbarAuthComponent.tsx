import React, { useState, useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { authApi } from '../../services/authApi';

interface User {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
  software_background?: string;
  hardware_background?: string;
  purpose_of_learning?: string;
}

interface NavbarAuthComponentProps {
  [key: string]: any;
}

const NavbarAuthComponent: React.FC<NavbarAuthComponentProps> = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { siteConfig } = useDocusaurusContext();

  // Check auth state and update component state
  const checkAuthState = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          return;
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  // Initialize auth state on component mount
  useEffect(() => {
    checkAuthState();

    // Listen for storage events to update auth state when it changes in other tabs
    const handleStorageChange = () => {
      checkAuthState();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsDropdownOpen(false);
    };

    // Listen for URL changes
    const handlePopState = () => {
      handleRouteChange();
    };

    window.addEventListener('popstate', handlePopState);

    // Also check for URL changes via a simple interval
    const interval = setInterval(() => {
      if (window.location.pathname !== (window as any).__lastPathname) {
        (window as any).__lastPathname = window.location.pathname;
        handleRouteChange();
      }
    }, 100);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Even if the API call fails, still clear local state
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        setIsDropdownOpen(false);
        // Update state to trigger re-render
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
      }
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/profile';
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isDropdownOpen;
    console.log('🔥 Button clicked! Current state:', isDropdownOpen, '→ New state:', newState);
    setIsDropdownOpen(newState);
    console.log('State updated to:', newState);
  };

  return (
    <div className="navbar__item">
      {isAuthenticated && user ? (
        <div ref={dropdownRef} className="dropdown dropdown--right dropdown--end">
          <button
            className="button button--secondary button--sm dropdown__toggle navbar-user-button"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            title={user.email}
          >
            <div className="user-avatar-initial">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </button>

          {(() => {
            console.log('✅ Rendering dropdown menu. isDropdownOpen =', isDropdownOpen);
            return isDropdownOpen ? (
              <ul className="dropdown__menu" style={{ display: 'block' }}>
                <li>
                  <button
                    className="dropdown__link dropdown__link--button"
                    onClick={handleProfileClick}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown__link dropdown__link--button"
                    onClick={handleLogout}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            ) : null;
          })()}
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="button button--outline button--sm"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
          <button
            className="button button--primary button--sm"
            onClick={handleLoginClick}
            style={{ marginLeft: '0.5rem' }}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarAuthComponent;