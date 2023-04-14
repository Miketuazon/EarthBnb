import React from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpotReviews, createNewReview } from '../../store/reviews'
import { useModal } from '../../context/Modal';
import './CreateNewReviewModal.css'

function CreateNewReviewModal({ spotId }) {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [activeStars, setActiveStars] = useState(0)
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user)
  const { closeModal } = useModal();

  const updateReview = (e) => setReview(e.target.value);
  // const updateStars = (e) => setStars(parseInt(e.target.value));

  const handleSubmit = async (e) => {
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
    await dispatch(createNewReview(createdReviewDetails, sessionUser, spotId))
    await dispatch(getSpotReviews(spotId))
    closeModal();
  }

  // use like petRating
  const onChange = (number) => {
    setStars(parseInt(number));
  };

  const starsIcon = (number) => {
    const props = {};
    props.onMouseEnter = () => setActiveStars(number);
    props.onMouseLeave = () => setActiveStars(stars);
    props.onClick = () => onChange(number);
    return (
        <div key={number} className={activeStars >= number ? "filled" : "empty"} {...props}>
            <i class="fa fa-star"></i>
        </div>
    );
};


  return (
    <section className='create-new-review-modal'>
      <form onSubmit={handleSubmit}>
        <h1>How was your stay?</h1>
        <ul>
          {errors?.map((error, idx) => (<li key={idx}>{error}</li>))}
        </ul>
        <label>
          <input
            type='textarea' placeholder='Leave your review here...' min='10'
            required value={review} onChange={updateReview}
          >
          </input>
        </label>
        <div className='stars-container'>
          <div className='stars-container-child1'>Stars</div>
          <div className="star-rating-input">
          {[1, 2, 3, 4, 5].map(number => starsIcon(number))}
          </div>
        </div>
        <button
          disabled={review.length < 10}
          type="submit">Submit Your Review!</button>
      </form>
    </section>
  )
}


export default CreateNewReviewModal
