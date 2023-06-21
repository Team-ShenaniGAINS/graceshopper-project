import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../products/productSlice";


const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(addProductAsync({ name, price, imgUrl, quantity, description}))
        setName("")
        setPrice("")
        setImgUrl("")
        setQuantity("")
        setDescription("")
    }
    return (
        <form className='Product-form' onSubmit={handleSubmit}>
            <label>Name:</label>
            <input className="code-name-input"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                />
            <label>Price:</label>
            <input 
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)} 
                />
                <label>Quantity:</label>
            <input 
                name="quantitysetQuantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} 
                />
                <label>Description:</label>
            <input 
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                />
                <label>Image:</label>
            <input 
                name="imgUrl"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)} 
                />
                <button className="submit-button" type="submit">Submit</button>
                <Link to="/">Cancel</Link>
        </form>
    )
}

export default CreateProduct;