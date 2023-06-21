import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProductAsync } from "../products/productSlice"
import { fetchSingleProduct } from "../singleProduct/singleProductSlice"

//Dylan: issues that may arise using ID, need help!

const EditProduct = ({productId}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
      event.preventDefault();
      await dispatch(editProductAsync({ productId, name, price, quantity, imgUrl, description }));
      await dispatch(fetchSingleProduct(productId))
      setName("");
      setPrice("");
      setQuantity("");
      setImgUrl("");
      setDescription("");
    };

  return (
    <form onSubmit={handleSubmit} id="formId">

    <label htmlFor="productName">Product Name:</label>
    <input
      name="productName"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />

    <label htmlFor="productPrice">Price:</label>
    <input
      name="price"
      value={price}
      onChange={(event) => setPrice(event.target.value)}
    />

    <label htmlFor="quantity">Quantity:</label>
    <input
      name="quantity"
      value={quantity}
      onChange={(event) => setQuantity(event.target.value)}
    />

    <label htmlFor="imgUrl">Img URL:</label>
    <input
      name="imgUrl"
      value={imgUrl}
      onChange={(event) => setImgUrl(event.target.value)}
    />

    <label htmlFor="description">Description:</label>
    <input
      name="description"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
    />

    <button type="submit">Update</button>
  </form>
  );
};

export default EditProduct;
