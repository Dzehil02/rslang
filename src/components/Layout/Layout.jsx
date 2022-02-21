import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavMenu from "../NavMenu";

const Layout = () => {
  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
