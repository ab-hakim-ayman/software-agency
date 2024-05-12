import React, { Fragment } from "react";
import Header from "../../Component/IT/header/Header";
import Footer from "../../Component/IT/footer/Footer";
import { Outlet } from "react-router-dom";

export default function CommonITLayout({ BrandLogo }) {
  return (
    <Fragment>
      <Header BrandLogo={BrandLogo} />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
