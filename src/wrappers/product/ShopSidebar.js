import React from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";

const ShopSidebar = (props) => {
  const { onCategorySelect, setSearchProduct, searchProduct, onSearchClick } = props;
  return (
    <div className={`sidebar-style`}>
      <ShopSearch setSearchProduct={setSearchProduct} searchProduct={searchProduct} onSearchClick={onSearchClick} />
      <ShopCategories onCategorySelect={onCategorySelect} />
    </div>
  );
};
export default ShopSidebar;
