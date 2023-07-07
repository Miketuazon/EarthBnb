import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            return setErrors(data.errors)
          }
        });
    }
    return setErrors(['Passwords do not match']);
  };


  return (
    <>
      <img id="background-form" src="https://images.immediate.co.uk/production/volatile/sites/7/2018/02/Earth-from-space-1-64e9a7c.jpg?quality=90&resize=980,654" />
      <h2 className="title">Welcome to EarthBnB</h2>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signUp-form">
        <ul>
          {errors?.map((error, idx) => <li key={idx} style={{color: "red", fontWeight: "bold", listStyle: "none"}}>{idx + 1}. {error}</li>)}
          {emailError && <li className="error-message">{emailError}</li>}
          {usernameError && <li className="error-message">{usernameError}</li>}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Must be at least 6 characters'
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          // disabled={errors.length}
          type="submit"
          className="signUp-button">Sign Up</button>
        {/* <button onClick={signDemoInfo}>Register as demo user!</button> */}
      </form>
    </>
  );
}

export default SignupFormModal;
