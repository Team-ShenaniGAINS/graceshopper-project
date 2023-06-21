import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  deleteProductAsync,
  selectProducts,
} from "./productSlice.js";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    console.log("Fetching all products");
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    console.log("Deleting product with id:", productId);
    dispatch(deleteProductAsync(productId))
      .then(() => {
        console.log("Product deleted successfully");
        dispatch(fetchAllProducts());
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  };
  console.log("allProducts:", allProducts);

  const productsArray = Array.isArray(allProducts) ? allProducts : [];

  return (
    <div>
      <div className="container">
        <div className="products-grid">
          {productsArray.map((product) => (
            <div key={product.id} className="product-item">
              <div className="wrapper">
                <Link to={`/products/${product.id}`}>
                  <h1>{product.name}</h1>
                  <img
                    className="productsImages"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                </Link>
              </div>
              {isAdmin && (
                <div className="delete-button">
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
