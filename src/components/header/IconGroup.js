import React from "react";
import { Link } from "react-router-dom";
import MenuCart from "./sub-components/MenuCart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authUser";

const IconGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, token } = useSelector((state) => state.auth || {});

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };

  const onClickLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={`header-right-wrap`}>
      <div className="same-style account-setting d-none d-lg-block">
        <button className="account-setting-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={"/my-account"}>My Account</Link>
            </li>
            {token ? (
              <li>
                <p onClick={onClickLogout}>Logout</p>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cart && cart.length ? cart.length : 0}</span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={"/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cart && cart.length ? cart.length : 0}</span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={() => triggerMobileMenu()}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

export default IconGroup;
