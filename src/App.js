import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
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
const Register = lazy(() => import("./pages/other/Register.js"));
const Login = lazy(() => import("./pages/other/Login.js"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
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
            <Routes>
              <Route path="/" element={<Home />} />
              Shop pages
              <Route path="/shop" element={<Shop />} />
              {/* Shop product pages */}
              <Route path="/product/:id" element={<Product />} />
              {/* Blog pages */}
              <Route path="/blog" element={<Blog />} />
              {/* Other pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route exact component={NotFound} />
            </Routes>
          </Suspense>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

export default App;
