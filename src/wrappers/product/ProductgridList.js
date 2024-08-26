import React, { Fragment, useEffect } from "react";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <Fragment>
      {products?.map((product) => {
        return <ProductGridListSingle product={product} />;
      })}
    </Fragment>
  );
};

export default ProductGrid;
