import React, { useState } from 'react';
import { signUp } from '../api';
// import ReCAPTCHA from 'react-google-recaptcha';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'Student',
   // recaptchaToken: '' 
  });
  // const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState(null);

  /* const handleRecaptchaChange = (token) => {
      setRecaptchaToken(token);
      setFormData({ ...formData, recaptchaToken: token });
  }; */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@lnmiit.ac.in$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!name || !email || !password || !confirmPassword) {
      return "All fields are required";
    }
    if (!emailPattern.test(email)) {
      return "Email must be a valid institute email (ending with @lnmiit.ac.in)";
    }
    if (!passwordPattern.test(password)) {
      return "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    /* if (!recaptchaToken) {
        return "Please complete the reCAPTCHA";
    } */
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await signUp(formData);
      alert(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        {/* <ReCAPTCHA sitekey="your-site-key" onChange={handleRecaptchaChange} /> */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

