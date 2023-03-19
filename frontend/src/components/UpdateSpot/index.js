import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, } from 'react';

import { updateSpot, getAllSpots } from '../../store/spots';

import './UpdateSpot.css'

export default function UpdateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [imageURL, setImageURL] = useState(""); //preview
    const [imageTwo, setImageTwo] = useState("");
    const [imageThree, setImageThree] = useState("");
    const [imageFour, setImageFour] = useState("");
    const [imageFive, setImageFive] = useState("");

    const [errors, setErrors] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(parseInt(e.target.value));
    const updateImageURL = (e) => setImageURL(e.target.value);
    const updateImageTwo = (e) => setImageTwo(e.target.value);
    const updateImageThree = (e) => setImageThree(e.target.value);
    const updateImageFour = (e) => setImageFour(e.target.value);
    const updateImageFive = (e) => setImageFive(e.target.value);

    // debugger
    const handleSubmit = async (e) => {
        e.preventDefault()
        // handle validation errors | spot details
        const validationErrors = [];
        if (!country.length) validationErrors.push('Country is required')
        if (!address.length) validationErrors.push('Address is required')
        if (!city.length) validationErrors.push('City is required')
        if (!state.length) validationErrors.push('State is required')
        if (!description.length) validationErrors.push('Description is required')
        if (description.length < 30) validationErrors.push('Description needs at least 30 characters')
        if (!name.length) validationErrors.push('Title is required')
        if (typeof price !== 'number') validationErrors.push('Price must be a number')
        if (!price) validationErrors.push('Price is required')

        // handle validation errors | images
        if (!imageURL.length) validationErrors.push('Preview photo is required')
        if (validationErrors.length) return setErrors(validationErrors)

        const spotImages = [
            {url: imageURL, preview: true},
            {url: imageTwo, preview: false},
            {url: imageThree, preview: false},
            {url: imageFour, preview: false},
            {url: imageFive, preview: false},
        ]
        const createdSpotDetails = {
            country, address, city, state, description, price, name,
        }
        const newSpot = await dispatch(updateSpot(createdSpotDetails, spotImages))
        console.log("spot edited", newSpot)
        history.push(`/spots/${newSpot.id}`)
    }
    // debugger
    console.log('errors', errors)


    return (
        <section className='edit-form-spots'>
            <form onSubmit={handleSubmit}>
                <h1>Create a new Spot</h1>
                <h3>Where's your place located?</h3>
                <ul>
                    {/* will place errors next to labels later */}
                    {errors?.map((error, idx) => (<li key={idx}>{error}</li>))}
                </ul>
                <label>
                    Country
                    <input
                        type='text' placeholder='country' min='1'
                        required value={country} onChange={updateCountry}
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type='text' placeholder='address' min='1'
                        required value={address} onChange={updateAddress}
                    ></input>
                </label>
                <label>
                    City
                    <input
                        type='text' placeholder='city' min='1'
                        required value={city} onChange={updateCity}
                    />
                    <label>
                        ,
                    </label>
                </label>
                <label>
                    State
                    <input
                        type='text' placeholder='state' min='1'
                        required value={state} onChange={updateState}
                    />
                </label>
                <hr></hr>
                <label>
                    <h3>Describe your place to guests</h3>
                    <div>Mention the best features of your space, any special amenities like fast wifi or parking,
                    and what you love about the neighborhood.</div>
                    <textarea
                        type='textarea' placeholder='Please write at least 30 characters' min='30'
                        required value={description} onChange={updateDescription}
                    />
                </label>
                <hr></hr>
                <label>
                    <h3>Create a title for your spot</h3>
                    <div>
                        Catch guests' attention with a spot tile that
                        highlights your place special.
                    </div>
                    <input
                        type='text' placeholder='name' min='1'
                        required value={name} onChange={updateName}
                    />
                </label>
                <hr></hr>
                <label>
                    <h3>Set a base price for your spot</h3>
                    <div>Competitive pricing can help your listing stand out and rank
                    higher in search results.</div>
                    $
                    <input
                        type='number' placeholder='price' min='1'
                        required value={price} onChange={updatePrice}
                    />
                </label>

                <hr></hr>
                <label>
                    <h3>Liven up your spot with photos</h3>
                    <span>Submit a link to at least one photo to publish your spot</span>
                    <br></br>
                    <input
                        type='url' placeholder='Preview Image URL' min='1'
                        required value={imageURL} onChange={updateImageURL}
                    />
                    <br></br>
                    <input
                        type='url' placeholder='imageURL' min='1'
                        value={imageTwo} onChange={updateImageTwo}
                    />
                    <br></br>
                    <input
                        type='url' placeholder='imageURL' min='1'
                        value={imageThree} onChange={updateImageThree}
                    />
                    <br></br>
                    <input
                        type='url' placeholder='imageURL' min='1'
                        value={imageFour} onChange={updateImageFour}
                    />
                    <br></br>
                    <input
                        type='url' placeholder='imageURL' min='1'
                        value={imageFive} onChange={updateImageFive}
                    />
                    <br></br>
                </label>
                <hr></hr>
                <button type="submit">Update spot!</button>
            </form>
        </section>
    )
}
