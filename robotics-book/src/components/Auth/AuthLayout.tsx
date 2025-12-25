// import React, { useEffect, useState } from 'react';
// import Layout from '@theme/Layout';
// // import { useAuth } from '@site/src/contexts/AuthContext';
// import { useAuth } from '../../context/AuthContext';

// // This wrapper will update the navbar based on auth status
// const AuthLayout = ({ children, ...props }: any) => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);

//     // Function to update navbar based on auth status
//     const updateNavbar = () => {
//       // Wait for DOM to be ready
//       const checkAndToggleAuthElements = () => {
//         const signupLink = document.querySelector('.signup-link');
//         const loginLink = document.querySelector('.login-link');
//         const userInfoContainer = document.getElementById('user-info-container');

//         if (userInfoContainer && signupLink && loginLink) {
//           if (isAuthenticated && user) {
//             // Hide signup/login links
//             // if (signupLink.parentNode) signupLink.parentNode.style.display = 'none';
//             // if (loginLink.parentNode) loginLink.parentNode.style.display = 'none';

//             // Show user info
//             userInfoContainer.innerHTML = `
//               <div class="dropdown dropdown--right">
//                 <a class="navbar__link dropdown__trigger" href="#" aria-label="User menu">
//                   👤 ${user.full_name || user.email.split('@')[0]}
//                 </a>
//                 <ul class="dropdown__menu">
//                   <li><a class="dropdown__link" href="/profile">Profile</a></li>
//                   <li><a class="dropdown__link" href="#" id="navbar-logout-link">Logout</a></li>
//                 </ul>
//               </div>
//             `;

//             // Add event listener for logout
//             const logoutLink = document.getElementById('navbar-logout-link');
//             if (logoutLink) {
//               logoutLink.onclick = (e) => {
//                 e.preventDefault();
//                 logout();
//               };
//             }
//           } else {
//             // Show signup/login links
//             if (signupLink.parentNode) signupLink.parentNode.style.display = '';
//             if (loginLink.parentNode) loginLink.parentNode.style.display = '';

//             // Clear user info
//             userInfoContainer.innerHTML = '';
//           }
//         } else {
//           // If elements aren't ready, try again
//           setTimeout(checkAndToggleAuthElements, 100);
//         }
//       };

//       checkAndToggleAuthElements();
//     };

//     // Update when auth state changes
//     updateNavbar();
//   }, [isAuthenticated, user, logout]);

//   // Only render children after mounting to ensure auth context is available
//   if (!hasMounted) {
//     return (
//       <Layout {...props}>
//         <div className="container margin-vert--lg">
//           <div className="row">
//             <div className="col col--8 col--offset-2">
//               <div className="text--center padding--vert--md">
//                 Loading...
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout {...props}>
//       {children}
//     </Layout>
//   );
// };

// export default AuthLayout;






































import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../../context/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  [key: string]: any;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, ...props }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const updateNavbar = () => {
      const checkAndToggleAuthElements = () => {
        const signupLink = document.querySelector('.signup-link') as HTMLElement | null;
        const loginLink = document.querySelector('.login-link') as HTMLElement | null;
        const userInfoContainer = document.getElementById('user-info-container');

        if (signupLink && loginLink && userInfoContainer) {
          if (isAuthenticated && user) {
            // Hide signup/login links
            (signupLink.parentNode as HTMLElement).style.display = 'none';
            (loginLink.parentNode as HTMLElement).style.display = 'none';

            // Show user info
            userInfoContainer.innerHTML = `
              <div class="dropdown dropdown--right">
                <a class="navbar__link dropdown__trigger" href="#" aria-label="User menu">
                  👤 ${user.full_name || user.email.split('@')[0]}
                </a>
                <ul class="dropdown__menu">
                  <li><a class="dropdown__link" href="/profile">Profile</a></li>
                  <li><a class="dropdown__link" href="#" id="navbar-logout-link">Logout</a></li>
                </ul>
              </div>
            `;

            // Add logout listener
            const logoutLink = document.getElementById('navbar-logout-link');
            if (logoutLink) {
              logoutLink.onclick = (e) => {
                e.preventDefault();
                logout();
                // Full page reload ensures navbar updates
                window.location.href = '/';
              };
            }
          } else {
            // Show signup/login links
            (signupLink.parentNode as HTMLElement).style.display = '';
            (loginLink.parentNode as HTMLElement).style.display = '';

            // Clear user info
            userInfoContainer.innerHTML = '';
          }
        } else {
          // Retry if elements aren't ready yet
          setTimeout(checkAndToggleAuthElements, 100);
        }
      };

      checkAndToggleAuthElements();
    };

    updateNavbar();
  }, [isAuthenticated, user, logout]);

  if (!hasMounted) {
    return (
      <Layout {...props}>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div className="text--center padding--vert--md">Loading...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return <Layout {...props}>{children}</Layout>;
};

export default AuthLayout;
