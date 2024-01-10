import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/Context";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      <Link to="/" style={{ textDecorationLine: "none" }}>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
      </Link>
      <NavLinks />
      <div className="nav-login-cart">
        <Link to="/login" style={{ textDecorationLine: "none" }}>
          <button>Login</button>
        </Link>
        <Link to="/cart" style={{ textDecorationLine: "none" }}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
