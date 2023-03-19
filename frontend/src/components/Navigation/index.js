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
        <NavLink
          style={{ textDecoration: 'none' }} exact to="/"
        >
          <i class="fa-solid fa-earth-americas" />
          EarthBnb
          <span class="tool-tip-text1">Return home</span>
        </NavLink>
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
