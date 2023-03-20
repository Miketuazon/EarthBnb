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
        closeModal()
        history.push(`/`)
        return dispatch(deleteSpot(spotId))
    };

    return (
        <div className="delete-spot-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this spot from the listings?</h2>
                <button type="submit">Yes (Delete Spot) </button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </form>
        </div>
    );
}


export default DeleteSpotModal
