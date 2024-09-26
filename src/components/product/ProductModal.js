import React, { Fragment } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import { addToCart } from "../../redux/authUser";
import { useDispatch,useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

function ProductModal(props) {
  const { product, setQuantityCount, quantityCount ,setModalShow} = props;

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  

  const { cart } = useSelector((state) => state.auth || {});
  const singleProduct = cart?.find((item) => item.id == product._id);

  const productAddToCart = () => {
    const data = {
      product,
      quantityCount,
      id: product._id,
    };
    addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    dispatch(addToCart(data));
    setModalShow(false);
  };
  const productCartQty = getProductCartQuantity(cart, product);

  return (
    <Fragment>
      <Modal show={props.show} onHide={props.onHide} className="product-quickview-modal-wrapper">
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <img src={product.image} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  <span>PKR {product.price} </span>
                </div>
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
                      <button
                        onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
                        className="dec qtybutton"
                      >
                        -
                      </button>
                      <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
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
