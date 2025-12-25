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
