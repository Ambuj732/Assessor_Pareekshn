import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Outlet } from "react-router";
function App() {
  return (
    <div className="font-custom">
      <Outlet />
    </div>
  );
}

export default App;
