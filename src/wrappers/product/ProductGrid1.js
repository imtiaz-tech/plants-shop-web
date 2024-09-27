import React, { Fragment } from "react";
import ProductGridSingle1 from "../../components/product/ProductGridSingle1";
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
          <ProductGridSingle1
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
