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
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [errorText, setErrorText] = useState("");

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

  const dispatch = useDispatch();

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
    <Fragment>
      <MetaTags>
        <title> Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/register"}>Register</BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link>
                          <Link to={"/login"}>
                            <h4>Login</h4>
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link>
                          <Link to={"/register"}>
                            <h4>Register</h4>
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
                            onChange={(e) => onInputChange(e)}
                          />
                          <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => onInputChange(e)}
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => onInputChange(e)}
                          />
                          {errorText && (
                            <p className="danger-text">{errorText}</p>
                          )}
                          <div className="button-box">
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
