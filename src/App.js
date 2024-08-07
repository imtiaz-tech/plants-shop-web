import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const Home = lazy(() => import("./pages/home"));
// shop pages
const Shop = lazy(() => import("./pages/shop"));

// product pages
const Product = lazy(() => import("./pages/single-product"));

// blog pages
const Blog = lazy(() => import("./pages/blog"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route exact path="/" component={Home} />

                {/* Shop pages */}
                <Route exact path="/shop" component={Shop} />

                {/* Shop product pages */}
                <Route
                  path={"/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                {/* Blog pages */}
                <Route exact path={"/blog"} component={Blog} />

                {/* Other pages */}
                <Route exact path={"/about"} component={About} />
                <Route exact path={"/contact"} component={Contact} />
                <Route exact path={"/my-account"} component={MyAccount} />
                <Route
                  exact
                  path={"/login-register"}
                  component={LoginRegister}
                />

                <Route exact path={"/cart"} component={Cart} />
                <Route exact path={"/wishlist"} component={Wishlist} />
                <Route exact path={"/compare"} component={Compare} />
                <Route exact path={"/checkout"} component={Checkout} />

                <Route path={"/not-found"} component={NotFound} />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
