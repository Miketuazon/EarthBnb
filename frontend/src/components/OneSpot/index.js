import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
import "./OneSpot.css";

export default function OneSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spotDetails = useSelector((state) => state.spots.singleSpot)
    console.log("this is spot details =>", spotDetails)
    console.log("ensure spotId =>", spotId)
    const owner = (spotDetails.Owner)
    console.log("should be owner", owner)
    // const spotImages = spotDetails.SpotImages // need to fix this later
    // console.log("spotImages", Object.entries(spotImages))
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch])
    // debugger
    if (!spotDetails.SpotImages) return null
    return (
        <div className="spot-details-page">
            <div className="spot-details-container">
                <div className="name-city-state-country-container">
                    <div className="spot-name">{spotDetails.name}</div>
                    <div className="spot-city-date-country">{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</div>
                </div>
                <div className="spot-images-container">
                    <div className="image-preview">
                        {/* NEED TO FIX THIS BUG HERE BUT FOR LATER */}
                        { spotDetails.SpotImages.length === 0
                            ? <div>No images yet!</div>
                            : <div>{spotDetails.SpotImages}</div>
                        }
                        </div>
                    <div className="other-images">Other images</div>
                </div>
                <div className="below-image-container">
                    <div className="owner-description-container">
                        <div className="name-description">Hosted by {owner.firstName} {owner.lastName}</div>
                        <div className="description">{spotDetails.description}</div>
                    </div>
                    <div className="price-ratings-review container">
                        <div className="price-rating-review">
                            ${spotDetails.price} night
                            <i class="fa-solid fa-star"></i> {spotDetails.avgRating}
                            {spotDetails.numReviews} reviews</div>
                        <button className="reserve"> Reserve
                        <span class="toolTipText">Feature coming soon! :D</span>
                            </button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="reviews-container">
            <div>BELOW NEEDS TO BE IMPLEMENTED SOON!</div>
                <div className="stars-reviews"><i class="fa-solid fa-star" /> {parseFloat(spotDetails.avgStarRating).toFixed(2)} | {spotDetails.numReviews} reviews </div>
                <div className="reviewer-info">
                    <div className="firstName-review">FirstName</div>
                    <div className="month-year">Month 20##</div>
                    <div className="review-description">I loved this place! blah blah blah</div>
                </div>
            </div>
        </div>
    )
}
