import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { setActiveSort } from "../../helpers/product";
import { getCategories } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";

const ShopCategories = (props) => {
  const { onCategorySelect } = props;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    onCategorySelect("");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        onCategorySelect(category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};


export default ShopCategories;
