import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "./productSlice.js";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);

  useEffect(() => {
    console.log("b4")
    dispatch(fetchAllProducts());
    console.log("after")
  }, [dispatch]);

  return (
    <div>
      <div>
        {allProducts.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
            <h1>{product.name}</h1>
            <img src={product.imgUrl} alt={product.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

