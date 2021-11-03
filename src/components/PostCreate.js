import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../actions/PostActions";
import "../styles/allStyles.css";
import uploadImage from "../uploadImage";
import ErrorHandler from "./ErrorHandler";
import { POST_CREATE_RESET } from "../constants/PostConstants";

function PostCreate({ history }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState(true);
  const [likes, setLikes] = useState(0);
  const createdPost = useSelector((state) => state.createPost);
  const createUser = useSelector((state) => state.createUser);
  const { user } = createUser;
  const { error, success } = createdPost;

  const goBackOneStep = () => {
    history.goBack();
  };

  useEffect(() => {
    if (success) {
      history.push("/");
      dispatch({ type: POST_CREATE_RESET });
    }
  }, [history, success, dispatch]);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
    }
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);

  const createNewPost = (e) => {
    e.preventDefault();
    let formatTags;
    if (tags.length === 0) {
      formatTags = [];
    } else if (tags.indexOf(",") === -1) {
      formatTags = [tags];
    } else {
      formatTags = tags.split(",");
    }
    dispatch(createPost(text, image, likes, formatTags, user.id));
  };

  const uploadNewImage = async (file) => {
    setChecked(false);
    const data = await uploadImage(file);
    if (data) {
      setImage(data);
      setChecked(true);
      console.log(data);
    }
  };

  return (
    <>
      {isVisible && error && <ErrorHandler error={error} />}
      <button className="btn" onClick={goBackOneStep}>
        Go Back
      </button>
      <div className="form-container">
        <h4 className="form-heading">Create Post</h4>
        <form onSubmit={createNewPost}>
          <label htmlFor="newText">Enter text:</label>
          <textarea
            required={true}
            type="text"
            rows="10"
            cols="30"
            name="newText"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor="newTags">Enter tags (separate by comma):</label>
          <input
            type="text"
            name="newTags"
            placeholder="Enter tags..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label htmlFor="newImage">Upload an image:</label>

          <input
            required={true}
            type="file"
            name="newImage"
            placeholder="Upload an image"
            onChange={(e) => uploadNewImage(e.target.files[0])}
          />

          <label htmlFor="likes">Set likes:</label>

          <input
            type="number"
            name="likes"
            placeholder="Set likes"
            onChange={(e) => setLikes(e.target.value)}
          />
          <button type="submit" disabled={!checked}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PostCreate;
