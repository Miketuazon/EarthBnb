import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { eraseReview } from "../../store/reviews";
import './DeleteReviewModal.css'

function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal;

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
        dispatch(eraseReview(reviewId))
    }
    return (
        <div className="delete-spot-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this review?</h2>
                <button type="submit">Yes (Delete Review) </button>
                <button onClick={closeModal}>No (Keep Review)</button>
            </form>
        </div>
    );
}

export default DeleteReviewModal
