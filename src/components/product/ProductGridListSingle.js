import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductModal from "./ProductModal";
import { addToCart } from "../../redux/authUser";
import { useDispatch, useSelector } from "react-redux";

const ProductGridListSingle = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
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
      <div className={`col-xl-4 col-sm-6`}>
        <div className={`product-wrap`}>
          <div className="product-img">
            <Link to={"/product/" + product._id}>
              <img className="default-img" src={product.image} alt="" />
            </Link>
            <div className="product-action">
              <div className="pro-same-action pro-cart">
                <button onClick={() => AddToCart()} disabled={singleProduct} className={singleProduct ? "active not-allowed" : ""}>
                  <i className="pe-7s-cart"></i>
                  {singleProduct ? "Added" : "Add to cart"}
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
            <h3>{product.name}</h3>
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
        setModalShow={setModalShow}
      />
    </Fragment>
  );
};

export default ProductGridListSingle;
