import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword, changeUserDetails } from "../../redux/authUser";

const MyAccount = () => {
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
   //useState hook  used for setPassword,setConfirmPassword,setName,setLastName,setEmail,setPhone,setPhone,setCity,setCountry,setState,setPostCode,setStreetAddress,setApartmentAddress
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
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { user } = useSelector((state) => state.auth || {});
//useEffect call if user exist and fill data in input fields for edit user account information
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
   //editUserInformation function called when user edit his account information and click on submit button
   //it require 11 parameters name,lastName,email,phone,city,country,state,postcode,streetAddress,apartmentAddress
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
  //updatePassword function called when user update his password and click on submit button it gets 1 parameters password
  const updatePassword = () => {
    const data = {
      password,
    };
    dispatch(changeUserPassword(data));
  };

  return (
   //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
    {/* Handle document meta/head tags in isomorphic react with ease. */}
      <MetaTags>
      {/* Title */}
        <title> My Account</title>
        <meta name="description" content="Compare page of flone react minimalist eCommerce template." />
      </MetaTags>
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/my-account"}>My Account</BreadcrumbsItem>
      <Layout headerTop="visible">
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-12">
                <div className="myaccount-wrapper">
                {/* accordion is a vertically collapsing component that allows users to view one section of content at a time */}
                  <Accordion defaultActiveKey="0">
                  {/* Card a surface-level container for grouping related components */}
                    <Card className="single-my-account mb-20">
                    {/* CardHeader is a component API provided by React MUI which allows us to customize the header for the Card Component */}
                      <Card.Header className="panel-heading">
                      {/*Accordion.Toggle component is used to expand and collapse the content area by clicking the title. */}
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                        {/* CardHeader is a component API provided by React MUI which allows us to customize the header for the Card Component */}
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                      {/* card-body Use it whenever you need a padded section within a card. */}
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              {/* Heading */}
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
                                   //onchange function called when setname in input fields
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
                                   //onchange function called when setLastName in input fields
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
                                     //onchange function called when setEmail in input fields
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
                                    //onchange function called when setPhone in input fields
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
                                   //onchange function called when setPhone in input fields
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
                                   //onchange function called when setCountry in input fields
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
                                    //onchange function called when setState in input fields
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
                                    //onchange function called when setPostCode in input fields
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
                                    //onchange function called when setStreetAddress in input fields
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
                                    //onchange function called when setApartmentAddress in input fields
                                    onChange={(e) => setApartmentAddress(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                {/* editUserInformation function called when user click on submit button */}
                                <button type="submit" onClick={editUserInformation}>
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* Card a surface-level container for grouping related components */}
                    <Card className="single-my-account mb-20">
                      {/* CardHeader is a component API provided by React MUI which allows us to customize the header for the Card Component */}
                      <Card.Header className="panel-heading">
                        {/*Accordion.Toggle component is used to expand and collapse the content area by clicking the title. */}
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            {/* Heading */}
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        {/* card-body Use it whenever you need a padded section within a card. */}
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                             {/* Heading */}
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
                                    //onchange function called when setPassword in input fields
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
                                    //onchange function called when setConfirmPassword in input fields
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                              {/* updatePassword function called when user click on submit button */}
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
