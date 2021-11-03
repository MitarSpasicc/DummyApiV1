import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../actions/UserActions";
import "../styles/allStyles.css";
import uploadImage from "../uploadImage";
import ErrorHandler from "./ErrorHandler";

function UserCreate({ closeModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const createdUser = useSelector((state) => state.createUser);
  const { success, error } = createdUser;

  const dispatch = useDispatch();

  const uploadNewImage = async (file) => {
    setChecked(false);
    const data = await uploadImage(file);
    if (data) {
      setPicture(data);
      setChecked(true);
    }
  };

  useEffect(() => {
    if (success) {
      closeModal();
    }
    if (error) {
      setIsVisible(true);
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [error, success, closeModal]);

  const createUser = (e) => {
    e.preventDefault();
    if (firstName && lastName && email) {
      dispatch(createNewUser(firstName, lastName, email, picture));
    }
  };
  return (
    <div className="create-user-modal scale-up-center">
      {isVisible && error && <ErrorHandler error={error} />}
      <i className="lni lni-cross-circle" onClick={closeModal}></i>
      <div className="form-container">
        <h4 className="form-heading">Create a User</h4>
        <form onSubmit={createUser}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last Name: </label>

          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="email">Email: (ex: example@example.com) </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your last name"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="picture">Upload picture: </label>

          <input
            type="file"
            name="picture"
            onChange={(e) => uploadNewImage(e.target.files[0])}
          />

          <button type="submit" disabled={!checked}>
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserCreate;
