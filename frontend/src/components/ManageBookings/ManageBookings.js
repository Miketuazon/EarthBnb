import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import './ManageBookings.css';
// import OpenModalDelete from "./OpenModalDelete";
import LoaderIcon from "../LoaderIcon";
import { loadUserBookingsThunk } from "../../store/bookings";
import Spots from "../Spots";
import OpenModalDelete from "../ManageSpots/OpenModalDelete";
import OpenModalBooking from "../OneSpot/OpenModalBooking";
import UpdateBookingModal from "../UpdateBookingModal/UpdateBookingModal";

function ManageBookings() {
    const bookingsObj = useSelector(state => state.bookings.user)
    // console.log("bookingsObj => ", bookingsObj)
    const bookings = Object.values(bookingsObj)
    // console.log("bookings => ", bookings)
    const user = useSelector(state => state.session.user)
    const currUserId = user.id;
    // console.log(currUserId)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUserBookingsThunk(bookings))
    }, [dispatch])

    if (!bookings) return <LoaderIcon />
    return (
        <div className="manage-bookings-page">
            <div className="header">
                <h1>Manage your bookings</h1>
            </div>
            <div className="manage-booking">
                <div className="user-spots">
                    {
                        bookings.length > 1?
                        bookings.map(booking => {
                            const spot = booking.Spot
                            if (booking.userId === currUserId)
                                return (
                                    <div key={booking.id} className="spot-place">
                                        <span className="toolTipText">{spot.name}</span>
                                        <div className="spot-image-container">
                                            <span className="toolTipText">{spot.name}</span>
                                            {spot.previewImage !== "No Preview Image Available"
                                                ? <Link to={`/spots/${spot.id}`}><img alt="No preview Available"
                                                    className="img"
                                                    src={spot.previewImage}

                                                /></Link>
                                                : <Link to={`/spots/${spot.id}`}>No Preview Image Available</Link>}
                                        </div>
                                        <h3 className="">Booking: #{booking.id}</h3>
                                        <h4 className="booking-address">{spot.address}, {spot.city}, {spot.state}</h4>
                                        <div className="start-end-date">Dates booked: {booking.startDate.slice(5, 10)} - {booking.endDate.slice(5, 10)}</div>
                                        <div className="update-delete-container">
                                            <button className="update" id="update-button" style={{"listStyle": "none"}}>
                                                <OpenModalBooking
                                                    itemText="Update"
                                                    modalComponent={< UpdateBookingModal spotDetails={spot} spotId={spot.id}/>}
                                            />
                                            </button>
                                            <div className="delete-spot">
                                                <button className="delete-button">
                                                    <OpenModalDelete
                                                        itemText="Delete"
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                )
                        })
                    : <section className="no-bookings">
                        <h1>You have no bookings.</h1>
                        <h2>Go to a spot and create a booking!</h2>
                        </section>
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageBookings
