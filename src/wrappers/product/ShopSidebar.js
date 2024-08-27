import React from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";

const ShopSidebar = (props) => {
  const { onCategorySelect } = props;
  return (
    <div className={`sidebar-style`}>
      <ShopSearch />
      <ShopCategories onCategorySelect={onCategorySelect} />
    </div>
  );
};
export default ShopSidebar;
