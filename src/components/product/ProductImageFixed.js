import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {product?.discount || product?.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {/* get product image from product for showing single product */}
          <img
            src={ product?.image}
            alt=""
            className="img-fluid"
          />
        
      </div>
    </div>
  );
};


export default ProductImageFixed;
