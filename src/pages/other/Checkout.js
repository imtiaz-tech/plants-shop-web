import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../redux/products";
import { clearCart } from "../../redux/authUser";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import OverlayLoading from "../../components/loading/overlayLoading";

const Checkout = () => {
  const navigate = useNavigate();
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  //useToasts used for show Toast when product add to cart
  const { addToast } = useToasts();
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { isLoadingOrder } = useSelector((state) => state.products || {});
  const { cart, token, user } = useSelector((state) => state.auth || {});
  //useState hook  used for setFirstName,setLaststName,setCountry,setAddress,setApartmentAddress,setCity,setState,setPostcode,setPhoneNumber,setEmail,setNotes,setErrorText
  const [firstName, setFirstName] = useState("");
  const [lastName, setLaststName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [apartmentAddress, setApartmentAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postCode, setPostcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errorText, setErrorText] = useState("");
  //totalPrice function used for get total amount of products in cart
  const totalPrice = cart?.reduce((totalProducts, cartItem) => {
    return (totalProducts += cartItem.product?.price * cartItem.quantityCount);
  }, 0);
  //this useeffect calls if user login process to checkour otherwise redirect to login page
  useEffect(() => {
    if (!token) {
      navigate("/login?redirect-url=/checkout");
      addToast("Please login to continue!", { appearance: "warning", autoDismiss: true });
    }
  }, []);
  //useEffect call if user exist and fill data in input fields for fill user account information checkout input fields
  useEffect(() => {
    if (user) {
      const { name } = user;
      setFirstName(name);
      const { lastName } = user;
      setLaststName(lastName);
      const { country } = user.address;
      setCountry(country);
      const { streetAddress } = user.address;
      setAddress(streetAddress);
      const { apartmentaddress } = user.address;
      setApartmentAddress(apartmentaddress);
      const { city } = user.address;
      setCity(city);
      const { state } = user.address;
      setState(state);
      const { postcode } = user.address;
      setPostcode(postcode);
      const { phone } = user;
      setPhoneNumber(phone);
      const { email } = user;
      setEmail(email);
    }
  }, [user]);
  // function for vslidate email
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) {
      return false;
    }
    return true;
  }
  // const mapCart = cart.map((product) => ({
  //   productId: product.id,
  //   quantity: product.quantityCount,
  //   unitPrice: product.product.price,
  // }));
  // saveOrder function called when user click place order button it takes 12 parameters firstName,lastName,address,apartmentAddress,city,state,postCode,phoneNumber,email,notes,cart,country and add validation
  const saveOrder = () => {
    const isvalid = validateEmail(email);
    const mapCart = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantityCount,
      unitPrice: product.product.price,
    }));
    if (firstName === "") {
      setErrorText("firstName is required");
    } else if (lastName === "") {
      setErrorText("lastName is required");
    } else if (country === "") {
      setErrorText("country is required");
    } else if (address === "") {
      setErrorText("address is required");
    } else if (apartmentAddress === "") {
      setErrorText("apartmentAddress is required");
    } else if (city === "") {
      setErrorText("city is required");
    } else if (state === "") {
      setErrorText("state is required");
    } else if (postCode === "") {
      setErrorText("postCode is required");
    } else if (phoneNumber === "") {
      setErrorText("phoneNumber is required");
    } else if (email === "") {
      setErrorText("email is required");
    } else if (!isvalid) {
      setErrorText("email is not valid");
      return;
    } else {
      const data = {
        firstName,
        lastName,
        address,
        apartmentAddress,
        city,
        state,
        postCode,
        phoneNumber,
        email,
        notes,
        country,
        cart: mapCart,
      };
      addToast("Add Order Successfully", { appearance: "success", autoDismiss: true });
      dispatch(addOrder(data)).then(() => {
        dispatch(clearCart());
      });
      navigate("/shop");
    }
  };

  return (
    //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
      {/* import overlayLoading for show loading */}
      <OverlayLoading show={isLoadingOrder} />
      {/* Handle document meta/head tags in isomorphic react with ease. */}
      <MetaTags>
        <title> Checkout</title>
        <meta name="description" content="Checkout page of flone react minimalist eCommerce template." />
      </MetaTags>
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/checkout"}>Checkout</BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cart && cart.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    {/* Heading */}
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            //onchange function called when setFirstName in input fields
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            //onchange function called when setLaststName in input fields
                            onChange={(e) => setLaststName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12"></div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          {/* Heading */}
                          <label>Country</label>
                          <input
                            type="text"
                            name="lastName"
                            value={country}
                            //onchange function called when setCountry in input fields
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="address"
                            value={address}
                            //onchange function called when setAddress in input fields
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <input
                            placeholder="Apartment address"
                            type="text"
                            name="apartmentAddress"
                            value={apartmentAddress}
                            //onchange function called when setApartmentAddress in input fields
                            onChange={(e) => setApartmentAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>Town / City</label>
                          <input
                            type="text"
                            value={city}
                            //onchange function called when setCity in input fields
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>State / Province</label>
                          <input
                            type="text"
                            value={state}
                            //onchange function called when setState in input fields
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>Postcode / ZIP</label>
                          <input
                            type="text"
                            value={postCode}
                            //onchange function called when setState in input fields
                            onChange={(e) => setPostcode(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>Phone</label>
                          <input
                            type="number"
                            value={phoneNumber}
                            //onchange function called when setPhoneNumber in input fields
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          {/* Heading */}
                          <label>Email Address</label>
                          <input
                            type="email"
                            value={email}
                            //onchange function called when setEmail in input fields
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      {/* Heading */}
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        {/* Heading */}
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          value={notes}
                          //onchange function called when setNotes in input fields
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    {/* Heading */}
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            {/* Heading */}
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {/* map method calls on array of cart for showing all products on checkout  page*/}
                            {cart.map((cart, key) => {
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cart.product.name} X {cart.quantityCount}
                                  </span>{" "}
                                  <span className="order-price">{cart.product.price}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            {/* Heading */}
                            <li className="your-order-shipping">Shipping</li>
                            {/* Heading */}
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            {/* Heading */}
                            <li className="order-total">Total</li>
                            <li>{totalPrice}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    {errorText && <p className="danger-text">{errorText}</p>}
                    <div className="place-order mt-25">
                      {/* onclick function called when user click on place order button */}
                      <button className="btn-hover" onClick={saveOrder}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br /> <Link to={"/shop"}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Checkout;
