import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { useSelector, useDispatch } from "react-redux";
import { productAddToCart } from "../../redux/authUser";

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
  const [quantityCount, setQuantityCount] = useState(1);

  

  const discountedPrice = getDiscountPrice(product?.price, product?.discount);
  const finalProductPrice = +(product?.price * currency?.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency?.currencyRate).toFixed(2);

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
          <div className="product-img">
            <Link to={"/product/" + product.id}>
              <img className="default-img" src={product.image} alt="" />
              {/* {product.image.length > 1 ? (
                <img className="hover-img" src={product.image[1]} alt="" />
              ) : (
                ""
              )} */}
            </Link>
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                {/* <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button> */}
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
                    {" "}
                    Buy now{" "}
                  </a>
                ) : product?.variation && product?.variation.length >= 1 ? (
                  <Link to={"/product/" + product.id}>Select Option</Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0 ? "Added" : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
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
              <Link to={"/product/" + product.id}>{product.name}</Link>
            </h3>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{currency?.currencySymbol + finalDiscountedPrice}</span>{" "}
                  <span className="old">{currency?.currencySymbol + finalProductPrice}</span>
                </Fragment>
              ) : (
                <span>{currency?.currencySymbol + finalProductPrice} </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        quantityCount={quantityCount}
        setQuantityCount={setQuantityCount}
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

export default ProductGridSingle;
