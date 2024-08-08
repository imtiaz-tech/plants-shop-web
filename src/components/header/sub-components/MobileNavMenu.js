import React from "react";
import { Link } from "react-router-dom";

const MobileNavMenu = () => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={"/"}>Home</Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={"/shop"}>Shop</Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/blog"}>Blog</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
