import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/authUser";


const MenuCart = (props) => {
  const{  currency, deleteFromCart } =props
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const dispatch=useDispatch();
  const { cart } = useSelector((state) => state.auth || {});


  const totalPrice = cart?.reduce((totalProducts ,cartItem) => {
    return totalProducts += cartItem.product?.price * cartItem.quantityCount;
  }, 0)

  const productRemoveFromCart = (_id) => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div className="shopping-cart-content">
      {cart && cart.length > 0 ? (
        <Fragment>
          <ul>
            {cart.map((cart, key) => {
              
              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + cart?.id}>
                      <img
                        alt=""
                        src={cart.product?.image}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link>
                        {cart.product?.name}
                      </Link>
                    </h4>
                    <h6>Qty: {cart.quantityCount}</h6>
                    <span>
                    {cart.product?.price}
                    </span>
                    
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => productRemoveFromCart(cart.product._id)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total: {""}
              <span className="shop-total">
                {totalPrice}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={ "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={ "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default MenuCart;
