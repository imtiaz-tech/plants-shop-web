import React, { Fragment, useState, useEffect } from "react";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { getProducts } from "../../helpers/product";
import productsData from "../../data/products.json";

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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prods = getProducts(productsData, "plant", "new", 10);
    setProducts(prods);
  }, []);

  return (
    <Fragment>
      {products?.map((product) => {
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
