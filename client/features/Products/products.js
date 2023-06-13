import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "../../app/productSlice";

//NOTE: not yet worked on! we need to create Slice, which requires STATE stuff to work, and ROUTES for links to work (to click into an individual product)

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div>
      <div>
        {allProducts.map((products) => {
          return (
            <div key={products.id}>
              <h1>{products.name}</h1>
              <img src={products.imgUrl} alt={products.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
