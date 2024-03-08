import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/Context";
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { googleLogout } from "@react-oauth/google";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { getTotalCartItems } = useContext(ShopContext);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(user);
      setUser(codeResponse);
      postData();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const logOut = () => {
    googleLogout();

    setProfile(null);
    setUser(null);
    localStorage.removeItem("User Token", user.access_token);
  };

  useEffect(() => {
    if (user?.access_token) {
      getData();
    }
    if (profile) {
      postData();
    }
  }, [user]);
  const getData = async () => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setProfile(res.data);

        localStorage.setItem("User Token", user.access_token);
      })
      .catch((err) => console.log(err));
  };
  const postData = async () => {
    await fetch(
      "https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/user.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: user.access_token,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userId: profile.id,
        }),
      }
    ).then((res) => console.log(res.data));
  };
  console.log(user);
  // const postData = () => {
  //   axios
  //     .post(
  //       "https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/users",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(profile),
  //       }
  //     )
  //     .then((res) => console.log(res.data));
  // };
  const token = localStorage.getItem("User Token");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <NavLinks />
      <div className="nav-login-cart">
        {token ? (
          <div>
            {/* <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >

            </Button> */}
            <img
              style={{ borderRadius: "100%", width: "50px", height: "50px" }}
              onClick={handleClick}
              src={token && profile?.picture}
              alt="user"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <button onClick={login}>SignIn 🚀 </button>
        )}

        <Link to="/cart" style={{ textDecorationLine: "none" }}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
