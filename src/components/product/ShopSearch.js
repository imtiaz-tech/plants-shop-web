import React from "react";
const ShopSearch = (props) => {
  //props pass from parent component
  const { searchProduct, setSearchProduct, onSearchClick } = props;
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <div className="pro-sidebar-search-form">
          {/* onchange function called when setSearchProduct in input fields */}
          <input
            type="text"
            placeholder="Search here..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button onClick={onSearchClick}>
            <i className="pe-7s-search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSearch;
