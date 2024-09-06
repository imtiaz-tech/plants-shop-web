import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity,clearCart } from "../../redux/authUser";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { addToast } = useToasts();
  const { cart } = useSelector((state) => state.auth || {});

  const incrementQuantity = (cart) => {
    if (cart.quantityCount < cart.product.quantity) {
      dispatch(
        updateCartQuantity({
          productId: cart.product?._id,
          quantity: cart.quantityCount + 1,
        })
      );
      addToast("Added To Cart", { appearance: "success",autoDismiss: true });
    }
  };

  const decrementQuantity = (cart) => {
    if (cart.quantityCount < cart.product.quantity) {
      dispatch(
        updateCartQuantity({
          productId: cart.product?._id,
          quantity: cart.quantityCount - 1,
        })
      );
      addToast("Product Decrement From Cart", { appearance: "success",autoDismiss: true });
    }
  };

  const clearAllCart=()=>{
    addToast("cleared all cart", { appearance: "success",autoDismiss: true });
    dispatch(clearCart());
    navigate("/shop")
  }

  const totalPrice = cart?.reduce((totalProducts, cartItem) => {
    return (totalProducts += cartItem.product?.price * cartItem.quantityCount);
  }, 0);

  const productRemoveFromCart = (_id) => {
    addToast("Removed to cart", { appearance: "success",autoDismiss: true });
    dispatch(removeFromCart(_id));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Cart</title>
        <meta name="description" content="Cart page of flone react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/cart"}>Cart</BreadcrumbsItem>

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
                          {cart.map((cart) => {
                            return (
                              <tr key={cart.id}>
                                <td className="product-thumbnail">
                                  <Link to={"/product"}>
                                    <img className="img-fluid" src={cart.product?.image} alt="" />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link>{cart.product?.name}</Link>
                                </td>

                                <td className="product-price-cart">{cart.product?.price}</td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button className="dec qtybutton" onClick={() => decrementQuantity(cart)}>
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cart.quantityCount}
                                      readOnly
                                    />
                                    <button className="inc qtybutton" onClick={() => incrementQuantity(cart)}>
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {cart.product?.price * cart.quantityCount}
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
                        <Link to={"/shop"}>Continue Shopping</Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => clearAllCart()}>
                          Clear Shopping Cart
                        </button>
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
                      No items found in cart <br /> <Link to={"/shop"}>Shop Now</Link>
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
