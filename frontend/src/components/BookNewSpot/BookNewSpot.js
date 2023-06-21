import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allbookingofSpot } from "../../store/booking";
import { createBookingThunk } from "../../store/booking";
import "./BookNewSpot.css"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

export default function BookNewSpot() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [errors, setErrors] = useState("");

    return (
        <div className="booking-modal">
            <div>
                Hi
            </div>
        </div>
    )
}
