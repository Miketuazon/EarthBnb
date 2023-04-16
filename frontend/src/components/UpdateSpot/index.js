import React from 'react';
import { NavLink, Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, } from 'react';

import { updateSpot, getOneSpot } from '../../store/spots';

import './UpdateSpot.css'

export default function UpdateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spot = useSelector((state) => state.spots.allSpots[spotId])
    console.log('spots =>', spot)
    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [id] = useState(spot.id)

    const [imageURL, setImageURL] = useState(""); //preview
    // below commented out since it's optional for update spot
    // const [imageTwo, setImageTwo] = useState("");
    // const [imageThree, setImageThree] = useState("");
    // const [imageFour, setImageFour] = useState("");
    // const [imageFive, setImageFive] = useState("");

    const [errors, setErrors] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(parseInt(e.target.value));
    const updateImageURL = (e) => setImageURL(e.target.value);
    // const updateImageTwo = (e) => setImageTwo(e.target.value);
    // const updateImageThree = (e) => setImageThree(e.target.value);
    // const updateImageFour = (e) => setImageFour(e.target.value);
    // const updateImageFive = (e) => setImageFive(e.target.value);

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
        // if (!imageURL.length) validationErrors.push('Preview photo is required')
        if (validationErrors.length) return setErrors(validationErrors)

        // const spotImages = [
        //     {url: imageURL, preview: true},
        //     {url: imageTwo, preview: false},
        //     {url: imageThree, preview: false},
        //     {url: imageFour, preview: false},
        //     {url: imageFive, preview: false},
        // ]
        const updatedSpotDetails = {
            country, address, city, state, description, price, name, id
        }
        // debugger
        const newSpot = await dispatch(updateSpot(updatedSpotDetails))
        // console.log("spot edited", newSpot)
        history.push(`/spots/${spotId}`)
    }
    // debugger
    // console.log('errors', errors)


    return (
        <section className='edit-form-spots'>
            <form onSubmit={handleSubmit}>
            <img className='earth-img' src="https://cdn.shortpixel.ai/spai/q_lossy+w_754+h_424+to_auto+ret_img/https://cosmosmagazine.com/wp-content/uploads/2022/02/GettyImages-1313642868-min.jpg"></img>
                <h1>Update your Spot</h1>
                <h3>Where's your place located?</h3>
                <span>Guests will only get your exact address once they booked a reservation</span>
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
                        required value={description} onChange={updateDescription} className='description-box'
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
                <button type="submit">Update spot!</button>
            </form>
        </section>
    )
}
