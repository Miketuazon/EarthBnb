import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };


  const createSpotButton = "create-spot" + (user ? "" : " hidden")
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div>
      <NavLink className={createSpotButton} to="/spots/new">EarthBnB your home</NavLink>
      <button onClick={openMenu} id="menu-button-top-right">
        <i class="fa-solid fa-bars"></i>
        &nbsp;&nbsp;
        <i className="fas fa-user-circle" />
      </button>
    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li style={{borderBottom: "1px solid lightgray"}}>{user.email}</li>
            <li><NavLink to="/spots/current">
              <div className="manage-dropdown">Manage Spots</div>
              </NavLink></li>
            <li style={{borderBottom: "1px solid lightgray"}}><NavLink to="/bookings/current">
              <div className="manage-dropdown">Manage Bookings</div>
              </NavLink></li>

            <li>
              <button onClick={logout} id="menu-button-top-right">Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
