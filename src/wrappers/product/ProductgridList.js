import React, { Fragment } from "react";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = (props) => {
  const { products } = props;

  return (
    <Fragment>
      {products?.map((product) => {
        return <ProductGridListSingle product={product} />;
      })}
    </Fragment>
  );
};

export default ProductGrid;
