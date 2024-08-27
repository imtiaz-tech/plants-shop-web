import React from "react";

const ShopTopAction = (props) => {
  const { onSortByChange, productCount, currentProductCount } = props;
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select onChange={(e) => onSortByChange(e.target.value)}>
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <p>
          Showing {currentProductCount} of {productCount} result
        </p>
      </div>
    </div>
  );
};

export default ShopTopAction;
