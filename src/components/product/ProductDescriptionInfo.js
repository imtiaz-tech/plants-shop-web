import React, { useState } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../../redux/authUser";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const ProductDescriptionInfo = (props) => {
  const { product, cartItems } = props;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [quantityCount, setQuantityCount] = useState(1);
  const { addToast } = useToasts();

  const productCartQty = getProductCartQuantity(cartItems, product);

  const { cart } = useSelector((state) => state.auth || {});
  const singleProduct = cart?.find((item) => item.id == product._id);


  const AddToCart = () => {
    const data = {
      product,
      quantityCount,
      id: product._id,
    };
    dispatch(addToCart(data));
    addToast("Added To Cart", { appearance: "success" });
    navigate("/shop")
  };

  return (
    <div className="product-details-content ml-70">
      <h2>{product?.name}</h2>
      <div className="product-details-price">
        <span>{product.price} </span>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: product.textEditor,
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
            <button
              onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
              className="dec qtybutton"
            >
              -
            </button>
            <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
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
            {product.quantity && product.quantity > 0 ? (
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
