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
  const dispatch = useDispatch();
  let params = useParams();
  const { id } = params;
  const { product,ProductsByCategory, isLoadingSingleProduct } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(getSingleProduct(id)).then((res)=>{
      const { data } = res?.payload;
      if(data?.categoryId){
        dispatch(getProductsByCategory(data?.categoryId));

      }
    });
  }, [id]);


  return isLoadingSingleProduct ? (
    <LoadingOverlay />
  ) : (
    <Fragment>
      <MetaTags>
        <title>Flone | Product Page</title>
        <meta name="description" content="Product page of flone react minimalist eCommerce template." />
      </MetaTags>

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
