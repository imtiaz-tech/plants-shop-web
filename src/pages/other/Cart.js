import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import { useSelector } from "react-redux";

// import {
//   addToCart,
//   decreaseQuantity,
//   deleteFromCart,
//   cartItemStock,
//   deleteAllFromCart
// } from "../../redux-old/actions/cartActions";
import { removeFromCart,updateCartQuantity } from "../../redux/authUser";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Cart = () => {
  

  const dispatch = useDispatch();

  const { addToast } = useToasts();
  let cartTotalPrice = 0;
  const { cart } = useSelector((state) => state.auth || {});
  console.log("🚀 ~ Cart ~ cart:", cart);
  const [quantityCount] = useState(1);

  const incrementQuantity = (cart) => {
    if (cart.quantityCount < cart.product.quantity) {
      dispatch(updateCartQuantity({ productId: cart.product?._id, quantity: cart.quantityCount + 1 }));
    }
  };

  const decrementQuantity = (cart) => {
    if (cart.quantityCount < cart.product.quantity) {
      dispatch(updateCartQuantity({ productId: cart.product?._id, quantity: cart.quantityCount - 1 }));
    }
  };


  const totalPrice = cart?.reduce((totalProducts, cartItem) => {
    return (totalProducts += cartItem.product?.price * cartItem.quantityCount);
  }, 0);

  const productRemoveFromCart = (_id) => {
    dispatch(removeFromCart(_id));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Cart</title>
        <meta name="description" content="Cart page of flone react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/"}>Cart</BreadcrumbsItem>

      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cart && cart.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((cart, key) => {
                            // const finalProductPrice = (
                            //   cartItem.price * currency.currencyRate
                            // ).toFixed(2);
                            // const finalDiscountedPrice = (
                            //   discountedPrice * currency.currencyRate
                            // ).toFixed(2);

                            // discountedPrice != null
                            //   ? (cartTotalPrice +=
                            //       finalDiscountedPrice * cartItem.quantity)
                            //   : (cartTotalPrice +=
                            //       finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={"/product/" + cart?.id}>
                                    <img className="img-fluid" src={cart.product?.image} alt="" />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link>{cart.product?.name}</Link>
                                </td>

                                <td className="product-price-cart">{cart.product?.price}</td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                       onClick={() =>  decrementQuantity(cart) }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cart.quantityCount}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => incrementQuantity(cart)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {cart.product?.price * cart.quantityCount}
                                  {/* {discountedPrice !== null
                                    ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice * cartItem.quantity
                                      ).toFixed(2)
                                    : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)} */}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => productRemoveFromCart(cart.product?._id)}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>Continue Shopping</Link>
                      </div>
                      <div className="cart-clear">
                        {/* <button onClick={() => deleteAllFromCart(addToast)}>
                          Clear Shopping Cart
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                      </div>
                      <h5>
                        Total products{" "}
                        {/* <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span> */}
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total <span>{totalPrice}</span>
                      </h4>
                      <Link to={"/checkout"}>Proceed to Checkout</Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>Shop Now</Link>
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

export default Cart;
