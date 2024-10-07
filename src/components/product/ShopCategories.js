import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { setActiveSort } from "../../helpers/product";
import { getCategories } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";

const ShopCategories = (props) => {
  //props pass from parent component
  const { onCategorySelect } = props;
  //useDispatch() hook is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  //useSelector hook is a feature provided by the React-Redux library that allows React components to access the state stored in a Redux store.
  const { categories } = useSelector((state) => state.products || {});
 // useEffect call for show categories on shop page
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="sidebar-widget">
      {/* Heading */}
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
              {/* onClick function called when user click on All Categories from categories list for get product by category */}
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
           {/* map method calls on array of Categories for showing all Categories on shop page*/}
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    {/* onClick function called when user click on any category from categories list for get product by category */}
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
