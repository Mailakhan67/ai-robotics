// import React, { useState, useEffect } from 'react';
// import { useHistory } from '@docusaurus/router';
// import { useAuth } from '../../context/AuthContext';
// import { authApi } from '../../services/authApi';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const history = useHistory();
//   const { login } = useAuth();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess(false);

//     try {
//       // Call the real backend API to get token
//       const tokenResponse = await authApi.signin(formData);

//       // Get user info using the token
//       const userResponse = await authApi.getUserInfo();

//       // Call the login function from AuthContext with the user data
//       login(userResponse);
//       setSuccess(true); // Show success instead of redirecting immediately
//     } catch (err: any) {
//       console.error('Login error:', err);
//       const errorMessage = err.message || (err.status ? `Server error (${err.status})` : 'An error occurred during login');
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Effect to handle redirect after success
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (success) {
//       timer = setTimeout(() => {
//         // Use history to navigate to home page instead of direct assignment
//         history.push('/');
//       }, 1500); // Wait 1.5 seconds before redirecting
//     }
//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, [success, history]);

//   // If login was successful, show success message
//   if (success) {
//     return (
//       <div className="container margin-vert--lg">
//         <div className="row">
//           <div className="col col--6 col--offset-3">
//             <div className="card">
//               <div className="card__header">
//                 <h2>Welcome Back!</h2>
//               </div>
//               <div className="card__body">
//                 <div className="alert alert--success" role="alert">
//                   Login successful! Redirecting to home...
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container margin-vert--lg">
//       <div className="row">
//         <div className="col col--6 col--offset-3">
//           <div className="card">
//             <div className="card__header">
//               <h2>Log In</h2>
//             </div>
//             <div className="card__body">
//               {error && (
//                 <div className="alert alert--danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
//                   <label htmlFor="email" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="form-control"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     style={{width: '100%', padding: '0.5rem'}}
//                   />
//                 </div>

//                 <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
//                   <label htmlFor="password" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="form-control"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     style={{width: '100%', padding: '0.5rem'}}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="button button--primary button--block"
//                   disabled={loading}
//                   style={{padding: '0.75rem 1rem'}}
//                 >
//                   {loading ? 'Logging In...' : 'Log In'}
//                 </button>
//               </form>
//             </div>
//             <div className="card__footer">
//               <p>Don't have an account? <a href="/signup">Sign up here</a></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


































































































































import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/authApi';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Call the backend API to get token
      const tokenResponse = await authApi.signin(formData);

      // Now pass the token to getUserInfo
      const userResponse = await authApi.getUserInfo(tokenResponse.access_token);

      // Login using AuthContext
      login(userResponse);
      setSuccess(true); // Show success message
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Incorrect email or password';

      // Check if it's a network error
      if (err.message && err.message.includes('fetch')) {
        errorMessage = 'Unable to connect to authentication server. Please ensure the backend is running.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => {
        history.push('/'); // Navigate to home after login
      }, 1500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [success, history]);

  if (success) {
    return (
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className="card">
              <div className="card__header">
                <h2>Welcome Back!</h2>
              </div>
              <div className="card__body">
                <div className="alert alert--success" role="alert">
                  Login successful! Redirecting to home...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container margin-vert--lg">
      <div className="row">
        <div className="col col--6 col--offset-3">
          <div className="card">
            <div className="card__header">
              <h2>Log In</h2>
            </div>
            <div className="card__body">
              {error && (
                <div className="alert alert--danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
                  <label htmlFor="email" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{width: '100%', padding: '0.5rem'}}
                  />
                </div>

                <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
                  <label htmlFor="password" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{width: '100%', padding: '0.5rem'}}
                  />
                </div>

                <button
                  type="submit"
                  className="button button--primary button--block"
                  disabled={loading}
                  style={{padding: '0.75rem 1rem'}}
                >
                  {loading ? 'Logging In...' : 'Log In'}
                </button>
              </form>
            </div>
            <div className="card__footer">
              <p>Don't have an account? <a href="/signup">Sign up here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
