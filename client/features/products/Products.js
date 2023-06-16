import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "./productSlice.js";
import { Link } from "react-router-dom";

const Products = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<div>
			<div className="container">
				<div className="products-grid">
					{allProducts.map((product) => (
						<div key={product.id} className="product-item">
							<div className="wrapper">
								<Link to={`/products/${product.id}`}>
									<h1>{product.name}</h1>
									<img src={product.imgUrl} alt={product.name} />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Products;
