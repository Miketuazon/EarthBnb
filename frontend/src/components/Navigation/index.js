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
        <NavLink exact to="/" id="home">
          <h2 className='title'>
            <i class="fa-solid fa-earth-americas"></i>EarthBnB
          </h2>
        </NavLink>
        <span class="tooltiptext">Return home</span>
      </li>
      <div className='footer'>
        <ul className='git-linked-link' style={{ listStyle: "none" }}>
          <li className='name'>
            Created by: Michael Tuazon
          </li>
          <li className='link'>
            <a href='https://www.linkedin.com/in/miketuazon/' target="_blank"><i class="fa-brands fa-linkedin"></i></a>
            &nbsp;&nbsp; |
            <a href='https://github.com/Miketuazon' target="_blank" className='end'><i class="fa-brands fa-github" style={{ "color": "gray" }}></i></a>
            &nbsp;&nbsp; |
            <a href='https://wellfound.com/u/michael-tuazon' target="_blank" className='end'><i class="fa-brands fa-angellist" style={{ "color": "gray", "listStyle": "none" }}></i></a>

          </li>
        </ul>
      </div>
      {isLoaded && (
        <li className='create-and-menu'>
          <div className='dropdown-items'>
            {/* <NavLink className={createSpotButton} to="/spots/new">Create a new spot</NavLink> */}
            <ProfileButton user={sessionUser} />
          </div>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
