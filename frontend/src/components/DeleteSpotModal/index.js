import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot} from "../../store/spots";
import './DeleteSpotModal.css'

function DeleteSpotModal({spotId}) {
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user)
    console.log("spots => ", spot)
    console.log("user =>", user)
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
        return dispatch(deleteSpot(spotId))
    };

    return (
        <div className="delete-spot-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="delete-header">Confirm Delete</h1>
                <h2 className="delete-header">Are you sure you want to remove this spot from the listings?</h2>
                <button type="submit">Yes (Delete Spot) </button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </div>
    );
}


export default DeleteSpotModal
