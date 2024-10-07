import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Header from "../wrappers/header";
import FooterOne from "../wrappers/footer/FooterOne";

const LayoutTwo = ({ children, footerBgClass }) => {
  return (
   //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
      <Header />
      <p style={{ marginBottom: 150 }}/>
      {children}
      <FooterOne
        backgroundColorClass={footerBgClass ? footerBgClass : "bg-gray"}
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </Fragment>
  );
};

LayoutTwo.propTypes = {
  children: PropTypes.any,
  footerBgClass: PropTypes.string
};

export default LayoutTwo;
