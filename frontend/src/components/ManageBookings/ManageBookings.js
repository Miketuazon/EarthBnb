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

function ManageBookings() {
    const bookingsObj = useSelector(state => state.bookings.user)
    console.log("bookingsObj => ", bookingsObj)
    const bookings = Object.values(bookingsObj)
    console.log("bookings => ", bookings)
    const user = useSelector(state => state.session.user)
    const currUserId = user.id;


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUserBookingsThunk())
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
                        bookings.map(booking => {
                            const spot = booking.Spot
                            if (booking.userId === currUserId)
                            return (
                                <Link to={`/spots/${spot.id}`} key={booking.id} className="spot-place">
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
                                    <h3 className="">Order: {booking.id}</h3>
                                    <h4 className="booking-address">{spot.address}, {spot.city}, {spot.state}</h4>
                                    <div></div>
                                    <div></div>

                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageBookings
