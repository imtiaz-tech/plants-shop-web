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
  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const { isLoadingOrder } = useSelector((state) => state.products || {});
  const { cart, token, user } = useSelector((state) => state.auth || {});

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

  const totalPrice = cart?.reduce((totalProducts, cartItem) => {
    return (totalProducts += cartItem.product?.price * cartItem.quantityCount);
  }, 0);

  useEffect(() => {
    if (!token) {
      navigate("/login?redirect-url=/checkout");
      addToast("Please login to continue!", { appearance: "warning", autoDismiss: true });
    }
  }, []);

  useEffect(() => {
    const { name } = user;
    setFirstName(name);
    const{lastName}=user;
    setLaststName(lastName);
    const{country}=user.address;
    setCountry(country);
    const{streetAddress}=user.address;
    setAddress(streetAddress);
    const{apartmentaddress}=user.address;
    setApartmentAddress(apartmentaddress);
    const{city}=user.address;
    setCity(city);
    const{state}=user.address;
    setState(state);
    const{postcode}=user.address;
    setPostcode(postcode);
    const{phone}=user;
    setPhoneNumber(phone);
    const{email}=user;
    setEmail(email);


  }, [user]);

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
    <Fragment>
      <OverlayLoading show={isLoadingOrder} />
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta name="description" content="Checkout page of flone react minimalist eCommerce template." />
      </MetaTags>
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
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLaststName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12"></div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <input
                            type="text"
                            name="lastName"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <input
                            placeholder="Apartment address"
                            type="text"
                            name="apartmentAddress"
                            value={apartmentAddress}
                            onChange={(e) => setApartmentAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / Province</label>
                          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" value={postCode} onChange={(e) => setPostcode(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
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
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>{totalPrice}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    {errorText && <p className="danger-text">{errorText}</p>}
                    <div className="place-order mt-25">
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
