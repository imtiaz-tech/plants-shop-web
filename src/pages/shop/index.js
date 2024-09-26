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
  const dispatch = useDispatch();

  const [selectCategory, setSelectCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const [searchProduct, setSearchProduct] = useState("");

  const { products, productsCount, isLoadingProducts } = useSelector((state) => state.products || {});

  const onCategorySelect = (category) => {
    setSelectCategory(category);
  };

  const onSortByChange = (sortByType) => {
    setSortBy(sortByType);
  };

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

  useEffect(() => {
    getProductsByPage();
  }, [currentPage, selectCategory, sortBy]);

  return (
    <Fragment>
      <OverlayLoading show={isLoadingProducts} />
      <MetaTags>
        <title>Shop Page</title>
        <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
      </MetaTags>

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
                  onSortByChange={onSortByChange}
                  productCount={productsCount}
                  currentProductCount={products?.length}
                />
                {/* shop page content default */}
                <ShopProducts products={products} />
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
