// import React, { useState } from 'react';
// import './register.css'; // Import the CSS for styling
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmpassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();
//     const [terms, setTerms] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8000/api/register', { name, email, password });
//             alert('Registration successful!'); // Alert for successful registration
//             navigate('/login'); // Redirect to login page
//         } catch (error) {
//             console.error(error);
//             alert('Registration failed. Please try again.'); // Alert for failed registration
//         }
//     };

//     return (
//         <div className="signup-container">
//             <div className="signup-card">
//                 <div className="signup-left">
//                     <h1>Hello, friend!</h1>
//                     <form onSubmit={handleSubmit} className="signup-form">
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="signup-input"
//                             required
//                         />
//                         <input
//                             type="email"
//                             placeholder="E-mail"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="signup-input"
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="signup-input"
//                             required
//                         />
//                         <input
//                             type="confirmpassword"
//                             placeholder="confirmPassword"
//                             value={confirmpassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="signup-input"
//                             required
//                         />
//                         <div className="terms-container">
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     checked={terms}
//                                     onChange={() => setTerms(!terms)}
//                                 />
//                                 I’ve read and agree to the Terms & Conditions
//                             </label>
//                         </div>
//                         <button type="submit" className="signup-button">CREATE ACCOUNT</button>
//                     </form>
//                     <p className="signup-text">
//                         Already have an account? <a href="/login">Login in</a>
//                     </p>
//                 </div>
//                 <div className="signup-right">
//                     <h2>Glad to see You!</h2>
//                     <img src="https://img.lovepik.com/photo/45009/7682.jpg_wh860.jpg" alt="Descriptive Alt Text" />
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from "react";
import './register.css'; // Import the CSS for styling
import Swal from "sweetalert2"; // For sweet alerts
import axios from 'axios'; // For making API requests
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [terms, setTerms] = useState(false); // For terms and conditions
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formdata.password !== formdata.confirmpassword) {
            setValidationErrors({ confirmpassword: ["Passwords do not match"] });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/register", {
                name: formdata.name,
                email: formdata.email,
                password: formdata.password,
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "Your account has been created successfully!",
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationErrors(error.response.data.errors); // Laravel validation errors
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred during registration.",
                });
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-left">
                    <h1>Hello, Welcome to the site!</h1>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formdata.name}
                            onChange={handleChange}
                            className="signup-input"
                            required
                        />
                        {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}

                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={formdata.email}
                            onChange={handleChange}
                            className="signup-input"
                            required
                        />
                        {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formdata.password}
                            onChange={handleChange}
                            className="signup-input"
                            required
                        />
                        {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}

                        <input
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            value={formdata.confirmpassword}
                            onChange={handleChange}
                            className="signup-input"
                            required
                        />
                        {validationErrors.confirmpassword && (
                            <span className="text-danger">{validationErrors.confirmpassword[0]}</span>
                        )}

                        <div className="terms-container">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={terms}
                                    onChange={() => setTerms(!terms)}
                                />
                                I’ve read and agree to the Terms & Conditions
                            </label>
                        </div>

                        <button type="submit" className="signup-button">CREATE ACCOUNT</button>
                    </form>
                    <p className="signup-text">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
                <div className="signup-right">
                    <h2>Glad to see you!</h2>
                    <img src="https://img.lovepik.com/photo/45009/7682.jpg_wh860.jpg" alt="Descriptive Alt Text" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
