import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const createSpotButton = "create-spot" + (sessionUser ? "" : " hidden")
  return (
    <ul className="navBar">
      <li className='homeButton'>
        <NavLink exact to="/" id="home"><h2 className='title'>EarthBnB</h2></NavLink>
        <span class="tooltiptext">Return home</span>
      </li>
      {isLoaded && (
        <li>
          <NavLink className={createSpotButton} to="/spots/new">Create a new spot</NavLink>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
