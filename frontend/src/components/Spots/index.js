import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { Link } from "react-router-dom";


export default function Spots() {
    // const [spots, setSpots] = useState({})
    const spotsObj = useSelector((state) => state.spots.allSpots)
    const spots = Object.values(spotsObj)

    console.log("spot => ", spots)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    // .map(spot => {
    //     return <div>{spot.name}</div>
    // })
    if (!spots.length) return null;
    return (
        <div>
            {spots.map(spot => {
                return (
                    <div key={spot.id} className="spot-place">
                        {spot.previewImage !== "No Preview Image Available"
                            ?<Link to={`spot/${spot.id}`}><img alt="No preview Available"
                            src={spot.previewImage}/></Link>
                            : <Link to={`spot/${spot.id}`}>No Preview Image Available</Link>}

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
