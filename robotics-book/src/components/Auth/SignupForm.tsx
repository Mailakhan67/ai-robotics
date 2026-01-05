// import React, { useState, useEffect } from 'react';
// import { useHistory } from '@docusaurus/router';
// import { useAuth } from '../../context/AuthContext';
// import { authApi } from '../../services/authApi';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     full_name: '',
//     password: '',
//     software_background: 'Beginner',
//     hardware_background: 'None',
//     purpose_of_learning: 'Student'
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const history = useHistory();
//   const { signup } = useAuth();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess(false);

//     try {
//       // Call the real backend API
//       const response = await authApi.signup(formData);

//       // Call the signup function from AuthContext with the actual user data
//       signup(response);
//       setSuccess(true); // Show success message
//     } catch (err: any) {
//       setError(err.message || 'An error occurred during signup');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Effect to handle redirect after success
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (success) {
//       timer = setTimeout(() => {
//         // Force a page refresh to ensure navbar updates
//         window.location.href = '/';
//       }, 2000); // Wait 2 seconds before redirecting to home page
//     }
//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, [success, history]);

//   // If signup was successful, show success message
//   if (success) {
//     return (
//       <div className="container margin-vert--lg">
//         <div className="row">
//           <div className="col col--6 col--offset-3">
//             <div className="card">
//               <div className="card__header">
//                 <h2>Welcome!</h2>
//               </div>
//               <div className="card__body">
//                 <div className="alert alert--success" role="alert">
//                   Your account has been created successfully! You are now logged in. Redirecting to home...
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
//               <h2>Sign Up</h2>
//             </div>
//             <div className="card__body">
//               {error && (
//                 <div className="alert alert--danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
//                   <label htmlFor="full_name" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Full Name</label>
//                   <input
//                     type="text"
//                     id="full_name"
//                     name="full_name"
//                     className="form-control"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                     style={{width: '100%', padding: '0.5rem'}}
//                   />
//                 </div>

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
//                     minLength={6}
//                     style={{width: '100%', padding: '0.5rem'}}
//                   />
//                 </div>

//                 <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
//                   <label htmlFor="software_background" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Software Background</label>
//                   <select
//                     id="software_background"
//                     name="software_background"
//                     className="form-control"
//                     value={formData.software_background}
//                     onChange={handleChange}
//                     style={{width: '100%', padding: '0.5rem'}}
//                   >
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advanced">Advanced</option>
//                   </select>
//                 </div>

//                 <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
//                   <label htmlFor="hardware_background" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Hardware / Robotics Background</label>
//                   <select
//                     id="hardware_background"
//                     name="hardware_background"
//                     className="form-control"
//                     value={formData.hardware_background}
//                     onChange={handleChange}
//                     style={{width: '100%', padding: '0.5rem'}}
//                   >
//                     <option value="None">None</option>
//                     <option value="Basic">Basic</option>
//                     <option value="Advanced">Advanced</option>
//                   </select>
//                 </div>

//                 <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
//                   <label htmlFor="purpose_of_learning" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Purpose of Learning</label>
//                   <select
//                     id="purpose_of_learning"
//                     name="purpose_of_learning"
//                     className="form-control"
//                     value={formData.purpose_of_learning}
//                     onChange={handleChange}
//                     style={{width: '100%', padding: '0.5rem'}}
//                   >
//                     <option value="Student">Student</option>
//                     <option value="Teacher">Teacher</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Researcher">Researcher</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="button button--primary button--block"
//                   disabled={loading}
//                 >
//                   {loading ? 'Creating Account...' : 'Sign Up'}
//                 </button>
//               </form>
//             </div>
//             <div className="card__footer">
//               <p>Already have an account? <a href="/login">Log in here</a></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

























































































import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/authApi';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    software_background: 'Beginner',
    hardware_background: 'None',
    purpose_of_learning: 'Student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Call the backend API for signup
      const response = await authApi.signup(formData);

      // The signup API returns user data directly
      // Save user info in AuthContext
      signup(response);
      setSuccess(true); // Show success message
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.message || (err.status ? `Server error (${err.status})` : 'An error occurred during signup');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => {
        history.push('/'); // Navigate to home after signup
      }, 2000);
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
                <h2>Welcome!</h2>
              </div>
              <div className="card__body">
                <div className="alert alert--success" role="alert">
                  Your account has been created successfully! You are now logged in. Redirecting to home...
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
              <h2>Sign Up</h2>
            </div>
            <div className="card__body">
              {error && (
                <div className="alert alert--danger" role="alert">
                  {error}
                </div>
              )}

              {/* Social Login Buttons */}
              <div className="social-login-section" style={{marginBottom: '2rem'}}>
                <button
                  type="button"
                  className="button button--block social-login-btn google-btn"
                  onClick={() => window.location.href = 'http://localhost:8000/auth/google/login'}
                  style={{
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'white',
                    color: '#1f1f1f',
                    border: '1px solid #dadce0',
                    padding: '0.625rem 1rem'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                    <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
                    <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
                    <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="button button--block social-login-btn microsoft-btn"
                  onClick={() => alert('Microsoft login coming soon!')}
                  style={{
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'white',
                    color: '#1f1f1f',
                    border: '1px solid #dadce0',
                    padding: '0.625rem 1rem'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  Continue with Microsoft
                </button>

                <button
                  type="button"
                  className="button button--block social-login-btn github-btn"
                  onClick={() => window.location.href = 'http://localhost:8000/auth/github/login'}
                  style={{
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#24292e',
                    color: 'white',
                    border: 'none',
                    padding: '0.625rem 1rem'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  Continue with GitHub
                </button>

                <div className="divider" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  margin: '1.5rem 0',
                  color: '#6b7280'
                }}>
                  <div style={{flex: 1, borderBottom: '1px solid #e5e7eb'}}></div>
                  <span style={{padding: '0 1rem', fontSize: '0.875rem'}}>OR</span>
                  <div style={{flex: 1, borderBottom: '1px solid #e5e7eb'}}></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
                  <label htmlFor="full_name" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="form-control"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    style={{width: '100%', padding: '0.5rem'}}
                  />
                </div>

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
                    minLength={6}
                    style={{width: '100%', padding: '0.5rem'}}
                  />
                </div>

                <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
                  <label htmlFor="software_background" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Software Background</label>
                  <select
                    id="software_background"
                    name="software_background"
                    className="form-control"
                    value={formData.software_background}
                    onChange={handleChange}
                    style={{width: '100%', padding: '0.5rem'}}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
                  <label htmlFor="hardware_background" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Hardware / Robotics Background</label>
                  <select
                    id="hardware_background"
                    name="hardware_background"
                    className="form-control"
                    value={formData.hardware_background}
                    onChange={handleChange}
                    style={{width: '100%', padding: '0.5rem'}}
                  >
                    <option value="None">None</option>
                    <option value="Basic">Basic</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="margin-bottom--lg" style={{marginBottom: '2rem'}}>
                  <label htmlFor="purpose_of_learning" className="form-label" style={{display: 'block', marginBottom: '0.5rem'}}>Purpose of Learning</label>
                  <select
                    id="purpose_of_learning"
                    name="purpose_of_learning"
                    className="form-control"
                    value={formData.purpose_of_learning}
                    onChange={handleChange}
                    style={{width: '100%', padding: '0.5rem'}}
                  >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Professional">Professional</option>
                    <option value="Researcher">Researcher</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="button button--primary button--block"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
            </div>
            <div className="card__footer">
              <p>Already have an account? <a href="/login">Log in here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
