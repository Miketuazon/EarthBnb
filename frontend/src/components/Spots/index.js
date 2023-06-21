import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import './Spots.css'
import LoaderIcon from "../LoaderIcon";

export default function Spots() {
    // const [spots, setSpots] = useState({})
    const spotsObj = useSelector((state) => state.spots.allSpots)
    const spots = Object.values(spotsObj)

    // console.log("spot => ", spots)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])



    if (!spots.length) return <LoaderIcon />;
    return (
        <div className="spots-page">
            {spots?.map(spot => {
                return (
                    <Link key={spot.id} className="spot-place" to={`spots/${spot.id}`} target="_blank">
                        <span className="toolTipText">{spot.name}</span>
                        <div className="spot-image-container">
                            {/* <span className="toolTipText">{spot.name}</span> */}
                        {spot.previewImage !== "No Preview Image Available"
                            ? <Link to={`spots/${spot.id}`} target="_blank"><img alt="No preview Available"
                                className="img"
                                src={spot.previewImage}

                            /></Link>
                            : <Link to={`spots/${spot.id}`}>No Preview Image Available</Link>}
                        </div>
                        <div className="description">
                            <div className="city-rating-spot">
                                <div>{spot.city}, {spot.state}</div>
                                <div>
                                    {spot.avgRating === "0.0"
                                        ? (<i class="fa-solid fa-star">New</i>)
                                        : (<i class="fa-solid fa-star">{Number.parseFloat(spot.avgRating).toFixed(2)}</i>)
                                    }
                                </div>
                            </div>
                            <div className="price">
                                ${spot.price} night
                            </div>
                        </div>
                    </Link>
                )
            })}

        </div>

    );
};
