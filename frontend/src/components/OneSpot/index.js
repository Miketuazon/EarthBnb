import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
import "./OneSpot.css";
import { getSpotReviews } from "../../store/reviews";
import CreateNewReviewModal from "../CreateNewReviewModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal"

export default function OneSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spotDetails = useSelector((state) => state.spots.singleSpot)
    console.log("this is spot details =>", spotDetails)
    // console.log("ensure spotId =>", spotId)
    const owner = (spotDetails.Owner)
    console.log("should be owner", owner)
    const sessionUser = useSelector(state => state.session.user)
    console.log("should be user =>", sessionUser)
    // const spotImages = spotDetails.SpotImages // need to fix this later
    // console.log("spotImages", Object.entries(spotImages))
    const reviews = useSelector(state => (state.reviews.spot[spotId]))
    console.log("reviews => ", reviews)
    // debugger
    // const xReviews = useSelector(state => (state)) //testing reviews?
    // console.log("example xReviews", reviews)
    const avgReviewRating = useSelector((state) => state.spots.singleSpot.avgStarRating)
    // reviewDetails.forEach(review => {
    //     console.log("this is a single review user id", review.userId)
    // })
    // debugger                                            // cant create review if you own the place
    const createReviewButton = "create-spot" + (sessionUser && sessionUser?.id !== owner?.id ? "" : " hidden")
    const createDeleteButton = "create-spot" + (sessionUser && sessionUser?.id !== owner?.id ? "" : " hidden")
    const averageRating = useSelector(state => state.spots.singleSpot.avgStarRating)
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
    if (!spotDetails.SpotImages) return null
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
                        <div className="left-side">
                            <img
                                className="preview-image1"
                                src={image.url}
                            />
                        </div>
                            :
                            // <div className="right-side">
                                <img
                                    className="other-images"
                                    src={image.url === "" ? `https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg` : image.url}
                                    alt="no image yet"
                                    />
                            // </div>
                            )
                    }

                </div>
                <div className="below-image-container">
                    <div className="owner-description-container">
                        <div className="name-description">Hosted by {owner.firstName} {owner.lastName}</div>
                        <div className="description">{spotDetails.description}</div>
                    </div>
                    <div className="price-ratings-review container">
                        <div className="price-rating-review">
                            ${spotDetails.price} night
                            <i class="fa-solid fa-star"></i> {
                                spotDetails.avgStarRating === null ? 'NEW' : Number.parseFloat(spotDetails.avgStarRating).toFixed(2)
                            }
                            <div>
                                {spotDetails.numReviews === 1
                                    ? `${spotDetails.numReviews} review`
                                    : `${spotDetails.numReviews} reviews`
                                }
                            </div>
                        </div>
                        <button className="reserve-click" onClick={reserveClick}> Reserve
                        </button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="reviews-container">
                <div className="stars"><i class="fa-solid fa-star" />
                    {
                        spotDetails.avgStarRating === null
                            ? `NEW `
                            : `${spotDetails.avgStarRating} · `
                    }
                    <div className="review-count">
                        {spotDetails.numReviews === 0
                            ? <div className="be-the">Be the first to post a review!</div>
                            : spotDetails.numReviews === 1
                                ? `${spotDetails.numReviews} review`
                                : `${spotDetails.numReviews} reviews`
                        }

                    </div>
                </div>
                <div className={createReviewButton}>
                    <button className="post-button">
                        <OpenModalMenuItem
                            itemText={"Post Your Review"}
                            modalComponent={<CreateNewReviewModal />}
                        />
                    </button>
                </div>
                <div className={createDeleteButton}>
                    <button className="delete-button">
                        <OpenModalMenuItem
                            itemText={"Delete Your Review"}
                            modalComponent={<DeleteReviewModal />}
                        />
                    </button>
                </div>
                <div className="reviews">

                </div>
                {/* <div className="reviewer-info"> */}
                {/* {
                        <div className="new-spot-hider">

                        </div>
                    } */}
                {/* <div className="new-spot-hider">
                        {spotDetails.avgStarRating === null ? 'NEW' : (
                            reviewDetails?.map(reviewDetail => {
                                const date = new Date(reviewDetail.createdAt)
                                console.log(date)
                                console.log("day", date.getDate())
                                console.log("month", date.getMonth())
                                console.log("year", date.getFullYear())
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
                                const month = months[date.getMonth()];
                                const day = date.getDate();
                                const year = date.getFullYear();
                                console.log(reviewDetail)
                                return (
                                    <>
                                        <div className="firstName-review">{reviewDetail.User.firstName}</div>
                                        <div className="month-year">{month},{day},{year}</div>
                                        <div className="review-description">{reviewDetail.review}</div>
                                    </>
                                )
                            })
                        )
                        }
                    </div> */}
                {/* </div> */}
            </div>
        </div>
    )
}
