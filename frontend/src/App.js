import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import OneSpot from "./components/OneSpot"
import CreateNewSpot from "./components/CreateNewSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route path ='/spots/new'>
            <CreateNewSpot/>
          </Route>
          <Route exact path ='/spots/current'>
            <ManageSpots />
          </Route>
          <Route exact path ='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          <Route exact path='/spots/:spotId'>
            <OneSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
