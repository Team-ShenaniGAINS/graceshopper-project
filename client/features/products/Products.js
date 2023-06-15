import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "./productSlice.js";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        {allProducts.map((product) => (
          <div key={product.id}>
            <div className="wrapper">
              <h1>{product.name}</h1>
              <img
                className="productImages"
                src={product.imgUrl}
                alt={product.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
