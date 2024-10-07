import React from "react";

const ShopTopAction = (props) => {
  // props pass from the parent component
  const { onSortByChange, productCount, currentProductCount } = props;
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
        {/* onChange function called when user select Price - High to Low or Price - Low to High */}
          <select onChange={(e) => onSortByChange(e.target.value)}>
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <p>
           {/* showing product count and how many product on current page */}
          Showing {currentProductCount} of {productCount} result
        </p>
      </div>
    </div>
  );
};

export default ShopTopAction;
