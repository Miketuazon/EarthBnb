import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { eraseReview, getSpotReviews } from "../../store/reviews";
import {getOneSpot} from "../../store/spots"
import './DeleteReviewModal.css'

function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log("should be review id inside del rev modal", reviewId)
    // console.log("spotId inside del rev modal", spot.id)
    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
        // history.push(`/`)
        dispatch(eraseReview(reviewId))
        dispatch(getOneSpot(spot.id))
        dispatch(getSpotReviews(spot.id))
    }
    return (
        <div className="delete-spot-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this review?</h2>
                <button className="submit" type="submit">Yes (Delete Review) </button>
                <button className="no"onClick={closeModal}>No (Keep Review)</button>
            </form>
        </div>
    );
}

export default DeleteReviewModal
