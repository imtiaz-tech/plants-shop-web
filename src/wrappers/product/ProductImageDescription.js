import React from "react";
import { useToasts } from "react-toast-notifications";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageFixed from "../../components/product/ProductImageFixed";

const ProductImageDescription = (props) => {
  //props pass from parent component
  const{product,spaceTopClass,
    spaceBottomClass,
    cartItems,
    }=props;
     //useToasts used for show Toast when product add to cart
  const { addToast } = useToasts();


  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <ProductImageFixed
            //props pass to child component
            product={product}/>
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
            //props pass to child component
              product={product}
              cartItems={cartItems}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default ProductImageDescription;
