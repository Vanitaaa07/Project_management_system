import React, { useState } from 'react';
import { signUp } from '../api';
import ReCAPTCHA from 'react-google-recaptcha';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        typeOfUser: 'Student',
        recaptchaToken: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [error, setError] = useState(null);

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
        setFormData({ ...formData, recaptchaToken: token });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const { name, email, password, confirmPassword } = formData;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@lnmiit.ac.in$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;;

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
        if (!recaptchaToken) {
            return "Please complete the reCAPTCHA";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setError('Please complete the reCAPTCHA');
            return;
        }

        try {
            const response = await signUp(formData);
            alert(response.data);
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
    <div className="container">
      <h1>Sign Up</h1>
      {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <select name="typeOfUser" onChange={handleChange}>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
            </select>
            <div>
                <ReCAPTCHA
                    sitekey="6LcH-hkqAAAAAJ0agIZQy8oXJSgnMMUu0f7kmo2B"
                    onChange={handleRecaptchaChange}
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    );
};

export default SignUp;
