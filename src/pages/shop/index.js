import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../../layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/products";
import OverlayLoading from "../../components/loading/overlayLoading";

const ShopGridStandard = () => {
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  //useState hook  used for setSelectCategory,setSortBy,setCurrentPage,recordsPerPage,setSearchProduct
  const [selectCategory, setSelectCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const [searchProduct, setSearchProduct] = useState("");
   //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { products, productsCount, isLoadingProducts } = useSelector((state) => state.products || {});
 //onCategorySelect function called when user click on any category on side bar
  const onCategorySelect = (category) => {
    setSelectCategory(category);
  };
 //onSortByChange function called when user clicked on default space for sort products by price high t low and low to high
  const onSortByChange = (sortByType) => {
    setSortBy(sortByType);
  };
  // getProductsByPage function used for showing products on Shop  page it used five parameters currentpage recordsperpage,searchProduct,sortBy,selectCategory
  const getProductsByPage = () => {
    const data = {
      currentPage,
      recordsPerPage,
      searchProduct,
      sortBy,
      selectCategory: selectCategory._id,
    };
    dispatch(getProducts(data));
  };
 //useEffect call when shop page render and shows current page
  useEffect(() => {
    getProductsByPage();
  }, [currentPage, selectCategory, sortBy]);

  return (
    //Fragments is used to group a list of children without adding extra nodes to the DOM.
    <Fragment>
         {/* import OverlaySpinner for loading */}
      <OverlayLoading show={isLoadingProducts} />
       {/* Handle document meta/head tags in isomorphic react with ease. */}
      <MetaTags>
      {/* title */}
        <title>Shop Page</title>
        <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
      </MetaTags>
      {/* The React Breadcrumb is a graphical user interface that serves as a navigation header for your web application or site */}
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/shop"}>Shop</BreadcrumbsItem>

      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                //props pass to the child component
                  products={products}
                  onSearchClick={getProductsByPage}
                  onCategorySelect={onCategorySelect}
                  searchProduct={searchProduct}
                  setSearchProduct={setSearchProduct}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  //props pass to the child component
                  onSortByChange={onSortByChange}
                  productCount={productsCount}
                  currentProductCount={products?.length}
                />
                {/* shop page content default */}
                <ShopProducts
                //props pass to child component 
                products={products} />
                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={productsCount}
                    pageNeighbours={1}
                    pageLimit={recordsPerPage}
                    setOffset={(e) => {
                      console.log(e);
                    }}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default ShopGridStandard;
