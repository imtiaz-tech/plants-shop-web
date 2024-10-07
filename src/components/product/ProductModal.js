import React, { Fragment } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import { addToCart } from "../../redux/authUser";
import { useDispatch,useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

function ProductModal(props) {
  //props pass from parent component
  const { product, setQuantityCount, quantityCount ,setModalShow} = props;
  //useNavigate hook provides a simple API for navigating between pages in your React application.
  const navigate = useNavigate();
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  //useToasts used for show Toast when product add to cart
  const { addToast } = useToasts();
  
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { cart } = useSelector((state) => state.auth || {});
  const singleProduct = cart?.find((item) => item.id == product._id);
   //productAddToCart function called when user clicked on Add to cart button on productmodal it requires 3 parameters product,quantityCount,id;
   //after add to cart show toast setmodal false and then navigate to shop page
  const productAddToCart = () => {
    const data = {
      product,
      quantityCount,
      id: product._id,
    };
    addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    dispatch(addToCart(data));
    setModalShow(false);
    navigate("/shop")
  };
  const productCartQty = getProductCartQuantity(cart, product);

  return (
    //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
      {/* Modala UI element that is used to display additional content or to prompt user interaction */}
      <Modal show={props.show} onHide={props.onHide} className="product-quickview-modal-wrapper">
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                {/* get product image from product to shows on productmodal page */}
                <img src={product.image} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {/* get product image from product to shows on productmodal page */}
                  <span>PKR {product.price} </span>
                </div>
               {/* get product descripiton from product to shows on productmodal page */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.textEditor,
                  }}
                  className="pro-details-list"
                ></div>
                {product.affiliateLink ? (
                  <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover">
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
                          setQuantityCount(
                            quantityCount < product.quantity - productCartQty ? quantityCount + 1 : quantityCount
                          )
                        }
                        className="inc qtybutton"
                      >
                        +
                      </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      {product.quantity && product.quantity > 0 ? (
                        // onclick function called when user clicked on Add To Cart
                        <button onClick={productAddToCart} disabled={singleProduct} className={singleProduct ? "active not-allowed" : ""}>
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
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default ProductModal;
