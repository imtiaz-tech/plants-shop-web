import React, { useState } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../../redux/authUser";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const ProductDescriptionInfo = (props) => {
    //props pass from parent component
  const { product, cartItems } = props;
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
    //useNavigate hook provides a simple API for navigating between pages in your React application.
  const navigate=useNavigate();
    //useState hook  used for setQuantityCount
  const [quantityCount, setQuantityCount] = useState(1);
    //useToasts used for show Toast when product add to cart
  const { addToast } = useToasts();

  const productCartQty = getProductCartQuantity(cartItems, product);
    //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { cart } = useSelector((state) => state.auth || {});
  const singleProduct = cart?.find((item) => item.id == product._id);

    //AddToCart function called when user clicked on Add to cart button on product image it requires 3 parameters product,quantityCount,id;
    //navigte to shop page
  const AddToCart = () => {
    const data = {
      product,
      quantityCount,
      id: product._id,
    };
    dispatch(addToCart(data));
    addToast("Added To Cart", { appearance: "success",autoDismiss: true });
    navigate("/shop")
  };

  return (
    <div className="product-details-content ml-70">
        {/* get product image from product for showing single product */}
      <h2>{product?.name}</h2>
      <div className="product-details-price">
        {/* get product price from product for showing single product */}
        <span>PKR {product?.price} </span>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: product?.textEditor,
        }}
        className="pro-details-list"
      ></div>
      {product?.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            {/* onclick function called when user setQuantityCount to subtract */}
            <button
              onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
              className="dec qtybutton"
            >
              -
            </button>
            <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
             {/* onclick function called when user setQuantityCount to add */}
            <button
              onClick={() =>
                setQuantityCount(quantityCount < product.quantity - productCartQty ? quantityCount + 1 : quantityCount)
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
           {/* onclick function called when user clicked on Add To Cart */}
            {product?.quantity && product?.quantity > 0 ? (
              <button onClick={() => AddToCart()} disabled={singleProduct} className={singleProduct ? "active not-allowed" : ""}>
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionInfo;
