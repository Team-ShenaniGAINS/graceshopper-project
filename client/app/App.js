import React from "react";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import Products from "../features/products/Products";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Products />
    </div>
  );
};

export default App;