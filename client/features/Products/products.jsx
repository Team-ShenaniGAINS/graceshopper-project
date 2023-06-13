import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "../../app/productSlice.js";

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
            <h1>{product.name}</h1>
            <img src={product.imgUrl} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

