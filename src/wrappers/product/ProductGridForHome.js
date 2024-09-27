import React, { Fragment } from "react";
import ProductGridSingleForHome from "../../components/product/ProductGridSingleForHome";
import { useSelector } from "react-redux";

const ProductGrid = ({
  sliderClassName,
  spaceBottomClass,
  
}) => {

  const { products} = useSelector((state) => state.products || {});
  

  

  return (
    <Fragment>
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
