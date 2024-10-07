import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = (props) => {
  //props pass from parent component
  const { products } = props;
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row`}>
        <ProductgridList //props pass to child component
        products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

export default ShopProducts;
