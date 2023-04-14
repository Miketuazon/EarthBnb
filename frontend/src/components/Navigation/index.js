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
          style={{ font: '24px -apple-system' }} exact to="/"
        >
          <img className="earth" src="https://images.newscientist.com/wp-content/uploads/2021/06/09132308/credit_tetra-imagesalamy_anmp9y_web.jpg?crop=1:1,smart&width=1200&height=1200&upscale=true"/>
          EarthBnb
          <span className="toolTipText">Return home</span>
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
