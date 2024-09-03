import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductModal from "./ProductModal";
import { addToCart } from "../../redux/authUser";
import { useDispatch,useSelector } from "react-redux";

const ProductGridListSingle = (props) => {
  const dispatch=useDispatch();
  const { product } = props;
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
  const [quantityCount, setQuantityCount] = useState(1);
  const { cart } = useSelector((state) => state.auth || {});


  const AddToCart = () => {
    const data = {
      product,
      quantityCount,
      id:product._id,
      
    };
    dispatch(addToCart(data));
  };

  return (
    <Fragment>
      <div className={`col-xl-4 col-sm-6`}>
        <div className={`product-wrap`}>
          <div className="product-img">
            <Link to={"/product/" + product._id}>
              <img className="default-img" src={product.image} alt="" />
            </Link>
            <div className="product-action">
              {/* <div className="pro-same-action pro-wishlist">
                <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"}
                onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div> */}
              <div className="pro-same-action pro-cart">
                <button
                 onClick={()=> AddToCart ()}
                 className={cart && cart.quantity > 0 ? "active" : ""}
                
                > 
                  {""} 
                  <i className="pe-7s-cart"></i>
                  {cart && cart.quantity > 0 ? "Added" : "Add to cart"}

                      {/* Add to cart */}
                </button>
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              {product.name}
            </h3>
            <div className="product-price">
              <span>PKR {product.price} </span>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        quantityCount={quantityCount}
        setQuantityCount={setQuantityCount}
        // currency={currency}
        // cartitem={cartItem}
        // wishlistitem={wishlistItem}
        // compareitem={compareItem}
        // addtocart={addToCart}
        // addtowishlist={addToWishlist}
        // addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

export default ProductGridListSingle;
