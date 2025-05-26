import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Menu from "./Menu";
import ScollToTop from "./ScollToTop";

const Layout = () => {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
      <ScollToTop />
    </>
  );
};

export default Layout;
