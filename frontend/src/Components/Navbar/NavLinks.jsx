import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const LinksList = [
  { title: "Shop", to: "/" },
  { title: "Men", to: "/men" },
  { title: "Women", to: "/women" },
  { title: "Kids", to: "/kids" },
];

const NavLinks = () => {
  const [menu, setMenu] = useState("Shop");
  return (
    <>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        {LinksList.map((links) => (
          <li
            key={links.title}
            onClick={() => {
              setMenu(links.title);
            }}
          >
            <Link to={links.to} style={{ textDecorationLine: "none" }}>
              {links.title}
            </Link>
            {menu === links.title ? <hr /> : <></>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavLinks;
