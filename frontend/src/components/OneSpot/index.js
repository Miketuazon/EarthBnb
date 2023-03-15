import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getOneSpot } from "../../store/spots";
import { NavLink, Link, useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
import "./OneSpot.css";

export default function OneSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spotDetails = useSelector((state) => state.spots.singleSpot)
    console.log("is this a spot =>", spotDetails)
    console.log("ensure spotId =>", spotId)

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch])

    return (
        <div className="spot-details-page">
            <div className="spot-details-container">
                <div className="name-city-state-country-container">
                    <div className="spot-name">Test Name</div>
                    <div className="spot-city-date-country">City, State, Country</div>
                </div>
                <div className="spot-images-container">
                    <div className="image-preview">Image preview goes here</div>
                    <div className="other-images">Other images</div>
                </div>
                <div className="below-image-container">
                    <div className="owner-description-container">
                        <div className="name-description">Hosted by FirstName LastName</div>
                        <div className="description">Description of spot</div>
                    </div>
                    <div className="price-ratings-review container">
                        <div className="price-rating-review">$123.45 night | <i class="fa-solid fa-star"></i> #.# | # reviews</div>
                        <button className="reserve">Reserve</button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="reviews-container">
                <div className="stars-reviews"><i class="fa-solid fa-star"/> #.# | # reviews </div>
                <div className="reviewer-info">
                    <div className="firstName-review">FirstName</div>
                    <div className="month-year">Month 20##</div>
                    <div className="review-description">I loved this place! blah blah blah</div>
                </div>
            </div>
        </div>
    )
}
