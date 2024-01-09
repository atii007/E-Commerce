import React from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign Up</h1>
        <div className="login-fields">
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" id="" placeholder="Your Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="login-login">
          Already Have an Account ?<span> Login Here</span>
        </p>
        <div className="login-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, I agree to the terms of use and privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
