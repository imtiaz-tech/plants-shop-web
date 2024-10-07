import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Nav from "react-bootstrap/Nav";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { login } from "../../redux/authUser";
import { useLocation } from "react-router-dom";

const Register = () => {
    //useNavigate hook provides a simple API for navigating between pages in your React application.
  const navigate = useNavigate();
    //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
    //useToasts used for show Toast when user login
  const { addToast } = useToasts();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  //useState hook  used for setpassword,setemail,setErrorText
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [errortext, setErrorText] = useState("");
  //function for validate email in email input field
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) {
      return false;
    }
    return true;
  }
  // onLogin function called when user click login button it takes 2 parameters password,email and add validation 
  //  on input fields if any field empty onRegister not called show error after register navigate to shop page
  const onLogin = () => {
    const isvalid = validateEmail(email);
    if (email === "") {
      setErrorText("Email is required");
    } else if (!isvalid) {
      setErrorText("Email is not valid");
    } else if (password === "") {
      setErrorText("password is required");
    } else {
      const loginData = { email, password };
      dispatch(login(loginData)).then(({ payload }) => {
        if (payload.success) {
          addToast("Login Successful!", { appearance: "success", autoDismiss: true });
          const redirectUrl = query.get("redirect-url");
          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            navigate("/shop");
          }
        } else {
          setErrorText(payload)
          // addToast(payload, { appearance: "error", autoDismiss: true });
        }
      });
    }
  };
  // onInputChange function call when user setemail,setpassword
  const onInputChange = (e) => {
    setErrorText("");
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
    }
  };

  return (
     //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
      {/* Handle document meta/head tags in isomorphic react with ease. */}
      <MetaTags>
            {/* Title */}
        <title> Login</title>
        <meta name="description" content="Compare page of flone react minimalist eCommerce template." />
      </MetaTags>
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/login"}>Login</BreadcrumbsItem>
      <Layout headerTop="visible">
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row center">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div>
                   {/* Nav Provides a list of various forms of navigation menus, which can be landscape and portrait layout. */}
                    <Nav variant="pills" className="login-register-tab-list">
                      {/* The Nav.Item component is used for navigation purposes in a website. */}
                      <Nav.Item>
                       {/* NavLink is a special kind of Link that knows whether or not it is "active", "pending", or "transitioning" */}
                        <Nav.Link>
                          <Link to={"/login"}>
                            {/* Heading */}
                            <h4 className="active-tab">Login</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link>
                          <Link to={"/register"}>
                           {/* Heading */}
                            <h4>Register</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <div className="login-form-container">
                      <div className="login-register-form">
                        <div className="fields-container">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            // onInputChange function called when user email
                            onChange={(e) => onInputChange(e)}
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            // onInputChange function called when user email
                            onChange={(e) => onInputChange(e)}
                          />
                          <div className="button-box">
                            <div className="login-toggle-btn">
                              <input type="checkbox" />
                              <label className="ml-10">Remember me</label>
                              <Link to={"/"}>Forgot Password?</Link>
                            </div>
                            {errortext && <p className="danger-text">{errortext}</p>}
                            {/* onLogin function called when user click on Login button */}
                            <button onClick={onLogin}>
                              <span>Login</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Register;
