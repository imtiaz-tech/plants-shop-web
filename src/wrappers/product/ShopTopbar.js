import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = (props) => {
  const { onSortByChange, productCount, currentProductCount } = props;
  return (
    <Fragment>
      <ShopTopAction
        onSortByChange={onSortByChange}
        productCount={productCount}
        currentProductCount={currentProductCount}
      />
    </Fragment>
  );
};

export default ShopTopbar;
