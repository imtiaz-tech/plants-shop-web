import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = (props) => {
  const { products } = props;
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row`}>
        <ProductgridList products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

export default ShopProducts;
