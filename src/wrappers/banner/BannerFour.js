import React, { useEffect } from "react";
import bannerData from "../../data/banner/banner-four.json";
import BannerFourSingle from "../../components/banner/BannerFourSingle.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products.js";

const BannerFour = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products || {});

  const getProductsByPage = () => {
    const data = {
      currentPage:1,
      recordsPerPage:3,
      searchProduct:"",
      sortBy:"",
    };
    dispatch(getProducts(data));
  };
  useEffect(() => {
    getProductsByPage();
  }, []);
    
  return (
    <div className="banner-area bg-gray-2">
      <div className="container">
        <div className="row">
          {products &&
            products?.map((single, key) => {
              return (
                <BannerFourSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BannerFour;
