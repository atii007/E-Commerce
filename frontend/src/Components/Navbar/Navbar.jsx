import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";

import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/Context";
import NavLinks from "./NavLinks";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { initFirebase } from "../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  console.log("Current User", auth.currentUser);

  const image = auth?.currentUser?.photoURL;
  const token = auth?.currentUser?.accessToken;

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

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      goToShop();
    }
  };

  const goToShop = () => {
    navigate("/");
  };

  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          "https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
        )
        .then((res) => setProfile(res.data));
    }, 1000);
  }, [token]);

  console.log("Profile Data", profile);

  return (
    <div className="navbar">
      <NavLinks />
      <div className="nav-login-cart">
        {token ? (
          <div>
            <img
              style={{ borderRadius: "100%", width: "50px", height: "50px" }}
              onClick={handleClick}
              src={token && image}
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
