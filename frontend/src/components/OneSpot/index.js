import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
import "./OneSpot.css";
import "../LoaderIcon/Loader.css"
import { getSpotReviews } from "../../store/reviews";
import CreateNewReviewModal from "../CreateNewReviewModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal"
import LoaderIcon from "../LoaderIcon";
import OpenModalBooking from "./OpenModalBooking";
import BookNewSpotModal from "../BookNewSpot/BookNewSpotModal";

export default function OneSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spotDetails = useSelector((state) => state.spots.singleSpot)
    // console.log("this is spot details =>", spotDetails)
    // debugger
    // console.log("ensure spotId =>", spotId)
    const owner = (spotDetails.Owner)
    // console.log("should be owner", owner)
    const sessionUser = useSelector(state => state.session.user)
    // console.log("should be user =>", sessionUser)
    // const spotImages = spotDetails.SpotImages // need to fix this later
    // console.log("spotImages", Object.entries(spotImages))
    const reviewsObj = useSelector(state => (state.reviews.spot))
    // console.log("reviewsObj => ", reviewsObj)
    const reviews = Object.values(reviewsObj)
    // console.log("reviews =>", reviews)

    // debugger
    // const xReviews = useSelector(state => (state)) //testing reviews?
    // console.log("example xReviews", reviews)
    // const avgReviewRating = useSelector((state) => state.spots.singleSpot.avgStarRating)
    // reviewDetails.forEach(review => {
    //     console.log("this is a single review user id", review.userId)
    // })

    // if there is a review from currUser, hide the createReviewButton
    // debugger                                            // cant create review if you own the place
    let createReviewButton = "create-spot" + (sessionUser && sessionUser?.id !== owner?.id ? "" : " hidden")
    const currReviewsForSpot = []

    reviews.forEach(review => {
        // console.log("each review", review)
        // console.log(spotId)
        if (Number(review.spotId) === Number(spotId)) currReviewsForSpot.push(review)
    })
    // console.log("currReviewsForSpot", currReviewsForSpot)

    currReviewsForSpot.forEach(currReview => {
        const reviewOwner = currReview.User
        if (reviewOwner?.id === sessionUser?.id) createReviewButton = "create-spot" + " hidden"
    })


    // const createDeleteButton = "create-spot" + (sessionUser && sessionUser?.id !== owner?.id ? "" : " hidden")
    // const averageRating = useSelector(state => state.spots.singleSpot.avgStarRating)

    const reserveClick = (e) => {
        e.preventDefault();
        alert('Feature Coming Soon...');
    };

    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])
    // debugger
    // 4 below lines commented out for now
    // let reviewUserIds = []
    // for (let review of Object.values(reviews)) {
    //     reviewUserIds.push(review.userId)
    // }

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
    // const date = new Date(reviews.createdAt)
    // const month = months[date.getMonth()];
    // const day = date.getDate();
    // const year = date.getFullYear();
    if (Object.keys(spotDetails).length === 0) return <LoaderIcon />
    return (
        <div className="spot-details-page">
            <div className="spot-details-container">
                <div className="name-city-state-country-container">
                    <h1 className="spot-name">{spotDetails.name}</h1>
                    <h2 className="spot-city-date-country">{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h2>
                </div>
                <div className="spot-images-container">
                    {spotDetails.SpotImages.map((image, idx) =>
                        idx === 0 ?
                            <img
                                className="preview-image1"
                                src={image.url}
                            />
                            :
                            <img
                                className="other-images"
                                src={image.url === "" ? `https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg` : image.url}
                                alt="no image yet"
                            />
                    )
                    }

                </div>
                <div className="below-image-container">
                    <div className="owner-description-container">
                        <h3 className="name-description">Hosted by {owner.firstName} {owner.lastName}</h3>
                        <div className="description">{spotDetails.description}</div>
                    </div>
                    <div className="price-ratings-review-container">
                        <div className="price-rating-review">
                            <div className="price-per-night">${spotDetails.price} night</div>
                            <div className="rating-review">
                                {
                                    spotDetails.avgStarRating === null
                                        ? <i class="fa-solid fa-star">NEW</i>
                                        : <i class="fa-solid fa-star">{Number.parseFloat(spotDetails.avgStarRating).toFixed(2)} &#x2022;</i>
                                }
                                <div>
                                    {spotDetails.numReviews > 0
                                        ? Number(spotDetails.numReviews) === 1 ? `${spotDetails.numReviews} review`
                                            : `${spotDetails.numReviews} reviews`
                                        : null}
                                </div>
                            </div>
                        </div>
                        {/* old click commented out */}
                        {/* <button className="reserve-click" onClick={reserveClick}> Reserve
                        </button> */}
                        {
                            sessionUser ?
                            owner.id !== sessionUser.id
                                ?
                                <button className="reserve-click" style={{ "listStyle": "none" }}>
                                    <OpenModalBooking
                                        itemText="Reserve"
                                        modalComponent={<BookNewSpotModal spotId={spotId} spotDetails={spotDetails}
                                        />}
                                    />
                                </button>
                                :
                                <button className="reserve-click" style={{ "listStyle": "none", "cursor":"not-allowed", "backgroundColor": "black" }} disabled >
                                    <div>Reserve disabled!</div>
                                    <div>You are the owner!</div>
                                </button>
                            : <button className="reserve-click" style={{ "listStyle": "none", "cursor":"not-allowed", "backgroundColor": "black" }} disabled >
                            <div>Reserve disabled!</div>
                            <div>You are not logged in!</div>
                        </button>
                        }
                    </div>
                </div>
            </div>
            <hr className="black-line"></hr>
            <div className="reviews-container">
                <h3 className="stars">
                    <div className="rating-review">
                        {
                            spotDetails.avgStarRating === null
                                ? <i class="fa-solid fa-star">NEW</i>
                                : <i class="fa-solid fa-star">{Number.parseFloat(spotDetails.avgStarRating).toFixed(2)} &#x2022;</i>
                        }
                        <div>
                            {spotDetails.numReviews > 0
                                ? (Number(spotDetails.numReviews) === 1 ? <>{spotDetails.numReviews} review</> : <>{spotDetails.numReviews} reviews</>)
                                : (sessionUser?.id !== owner.OwnerId ? <>Be the first one to post a review!</> : <></>)
                            }
                        </div>
                    </div>
                </h3>
                <div className={createReviewButton}>
                    <button className="post-button">
                        <OpenModalMenuItem
                            itemText={"Post Your Review"}
                            modalComponent={<CreateNewReviewModal spotId={spotId} />}
                        />
                    </button>
                </div>
                <div className="reviews">
                    {reviews?.map(review => {
                        const date = new Date(review.createdAt)
                        const month = months[date.getMonth()];
                        const day = date.getDate();
                        const year = date.getFullYear();
                        // console.log(spotId)
                        // console.log(review)
                        if (Number(review.spotId) === Number(spotId) && currReviewsForSpot.length > 0)
                            return (
                                <div key={review.id} className="review-place">
                                    <div className="review-container">
                                        <h4 className="review-owner">{review.User.firstName} {review.User.lastName[0]}.</h4>
                                        <h5 className="review-month-year">{month} {day}, {year}</h5>
                                        <div className="review-description">{review.review}</div>
                                        <div className="delete-button-here">
                                            {review.User.id === sessionUser?.id
                                                ? <button className="delete-button">
                                                    {/* {console.log("review data => ", review)} */}
                                                    <OpenModalMenuItem
                                                        itemText={"Delete Your Review"}
                                                        modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                                                    />
                                                </button>
                                                : <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        else return null
                    })}
                </div>
            </div>
        </div>
    )
}
