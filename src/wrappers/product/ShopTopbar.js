import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = (props) => {
  //props pass from the parent component
  const { onSortByChange, productCount, currentProductCount } = props;
  return (
    <Fragment>
      <ShopTopAction
      //props pass to the child component
        onSortByChange={onSortByChange}
        productCount={productCount}
        currentProductCount={currentProductCount}
      />
    </Fragment>
  );
};

export default ShopTopbar;
