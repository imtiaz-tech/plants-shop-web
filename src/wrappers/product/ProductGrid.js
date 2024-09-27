import React, { Fragment } from "react";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { useSelector } from "react-redux";

const ProductGrid = ({
  sliderClassName,
  spaceBottomClass,
  
}) => {

  const { ProductsByCategory} = useSelector((state) => state.products || {});
  

  

  return (
    <Fragment>
      {ProductsByCategory?.data?.map((product) => {
        return (
          <ProductGridSingle
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
