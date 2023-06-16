import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectProduct } from "./singleProductSlice.js";
import { addCartItem } from "../cart/cartSlice.js";

const SingleProduct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(selectProduct);

	const me = useSelector((state) => state.auth.me);

	console.log("Me,....", me);

	useEffect(() => {
		dispatch(fetchSingleProduct(id));
		console.log("this is singleProduct.jsx", id, product);
	}, [dispatch, id]);



	const handleAddToCart = () => {
		dispatch(
			addCartItem({
				userId: me.id,
				productId: id,
				quantity: 1,
				Product: product,
			})
		);
	};
	return (
		<div className="container">
			<div className="single-product-container">
				<img className="singleProductsImages" src={product.imgUrl} alt={product.title} />
				<div className='singleProductRightSide'>
					<h1 className="single-product-title">{product.name}</h1>
					<h2>Price: {product.price}</h2>
					<h2>Stock: {product.quantity}</h2>
					<p>{product.description}</p>
				</div>
				
					<button onClick={handleAddToCart}>Add to Cart</button>
				
				
			</div>
		</div>
	);
};

export default SingleProduct;
