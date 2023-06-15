import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, selectProduct } from './singleProductSlice.js';
import { addToCart } from '../cart/cartSlice.js';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    console.log("this is singleProduct.jsx")
  }, [dispatch, id]);

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

export default SingleProduct;