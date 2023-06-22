import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./UpdateBookingModal.css"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { loadBookingsThunk, createBookingThunk } from "../../store/bookings";
import "react-datepicker/dist/react-datepicker.css";

export default function UpdateBookingModal({ spotId, spotDetails }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    // console.log("spotDetails => ", spotDetails)
    console.log("spotId => ", spotId)
    const bookingsObj = useSelector(state => state.bookings.spot)
    const bookings = Object.values(bookingsObj)
    console.log("bookings => ", bookings)
    console.log("spotDetails", spotDetails)


    const dateIso = new Date().toISOString().slice(0, 10)
    // console.log("dateIso", dateIso)

    const [startDate, setStartDate] = useState(dateIso);
    const [endDate, setEndDate] = useState(dateIso);

    const [errors, setErrors] = useState([]);

    const updateStartDate = (e) => setStartDate(e.target.value);
    const updateEndDate = (e) => setEndDate(e.target.value)

    useEffect(() => {
        dispatch(loadBookingsThunk(spotId))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = [];

        let start = new Date(startDate)
        let end = new Date(endDate)
        let today = new Date()
        if (start > end) validationErrors.push = (' Booking end date is before start date')
        if (today > end) validationErrors.push = (' Booking end date is before today.')
        if (today > start) validationErrors.push = (' Booking start date is before today.')

        // for (let booking of bookings) {
        //     debugger
        //     console.log(booking)
        // }

        if (validationErrors.length) return setErrors(validationErrors)

        // const yearStart = start.getFullYear()
        // const monthStart = start.getMonth() + 1
        // const dayStart = start.getDate()

        // const yearEnd = end.getFullYear()
        // const monthEnd = end.getMonth() + 1
        // const dayEnd = end.getDate()

        const createdBookingDates = {
            startDate, endDate
        }

        // await dispatch(createBookingThunk(createdBookingDates, spotId));
        closeModal()

    }

    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    const date = new Date(startDate)
    const endDatee = new Date(endDate)
    const month = months[date.getMonth()]
    const day = date.getDate()
    const endDay = endDatee.getDate()
    // console.log("date => ", date)
    // console.log("endDatee => ", endDatee)

    bookings.map(booking => {
        console.log(booking.startDate, booking.endDate)
        console.log(typeof(booking.startDate))
    })

    return (
        <div className="booking-modal">
            <ul>
                {errors?.map((error, idx) => (<li key={idx}>{error}</li>))}
            </ul>
            <h1>Edit your booking</h1>
            <h2>Your trip</h2>
            <div className="dates-container">
                {month} {day + 1} - {endDay + 1}
            </div>
            <br></br>
            <div className="already-booked-dates">
                {/* Already booked dates: */}
                <div className="booked-dates-container">
                    {
                        bookings.map(booking => (
                            <div className="already-booked">
                                <div>{[booking.startDate.slice(5,10)]} - {booking.endDate.slice(5,10)}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <form className="bookings-form" onSubmit={handleSubmit}>
                <label className="start-date-booking">Start Date</label>
                <input
                    type="date" id="startDate" value={startDate}
                    onChange={updateStartDate} min={dateIso}
                />
                <label className="end-date-booking">End Date</label>
                <input
                    type="date" id="endDate" value={endDate}
                    onChange={updateEndDate} min={startDate}
                />
                <div className="booking-button-container">
                    <button type="submit" className="submit" >Place booking</button>
                </div>
            </form>
        </div>
    )
}
