import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Nav from "react-bootstrap/Nav";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/authUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //useNavigate hook provides a simple API for navigating between pages in your React application.
  const navigate = useNavigate();
      //useState hook  used for setName,setpassword,setemail,setErrorText
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [errorText, setErrorText] = useState("");
  //function for validate email in email input field
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) {
      return false;
    }
    return true;
  }
  /*function validatePassword(passwordfield){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(passwordfield)==false){
      return false;
    }
    return true;
  }*/
     //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  //  onRegister function called when user click register button it takes 3 parameters name,password,email and add validation 
  //  on input fields if any field empty onRegister not called show error after register navigate to login page
  const onRegister = async () => {
    const isvalid = validateEmail(email);
    //const isright = validatePassword(password);
    if (name === "") {
      setErrorText("Username is required");
    } else if (email === "") {
      setErrorText("Email is requireed");
    } else if(!isvalid) {
      setErrorText("Email is not valid");
      return;
    }else if (password === "") {
      setErrorText("Password is required");
    }
     else {
      const userData = { name, password, email };
      dispatch(signup(userData)).then(({ payload }) => {
        if (payload?.success) {
          navigate("/login");
        } else {
          setErrorText(payload?.message)
        }
      });
    }
  };
// onInputChange function call when user setname,setemail,setpassword
  const onInputChange = (e) => {
    setErrorText("");
    const name = e.target.name;
    const value = e.target.value;
    if (name === "username") {
      setname(value);
    } else if (name === "email") {
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
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/register"}>Register</BreadcrumbsItem>
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
                            <h4>Login</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link>
                          <Link to={"/register"}>
                           {/* Heading */}
                            <h4 className="active-tab">Register</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <div className="login-form-container">
                      <div className="login-register-form">
                        <div className="fields-container">
                          <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={name}
                            // onInputChange function called when user setname
                            onChange={(e) => onInputChange(e)}
                          />
                          <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                           // onInputChange function called when user email
                            onChange={(e) => onInputChange(e)}
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            // onInputChange function called when user password
                            onChange={(e) => onInputChange(e)}
                          />
                          {errorText && (
                            <p className="danger-text">{errorText}</p>
                          )}
                          <div className="button-box">
                          {/* onRegister function called when user click on register button */}
                            <button type="submit" onClick={onRegister}>
                              <span>Register</span>
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
