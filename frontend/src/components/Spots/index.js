import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { Link } from "react-router-dom";


export default function Spots() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    let spotsObj = useSelector((state) => state.spots.allSpots)
    console.log("spot => ", spotsObj)

    // .map(spot => {
    //     return <div>{spot.name}</div>
    // })
    return (
        <div>
            {Object.values(spotsObj).map(spot => {
                return (
                    <div key={spot.id}>
                        {spot.previewImage !== "No Preview Image Available"
                            ?<Link to={`spot/${spot.id}`}><img alt="No preview Available" src={spot.previewImage}/></Link>
                            : <div>No Preview Image Available</div>}

                        <div className="city-rating-spot">
                            <div>{spot.city}, {spot.state}</div>
                            <div>
                            {spot.avgRating === "0.0"
                                ? `#.#`
                                : spot.avgRating
                            }
                            </div>
                        </div>
                        <div className="price">
                            ${spot.price}
                        </div>
                    </div>
                )
            })}

        </div>

    );
};
