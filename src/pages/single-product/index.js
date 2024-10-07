import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, getProductsByCategory } from "../../redux/products";
import LoadingOverlay from "../../components/loading/overlayLoading";
const Product = () => {
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // useParams hooks of React-Router that returns a dynamic parameter of the URL that the user is currently on
  let params = useParams();
  const { id } = params;
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { product, isLoadingSingleProduct } = useSelector((state) => state.products || {});
  //useEffect  call when user click on single product image then product get by related category
  useEffect(() => {
    dispatch(getSingleProduct(id)).then((res)=>{
      const { data } = res?.payload;
      if(data?.categoryId){
        dispatch(getProductsByCategory(data?.categoryId));
      }
    });
  }, [id]);


  return isLoadingSingleProduct ? (
        // import OverlaySpinner for loading
    <LoadingOverlay />
  ) : (
        //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
             {/* Handle document meta/head tags in isomorphic react with ease. */}
      <MetaTags>
      {/* Title */}
        <title>Product Page</title>
        <meta name="description" content="Product page of flone react minimalist eCommerce template." />
      </MetaTags>
           {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/shop"}>Shop Product</BreadcrumbsItem>

      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription spaceTopClass="pt-100" spaceBottomClass="pb-100" product={product} />
        {/* related product slider */}
        <RelatedProductSlider spaceBottomClass="pb-95" />
      </Layout>
    </Fragment>
  );
};

export default Product;
