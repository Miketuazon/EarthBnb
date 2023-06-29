import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import './ManageSpots.css';
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalDelete from "./OpenModalDelete";
import LoaderIcon from "../LoaderIcon";
function ManageSpots() {
    const spotsObj = useSelector(state => state.spots.userSpots)
    const spots = Object.values(spotsObj)
    const user = useSelector(state => state.session.user)

    const obj = useSelector(state => state.spots.allSpots)
    // console.log("what is this", obj)
    const allSpots = Object.values(obj)

    const userSpots = []
    const currUserId = user.id;

    allSpots.filter(spot => spot.ownerId === currUserId).map(spot => {
        userSpots.push(spot)
    })

    // console.log(currUserId)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSpots());
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
    if (!spots) return <LoaderIcon/>;
    return (
        <div className="manage-spots-page">
            <div className="header">
                <h1>Manage your spots</h1>
                <button onClick={goToCreateSpot}>Create a new spot</button>
                <br></br>
            </div>
            <div className="manage-place">
                <div className="user-spots">
                    {
                    userSpots.length ?
                    allSpots?.map(spot => {
                        if (spot.ownerId === currUserId)
                            return (
                                <div key={spot.id} className="spot-place">
                                    <div className="spot-image-container">
                                        <span className="toolTipText">{spot.name}</span>
                                        {spot.previewImage !== "No Preview Image Available"
                                            ? <Link to={`${spot.id}`}><img alt="No preview Available"
                                                className="img"
                                                src={spot.previewImage}

                                            /></Link>
                                            : <Link to={`${spot.id}`}>No Preview Image Available</Link>}
                                    </div>
                                    <div className="description">
                                        <div className="city-rating-spot-manage">
                                            <div className="city-rating">
                                                <div className="city-state">{spot.city}, {spot.state}</div>
                                                <div>
                                                    {spot.avgRating === "0.0"
                                                        ? (<i class="fa-solid fa-star">New</i>)
                                                        : (<i class="fa-solid fa-star">{Number.parseFloat(spot.avgRating).toFixed(2)}</i>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="price">
                                            ${spot.price} night
                                        </div>
                                        <div className="update-delete-container">
                                            <div className="update">
                                                <Link to={`/spots/${spot.id}/edit`}>
                                                    <button id="update-button">Update</button>
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
                                </div>
                                // <div key={spot.id} className="spot-place">
                                //     <div className="spot-image-container">
                                //         {spot.previewImage !== "No Preview Image Available"
                                //             ? <Link to={`/spots/${spot.id}`}><img alt="No preview Available"
                                //                 src={spot.previewImage}
                                //             /></Link>
                                //             : <Link to={`/spots/${spot.id}`}>No Preview Image Available</Link>}
                                //     </div>
                                //     <div className="city-rating-spot">
                                //         <div>{spot.city}, {spot.state}</div>
                                //         <div>
                                //             {spot.avgRating === null
                                //                 ? (<i class="fa-solid fa-star">New</i>)
                                //                 : (<i class="fa-solid fa-star">{Number.parseFloat(spot.avgRating).toFixed(2)}</i>)
                                //             }
                                //         </div>
                                //     </div>
                                //     <div className="price">
                                //         ${spot.price.toFixed(2)} night
                                //     </div>
                                //     <div className="update-delete-container">
                                //         <div className="update-button">
                                //             <Link to={`/spots/${spot.id}/edit`}>
                                //                 <button>Update</button>
                                //             </Link>
                                //         </div>
                                //         <div className="delete-spot">
                                //             <button className="delete-button">
                                //                 <OpenModalDelete
                                //                     itemText="Delete"
                                //                     modalComponent={<DeleteSpotModal spotId={spot.id}
                                //                     />}
                                //                 />
                                //             </button>
                                //         </div>
                                //     </div>
                                // </div>
                            )
                    })
                : <div className="no-spots-holder">
                    <h1>Oh no, you have no spots!</h1>
                    <h2>Create a new spot to view and manage them!</h2>
                </div>
                }
                </div>
            </div>
        </div>
    )
}

export default ManageSpots;
