import React, { Fragment, useState, useEffect } from "react";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { getProducts } from "../../helpers/product";
import productsData from "../../data/products.json";
import { useSelector } from "react-redux";

const ProductGrid = ({
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
}) => {

  const { ProductsByCategory } = useSelector((state) => state.products || {});
  console.log("🚀 ~ ProductsByCategory:", ProductsByCategory)


  return (
    <Fragment>
      {ProductsByCategory?.data?.map((product) => {
        return (
          <ProductGridSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems?.filter((cartItem) => cartItem.id === product.id)[0]
            }
            wishlistItem={
              wishlistItems?.filter(
                (wishlistItem) => wishlistItem.id === product.id
              )[0]
            }
            compareItem={
              compareItems?.filter(
                (compareItem) => compareItem.id === product.id
              )[0]
            }
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

export default ProductGrid;
