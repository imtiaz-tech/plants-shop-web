import React, { Fragment } from "react";
import ProductGridSingleForHome from "../../components/product/ProductGridSingleForHome";
import { useSelector } from "react-redux";

const ProductGrid = ({ sliderClassName, spaceBottomClass }) => {
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { products } = useSelector((state) => state.products || {});

  return (
    <Fragment>
      {/* map method calls on array of products for showing  products on Home  page*/}
      {products?.map((product) => {
        return (
          <ProductGridSingleForHome
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

export default ProductGrid;
