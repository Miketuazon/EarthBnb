import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";
import './DeleteSpotModal.css'

function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        history.push(`/spots/current`)
        closeModal()
    };

    return (
        <div className="delete-spot-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this spot from the listings?</h2>
                <button type="submit" className="submit">Yes (Delete Spot) </button>
                <button onClick={closeModal} className="no">No (Keep Spot)</button>
            </form>
        </div>
    );
}


export default DeleteSpotModal
