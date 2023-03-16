import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, } from 'react';

import { getAllSpots } from '../../store/spots';
import { createNewSpot } from '../../store/spots';

import './CreateNewSpot.css'

export default function CreateNewSpot() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState('')

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImageURL = (e) => setImageURL(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const spot = {
            country,
            address,
            city,
            state,
            name,
            description,
            price,
            imageURL
        };
        const createdSpot = dispatch(createNewSpot(spot));
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    }

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    return (
        <section className='edit-form-spots'>
            <form onSubmit={handleSubmit}>
                <h1>Create a new Spot</h1>
                <h3>Where's your place located?</h3>
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
                        type='text' placeholder='price' min='1'
                        required value={price} onChange={updatePrice}
                    />
                </label>
                <hr></hr>
                <label>
                    <h3>Liven up your spot with photos</h3>
                    <span>Submit a link to at least one photo to publish your spot</span>
                    <br></br>
                    <input
                        type='text' placeholder='imageURL' min='1'
                        required value={imageURL} onChange={updateImageURL}
                    />
                </label>
                <hr></hr>
                <button type="submit">Create spot!</button>
            </form>
        </section>
    )
}
