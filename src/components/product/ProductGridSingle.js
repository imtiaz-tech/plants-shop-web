import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/authUser";

const ProductGridSingle = ({
  product,
  cartItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();
  const [quantityCount, setQuantityCount] = useState(1);

  const { cart } = useSelector((state) => state.auth || {});
  const singleProduct = cart?.find((item) => item.id == product._id);


  const AddToCart = () => {
    const data = {
      product,
      quantityCount,
      id: product._id,
    };
    dispatch(addToCart(data));
    addToast("Added To Cart", { appearance: "success", autoDismiss: true  });
  };

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
          <div className="product-img">
            <Link to={"/product/" + product._id}>
              <img className="default-img" src={product.image} alt="" />
            </Link>
            <div className="product-action">
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
                    {" "}
                    Buy now{" "}
                  </a>
                ) : product?.variation && product?.variation.length >= 1 ? (
                  <Link to={"/product/" + product._id}>Select Option</Link>
                ) : product.quantity && product.quantity > 0 ? (
                  <button
                  onClick={() => AddToCart()} disabled={singleProduct} className={singleProduct ? "active not-allowed" : ""}
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
        quantityCount={quantityCount}
        setQuantityCount={setQuantityCount}
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        setModalShow={setModalShow}
        addtoast={addToast}
      />
    </Fragment>
  );
};

export default ProductGridSingle;
