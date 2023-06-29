import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./UpdateBookingModal.css"
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { loadBookingsThunk, loadUserBookings, loadUserBookingsThunk, updateBookingThunk } from "../../store/bookings";
import "react-datepicker/dist/react-datepicker.css";

export default function UpdateBookingModal({ spotId, spotDetails, bookingDetails }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    // console.log("spotDetails => ", spotDetails)
    // console.log("spotId => ", spotId)
    const bookingsObj = useSelector(state => state.bookings.spot)
    const bookings = Object.values(bookingsObj)
    // console.log("bookings => ", bookings)
    // console.log("spotDetails", spotDetails)
    // console.log("bookingDetails => ", bookingDetails)


    const dateIso = new Date().toISOString().slice(0, 10)
    // console.log("dateIso", dateIso)

    const [startDate, setStartDate] = useState(new Date(bookingDetails.startDate).toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date(bookingDetails.endDate).toISOString().slice(0, 10));

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
        if (startDate > endDate) validationErrors.push(' Booking end date is before start date')
        // if (today > end) validationErrors.push(' Booking end date is before today.')
        // if (today > start) validationErrors.push(' Booking start date is before today.')
        if (startDate === endDate) validationErrors.push(' Booking start and end date cannot be the same day. Make end date at least one day after')

        for (let booking of bookings) {

            // console.log(booking)
            const alreadyBookedStartDate = booking.startDate
            const alreadyBookedEndDate = booking.endDate
            // console.log(startDate)
            // console.log(endDate)
            // debugger
            if (startDate <= alreadyBookedEndDate && startDate <= alreadyBookedStartDate
                && endDate >= alreadyBookedStartDate && endDate >= alreadyBookedEndDate) {
                validationErrors.push(`Booking is within the range of this booking: ${alreadyBookedStartDate.slice(5, 10)} to ${alreadyBookedEndDate.slice(5, 10)}.`)
            }
        }

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

        await dispatch(updateBookingThunk(createdBookingDates, bookingDetails.id));
        await dispatch(loadUserBookingsThunk())
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
    const endMonth = months[endDatee.getMonth()]
    const day = date.getDate()
    const endDay = endDatee.getDate()
    // console.log("date => ", date)
    // console.log("endDatee => ", endDatee)

    // bookings.map(booking => {
    //     // console.log(booking.startDate, booking.endDate)
    //     // console.log(typeof(booking.startDate))
    // })
    // console.log(errors)
    return (
        <div className="booking-modal">
            <ul>
                {errors?.map((error, idx) => (<li key={idx} style={{ "color": "red", "listStyle": "none" }}>ERROR: {error}</li>))}
            </ul>
            <h1>Confirm your booking</h1>
            <h2>Your trip</h2>
            <div className="dates-container">
                {/* {month} {day + 1} - {endMonth} {endDay + 1} */}
                {month} {startDate.slice(8, 10)} - {endMonth} {endDate.slice(8, 10)}
            </div>
            <div>Current bookings:</div>
            <div className="booked-dates-container">
                {
                    bookings.length ?
                        <div className="booked-dates-container">
                            {
                                bookings.filter(booking => booking.endDate < new Date().toDateString()).map(booking => (
                                    <div className="already-booked">
                                        <div className="booked-booking">{[booking.startDate.slice(5, 10)]} - {booking.endDate.slice(5, 10)}</div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="no-bookings">
                            There are currently no bookings for this spot.
                        </div>
                }
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
