import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";


export default function Spots() {
    const dispatch = useDispatch()
    const spotObject = useSelector((state) => state)
    const spots = Object.values(spotObject)
    console.log('spots', spots)

    useEffect(() => {
        dispatch(getAllSpots())
      }, [dispatch])

    return (
        <>
        test
        </>
    )}
