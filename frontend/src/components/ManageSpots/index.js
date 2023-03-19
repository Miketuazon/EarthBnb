import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import './ManageSpots.css';

function ManageSpots() {
    const spotsObj = useSelector(state => state.spots.userSpots)
    const spots = Object.values(spotsObj)
    const user = useSelector(state => state.session.user)
    console.log("spots => ", spots)
    console.log("user =>", user)
    const currUserId = user.id;
    console.log(currUserId)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserSpots());
    }, [dispatch])

    const history = useHistory();

    const goToCreateSpot = () => {
        let path = `/spots/new`
        history.push(path);
    }

    if (!spots) return null;
    return (
        <div className="manage-spots-page">
            {spots?.map(spot => {
                return (
                    <div className="manage-place">
                        <h1>Manage your spots</h1>
                        <button onClick={goToCreateSpot}>Create a new spot</button>
                        <div className="user-spots">
                            Will implement spots here
                        </div>
                    </div>
                )
            })}
            test
        </div>
    )
}

export default ManageSpots;
