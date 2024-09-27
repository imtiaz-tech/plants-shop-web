import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridForHome from "./ProductGridForHome";
const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  products
}) => {
  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${bgColorClass ? bgColorClass : ""}`}
    >
      <div className="container">
        <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
          </Nav>
          <Tab.Content>
              <div className="row">
                <ProductGridForHome
                products={products}
                //   limit={8}
                  spaceBottomClass="mb-25"
                />
              </div>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default TabProduct;