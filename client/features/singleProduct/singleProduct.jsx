<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, selectProduct } from './singleProductSlice.js';
import { addToCart } from '../cart/cartSlice.js';
=======
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectProduct } from "./singleProductSlice.js";
import { addCartItem } from "../cart/cartSlice.js";
>>>>>>> 7013d2672db24f61c90467566bc94f7517d9463a

const SingleProduct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector(selectProduct);

	const me = useSelector((state) => state.auth.me);

<<<<<<< HEAD
  const handleAddToCart = () => {
    const userId = useSelector(state => state.auth.userId);
    dispatch(addToCart({ userId, productId: product.id }));
  };

  return (
    <>
    <div className='single-product-container'>
      <img src={product.imgUrl} alt={product.title} />
      <h1 className='single-product-title'>{product.name}</h1>
      <h2>Price: {product.price}</h2>
      <h2>Stock: {product.quantity}</h2>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
    </>
  )
}
=======
	console.log("Me,....", me);
>>>>>>> 7013d2672db24f61c90467566bc94f7517d9463a

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
		<>
			<div className="single-product-container">
				<img src={product.imgUrl} alt={product.title} />
				<h1 className="single-product-title">{product.name}</h1>
				<h2>Price: {product.price}</h2>
				<h2>Stock: {product.quantity}</h2>
				<p>{product.description}</p>
				<button onClick={handleAddToCart}>Add to Cart</button>
			</div>
		</>
	);
};

export default SingleProduct;
