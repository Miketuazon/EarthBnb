import React from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleSpot, getAllSpots, } from '../../store/spots';
import { getSpotReviews, createNewReview } from '../../store/reviews'
import { useModal } from '../../context/Modal';

function CreateNewReviewModal({ spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = [];
        if (review.length < 10) validationErrors.push('Review must be at least 10 characters');
        if (!stars) validationErrors.push('You must at least put one star')
        if (validationErrors.length) {
            return setErrors(validationErrors)
        }

        const createdReviewDetails = {
            review, stars
        }
        const newReview = dispatch(createNewReview(createdReviewDetails, spotId, user))
        console.log("newReview submitted => ", newReview)
        history.push(`/spots/${spotId}`)
        closeModal();
    }

    return (
        <section className='create-new-review-modal'>
            <form onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <ul>
                    {errors?.map((error, idx) => (<li key={idx}>{error}</li>))}
                </ul>
                <label>
                    <input
                    type='text' placeholder='Leave your review here...' min='10'
                    required value={review} onChange={updateReview}
                    >
                    </input>
                </label>
                <label>
                    Stars
                <input
                    type='number' placeholder='' min='1'
                    required value={review} onChange={updateStars}
                    >
                    </input>
                </label>
                <button type="submit">Submit Your Review!</button>
            </form>
        </section>
    )
}


export default CreateNewReviewModal
