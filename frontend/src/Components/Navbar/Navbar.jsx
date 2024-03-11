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

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  });
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
    if (user?.access_token) {
      getData();
    }

    setTimeout(() => {
      axios
        .get(
          "https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
        )
        .then((res) => setProfile(res.data));
    }, 1000);
  }, [token]);

  console.log("Profile Data", profile);

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
        const userInfo = { token: user.access_token, ...res.data };
        const id = userInfo.id;

        fetch(
          `https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              fetch(
                `https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userInfo }),
                }
              ).then((res) => console.log("patch response data", res.data));
            } else {
              fetch(
                `https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userInfo }),
                }
              ).then((res) => console.log("put response data", res.data));
            }
          });
      })
      .catch((err) => console.log(err));
  };

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
