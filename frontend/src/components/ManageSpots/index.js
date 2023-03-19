import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, getUserSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import './ManageSpots.css';

function ManageSpots () {
    const spots = useSelector(state => state.spots)
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
    if (!spots) return null;
    return (
        <>
        test
        </>
    )
}

export default ManageSpots;
