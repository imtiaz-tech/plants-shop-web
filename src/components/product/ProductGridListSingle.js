import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductModal from "./ProductModal";

const ProductGridListSingle = (props) => {
  const { product } = props;
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  return (
    <Fragment>
      <div className={`col-xl-4 col-sm-6`}>
        <div className={`product-wrap`}>
          <div className="product-img">
            <Link to={"/product/" + product._id}>
              <img className="default-img" src={product.image} alt="" />
            </Link>
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                // className={wishlistItem !== undefined ? "active" : ""}
                // disabled={wishlistItem !== undefined}
                // title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"}
                // onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                <button
                // onClick={() => addToCart(product, addToast)}
                // className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                // disabled={cartItem !== undefined && cartItem.quantity > 0}
                // title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
                >
                  {" "}
                  <i className="pe-7s-cart"></i>Add to cart
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
              <Link to={"/product/" + product._id}>{product.name}</Link>
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
