import React from "react";
import AboutPareekshn from "../components/Assessor/AboutPareekshn";
import { Outlet } from "react-router";

function CorporateHome() {
  return (
    <div className="flex">
      <Outlet />
      <AboutPareekshn />
    </div>
  );
}

export default CorporateHome;
