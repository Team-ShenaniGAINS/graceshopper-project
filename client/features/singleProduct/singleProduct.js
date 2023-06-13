import React from 'react';

const SingleProduct = ({ title, price, quantity, description, image }) => {
  const handleAddToCart = () => {
    handleAddToCart(title, price);
  };

  return (
    <>
    <div className='single-product-container'>
      <img src={image} alt={title} />
      <h1 className='single-product-title'>{title}</h1>
      <h2>{price}</h2>
      <h2>{quantity}</h2>
      <p>{description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default Product;
