import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserBookingsThunk, deleteBookingThunk } from "../../store/bookings";

function DeleteBookingModal({ bookingId }) {
    const history = useHistory()
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // console.log("bookingId => ", bookingId)

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal();
        dispatch(deleteBookingThunk(bookingId));
        dispatch(loadUserBookingsThunk());
        return;
    };

    return (
        <div className="delete-booking-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this booking from your bookings?</h2>
                <button type="submit" className="submit">Yes (Delete Booking) </button>
                <button onClick={closeModal} className="no">No (Keep Booking)</button>
            </form>
        </div>
    )
}

export default DeleteBookingModal;
