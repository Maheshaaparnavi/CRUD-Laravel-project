// import React, { useState } from 'react';
// import './loginstyles.css'; // Import the CSS file for styling
// // src/components/Login.js


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Logging in:', { email, password, rememberMe });
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h1 className="login-title">Login</h1>
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <input
//                         type="email"
//                         placeholder="Email address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="login-input"
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="login-input"
//                         required
//                     />
//                     <div className="remember-me">
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={rememberMe}
//                                 onChange={() => setRememberMe(!rememberMe)}
//                             />
//                             Remember me
//                         </label>
//                         <a href="#forgot-password" className="forgot-password">Forgot password?</a>
//                     </div>
//                     <button type="submit" className="login-button">Login</button>
//                     <p className="signup-text">
//                         Don’t have an account? <a href="/register">Register</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
// import React, { useState } from 'react';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import './loginstyles.css'; // Import the CSS file for styling

// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [rememberMe, setRememberMe] = useState(false);
//     const [validationErrors, setValidationErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
//             const token = response.data.authorisation.token;

//             if (rememberMe) {
//                 localStorage.setItem("token", token);  // Store token in localStorage for 'Remember Me' functionality
//             } else {
//                 sessionStorage.setItem("token", token);  // Store token in sessionStorage for short-lived sessions
//             }

//             Swal.fire({
//                 icon: "success",
//                 title: "Login Successful",
//                 text: "Welcome back!",
//             }).then(() => {
//                 navigate("/dashboard");  // Redirect to dashboard on success
//             });
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Login Failed",
//                     text: "Invalid email or password. Please try again.",
//                 });
//             } else {
//                 const responseData = error.response.data;
//                 setValidationErrors(responseData);
//                 if (!responseData) {
//                     Swal.fire({
//                         icon: "error",
//                         title: "Error",
//                         text: "An error occurred during login.",
//                     });
//                 }
//             }
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h1 className="login-title">Login</h1>
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email address"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="login-input"
//                         required
//                     />
//                     {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="login-input"
//                         required
//                     />
//                     {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}

//                     <div className="remember-me">
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={rememberMe}
//                                 onChange={() => setRememberMe(!rememberMe)}
//                             />
//                             Remember me
//                         </label>
//                         <a href="#forgot-password" className="forgot-password">Forgot password?</a>
//                     </div>

//                     <button type="submit" className="login-button">Login</button>
//                     <p className="signup-text">
//                         Don’t have an account? <a href="/register">Register</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './loginstyles.css'; // Import the CSS file for styling

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Button clicked!"); // Log to see if button is being clicked
        
        try {
            console.log("Sending API request..."); // Log API call initiation
            const response = await axios.post("http://127.0.0.1:8000/login", formData);
            console.log("API Response: ", response); // Log API response

            const token = response.data.authorisation.token;

            if (rememberMe) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
            }).then(() => {
                navigate("/dashboard");
            });
        } catch (error) {
            console.log("Error response: ", error.response); // Log error response

            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                });
            } else {
                const responseData = error.response?.data;
                setValidationErrors(responseData || {});
                if (!responseData) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred during login.",
                    });
                }
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                    {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                    {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}

                    <div className="remember-me">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember me
                        </label>
                        <a href="#forgot-password" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-button">Login</button>
                    <p className="signup-text">
                        Don’t have an account? <a href="/register">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
