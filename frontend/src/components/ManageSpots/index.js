import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import './ManageSpots.css';
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalDelete from "./OpenModalDelete";
function ManageSpots() {
    const spotsObj = useSelector(state => state.spots.userSpots)
    const spots = Object.values(spotsObj)
    const user = useSelector(state => state.session.user)
    // console.log("spots => ", spots)
    // console.log("user =>", user)
    const currUserId = user.id;
    // console.log(currUserId)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserSpots());
    }, [dispatch])
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const goToCreateSpot = () => {
        let path = `/spots/new`
        history.push(path);
    }

    // const goToEditSpot = () => {
    //     let path = `/spots/${spots.id}`
    //     history.push(path)
    // }
    // debugger
    if (!spots) return null;
    return (
        <div className="manage-spots-page">
            <div className="manage-place">
                <h1>Manage your spots</h1>
                <button onClick={goToCreateSpot}>Create a new spot</button>
                <br></br>
                <div className="user-spots">
                    {spots?.map(spot => {
                        return (
                            <div key={spot.id} className="spot-place">
                                {spot.previewImage !== "No Preview Image Available"
                                    ? <Link to={`/spots/${spot.id}`}><img alt="No preview Available"
                                        src={spot.previewImage}
                                    /></Link>
                                    : <Link to={`/spots/${spot.id}`}>No Preview Image Available</Link>}
                                <div className="city-rating-spot">
                                    <div>{spot.city}, {spot.state}</div>
                                    <div>
                                        {spot.avgRating === null
                                            ? (<i class="fa-solid fa-star">New</i>)
                                            : (<i class="fa-solid fa-star">{Number.parseFloat(spot.avgRating).toFixed(2)}</i>)
                                        }
                                    </div>
                                </div>
                                <div className="price">
                                    ${spot.price.toFixed(2)} night
                                </div>
                                <div className="update-delete-container">
                                    <div className="update-button">
                                        <Link to={`/spots/${spot.id}/edit`}>
                                            <button>Update</button>
                                        </Link>
                                    </div>
                                    <div className="delete-spot">
                                        <button className="delete-button">
                                        <OpenModalDelete
                                            itemText="Delete"
                                            modalComponent={<DeleteSpotModal spotId={spot.id}
                                            />}
                                            />
                                            </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ManageSpots;
