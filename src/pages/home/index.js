import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layout";
import HeroSliderFour from "../../wrappers/hero-slider/HeroSliderFour";
import BannerFour from "../../wrappers/banner/BannerFour";
import FeatureIconThree from "../../wrappers/feature-icon/FeatureIconThree";
import Newsletter from "../../wrappers/newsletter/Newsletter";
import TabProduct from "../../wrappers/product/TabProducts";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products.js";

const HomePlants = () => {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products || {});

  const getProductsByPage = () => {
    const data = {
      currentPage:1,
      recordsPerPage:8,
      searchProduct:"",
      sortBy:"",
    };
    dispatch(getProducts(data));
  };
  useEffect(() => {
    getProductsByPage();
  }, []);
  

  return (
    <Fragment>
      <MetaTags>
        <title> Plants Home</title>
        <meta
          name="description"
          content="Plants home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <Layout footerBgClass="bg-gray-4">
        {/* hero slider */}
        <HeroSliderFour />
        {/* banner */}
        <BannerFour />
        {/* tab product */}
        <TabProduct
        products={products}
          spaceTopClass="pt-60"
          spaceBottomClass="pb-70"
          bgColorClass="bg-gray-2"
          category="plant"
        />
        {/* feature icon */}
        <FeatureIconThree
          bgColorClass="bg-gray-2"
          spaceBottomClass="pb-70"
          featureShapeClass="support-shape-2"
        />
        {/* newsletter */}
        <Newsletter
          bgColorClass="bg-gray-2"
          spaceBottomClass="pb-100"
          spaceLeftClass="pl-30"
          spaceRightClass="pr-30"
        />
      </Layout>
    </Fragment>
  );
};

export default HomePlants;
