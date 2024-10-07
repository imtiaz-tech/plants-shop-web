import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductModal from "./ProductModal";
import { addToCart } from "../../redux/authUser";
import { useDispatch, useSelector } from "react-redux";

const ProductGridListSingle = (props) => {
  //props pass from parent component
  const { product } = props;
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // usestate used to set modalshow
  const [modalShow, setModalShow] = useState(false);
  //useToasts used for show Toast when product add to cart
  const { addToast } = useToasts();
  // usestate used to set setQuantityCount
  const [quantityCount, setQuantityCount] = useState(1);
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { cart } = useSelector((state) => state.auth || {});
  const singleProduct = cart?.find((item) => item.id == product._id);
  //AddToCart function called when user clicked on Add to cart button on product image it requires 3 parameters product,quantityCount,id;
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
        //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
      <div className={`col-xl-4 col-sm-6`}>
        <div className={`product-wrap`}>
          <div className="product-img">
            <Link to={"/product/" + product._id}>
              <img className="default-img" src={product.image} alt="" />
            </Link>
            <div className="product-action">
              <div className="pro-same-action pro-cart">
                {/* onClick function called when user clicked on add to cart on product image */}
                <button onClick={() => AddToCart()} disabled={singleProduct} className={singleProduct ? "active not-allowed" : ""}>
                  <i className="pe-7s-cart"></i>
                  {singleProduct ? "Added" : "Add to cart"}
                </button>
              </div>
              <div className="pro-same-action pro-quickview">
              {/* onClick function called when user clicked on quickview on product image */}
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
          {/* get product name from product to shows on product page */}
            <h3>{product.name}</h3>
            <div className="product-price">
            {/* get product price from product to shows on product page */}
              <span>PKR {product.price} </span>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
       //props pass to child component
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
