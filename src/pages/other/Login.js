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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [errortext, setErrorText] = useState("");

  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) {
      return false;
    }
    return true;
  }

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
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta name="description" content="Compare page of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/login"}>Login</BreadcrumbsItem>
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
                            type="email"
                            name="email"
                            placeholder="Email"
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
                          <div className="button-box">
                            <div className="login-toggle-btn">
                              <input type="checkbox" />
                              <label className="ml-10">Remember me</label>
                              <Link to={"/"}>Forgot Password?</Link>
                            </div>
                            {errortext && <p className="danger-text">{errortext}</p>}
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
