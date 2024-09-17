import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword, changeUserDetails, changeUserAddressDetails } from "../../redux/authUser";

const MyAccount = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartmentAddress, setApartmentAddress] = useState("");

  const { user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (user) {
      const { name, lastName, phone, email, address } = user;
      const { country, streetAddress, apartmentaddress, city, state, postcode } = address || {};

      setName(name);
      setLastName(lastName);
      setPhone(phone);
      setEmail(email);
      setCountry(country);
      setStreetAddress(streetAddress);
      setApartmentAddress(apartmentaddress);
      setCity(city);
      setState(state);
      setPostCode(postcode);
    }
  }, [user]);

  const editUserInformation = () => {
    const data = {
      name,
      lastName,
      email,
      phone,
      phone,
      city,
      country,
      state,
      postcode,
      streetAddress,
      apartmentAddress,
    };
    dispatch(changeUserDetails(data));
  };

  const updatePassword = () => {
    const data = {
      password,
    };
    dispatch(changeUserPassword(data));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta name="description" content="Compare page of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/my-account"}>My Account</BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="firstname"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    name="lastname"
                                    placeholder="lastname"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input
                                    type="text"
                                    name="phoneNo"
                                    placeholder="PhoneNo"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>City</label>
                                  <input
                                    type="text"
                                    name="city"
                                    placeholder="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Country</label>
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>State</label>
                                  <input
                                    type="text"
                                    name="lastname"
                                    placeholder="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Postal Code</label>
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="PostCode"
                                    value={postcode}
                                    onChange={(e) => setPostCode(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Street Address</label>
                                  <input
                                    type="text"
                                    name="phoneNo"
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Apartment Address</label>
                                  <input
                                    type="text"
                                    name="apartmentAddress"
                                    placeholder="apartment Address"
                                    value={apartmentAddress}
                                    onChange={(e) => setApartmentAddress(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={editUserInformation}>
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={updatePassword}>
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default MyAccount;
