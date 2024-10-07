import React, { Fragment } from "react";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = (props) => {
  //props pass from parent component
  const { products } = props;

  return (
    //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
    {/* map method calls on array of products for showing all products on shop page*/}
      {products?.map((product) => {
        return <ProductGridListSingle product={product} />;
      })}
    </Fragment>
  );
};

export default ProductGrid;
