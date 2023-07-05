import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, } from 'react';

import { createNewSpot, getAllSpots } from '../../store/spots';

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
        // if (!imageURL.endsWith(".png") && !imageURL.endsWith(".jpg") && !imageURL.endsWith(".jpeg")) {
        //     // validationErrors.push("Preview Image must end in .png, .jpg, or .jpeg")
        // }
        // // errors for extra images IF they are included
        // if (imageTwo.length > 0 && !imageTwo.endsWith(".png") && !imageTwo.endsWith(".jpg") && !imageTwo.endsWith(".jpeg")) {
        //     // validationErrors.push("2nd Image URL must end in .png, .jpg, or .jpeg")
        // }
        // if (imageThree.length > 0 && !imageThree.endsWith(".png") && !imageThree.endsWith(".jpg") && !imageTwo.endsWith(".jpeg")) {
        //     // validationErrors.push("3rd Image URL must end in .png, .jpg, or .jpeg")
        // }
        // if (imageFour.length > 0 && !imageFour.endsWith(".png") && !imageFour.endsWith(".jpg") && !imageTwo.endsWith(".jpeg")) {
        //     // validationErrors.push("4th Image URL must end in .png, .jpg, or .jpeg")
        // }
        // if (imageFive.length > 0 && !imageFive.endsWith(".png") && !imageFive.endsWith(".jpg") && !imageTwo.endsWith(".jpeg")) {
        //     // validationErrors.push("5th Image URL must end in .png, .jpg, or .jpeg")
        // }

        if (validationErrors.length) return setErrors(validationErrors)

        const spotImages = [
            { url: imageURL, preview: true },
            { url: imageTwo, preview: false },
            { url: imageThree, preview: false },
            { url: imageFour, preview: false },
            { url: imageFive, preview: false },
        ]
        const createdSpotDetails = {
            country, address, city, state, description, price, name,
        }
        const newSpot = await dispatch(createNewSpot(createdSpotDetails, spotImages))
        // console.log("new spot submitted", newSpot)
        history.push(`/spots/${newSpot.id}`)
    }
    // debugger
    // console.log('errors', errors)


    return (
        <section className='edit-form-spots'>
            <div className='bg-img'>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className='earth'>
                        <img className='earth-img' src="https://cdn.shortpixel.ai/spai/q_lossy+w_754+h_424+to_auto+ret_img/https://cosmosmagazine.com/wp-content/uploads/2022/02/GettyImages-1313642868-min.jpg"></img>
                    </div>
                    <div className='where-header'>
                        <h1>Create a new Spot</h1>
                        <h3>Where's your place located?</h3>
                    </div>
                    <div className='location'>
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
                        <div className='city-and-state'>
                            <label className='city-input'>
                                City
                                <input
                                    type='text' placeholder='city' min='1'
                                    required value={city} onChange={updateCity}
                                />
                                <label>
                                </label>
                            </label>
                            <label>
                                State
                                <input
                                    type='text' placeholder='state' min='1'
                                    required value={state} onChange={updateState}
                                />
                            </label>
                        </div>
                        <div className='guests'>*Guests will only get your exact address once they booked a reservation.*</div>
                    </div>
                    <hr className="black-line"></hr>
                    <label>
                        <h3>Describe your place to guests</h3>
                        <div>Mention the best features of your space, any special amenities like fast wifi or parking,
                            and what you love about the neighborhood.</div>
                        <textarea
                            className='description-box'
                            type='text' placeholder='Please write at least 30 characters' min='30'
                            required value={description} onChange={updateDescription} maxLength="400"
                        />
                        {description.length} / 400
                    </label>
                    <hr className="black-line"></hr>
                    <label>
                        <h3>Create a title for your spot</h3>
                        <div>
                            Catch guests' attention with a spot tile that
                            highlights your place special.
                        </div>
                        <input
                            type='text' placeholder='Name of your spot' min='1'
                            required value={name} onChange={updateName}
                        />
                    </label>
                    <hr className="black-line"></hr>
                    <label>
                        <h3>Set a base price for your spot</h3>
                        <div>Competitive pricing can help your listing stand out and rank
                            higher in search results.</div>
                        <div className='price'>
                            $
                            <input
                                type='number' placeholder='Price per night (USD)' min='1'
                                required value={price} onChange={updatePrice}
                            />
                        </div>
                    </label>

                    <hr className="black-line"></hr>
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
                    <hr className="black-line"></hr>
                    <ul className='errors' style={{listStyle: "none", color: "red", fontWeight: "bold"}}>
                        {/* will place errors next to labels later */}
                        {errors?.map((error, idx) => (<li key={idx}>ERROR: {error}</li>))}
                    </ul>
                    <button
                        // disabled={
                        //     country.length < 1 || address.length < 1 || city.length < 1 ||
                        //     state.length < 1 || description.length < 30 || name.length < 0 ||
                        //     price.length < 1 || imageURL.length < 1
                        // }
                        className='btn'
                        type="submit">Create spot!</button>
                </form>
            </div>
        </section>
    )
}
