import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const BannerFourSingle = ({ product, spaceBottomClass }) => {
  return (
    <div className="col-lg-4 col-md-4">
      <div
        className={`single-banner banner-shape banner-green-color ${
          spaceBottomClass ? spaceBottomClass : ""
        }`}
      >
        <Link to={"/shop"}>
          <img src={product?.image} alt="" />
        </Link>
        <div className="banner-content">
          <h3>{product?.name}</h3>
          <h4>
            {product?.subtitle} <span>{product?.price}</span>
          </h4>
          <Link to={"/shop"}>
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};



export default BannerFourSingle;
