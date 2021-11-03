import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByAnId } from "../actions/PostActions";
import { POST_DETAILS_RESET } from "../constants/PostConstants";
import Comments from "./Comments";
import Loader from "./Loader";
import "../styles/allStyles.css";
import ErrorHandler from "./ErrorHandler";

function PostDetails({ history, match }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const { post, error, loading } = postDetails;

  const formatDate = (date) => {
    return date.split(" ").slice(0, 4).join(" ");
  };

  const goBack = () => {
    history.push("/");
    dispatch({ type: POST_DETAILS_RESET });
  };

  const editPost = () => {
    history.push(`/post/${id}/edit`);
  };

  useEffect(() => {
    dispatch(getPostByAnId(id));
  }, [dispatch, id]);
  return error ? (
    <ErrorHandler error={error} />
  ) : loading ? (
    <Loader />
  ) : post ? (
    <>
      <div className="btn-details-container">
        <button onClick={goBack} className="btn go-back-btn">
          Go Back
        </button>
      </div>

      <div className="container-main">
        <div className="post detailed-post">
          <div className="post-top">
            <div className="post-owner-image-container">
              {post.owner.picture ? (
                <img
                  className="post-owner-image"
                  src={post.owner.picture}
                  alt={`post-${post.owner.id}`}
                />
              ) : (
                ""
              )}
            </div>
            <div className="post-user-information">
              <p>{`${post.owner.firstName} ${post.owner.lastName} `}</p>
              <span className="publishDate">
                {formatDate(new Date(post.publishDate).toUTCString())}
              </span>
            </div>
            <button onClick={editPost}>Edit Post</button>
          </div>

          <div className="post-content">
            <div className="post-content-image-container">
              <img
                className="post-content-image"
                src={post.image}
                alt={`post-${post.id}`}
              />
            </div>
          </div>
          <div className="post-text">
            <p>{post.owner.firstName}:</p>
            <span>{post.text}</span>
          </div>
          {!Array.isArray(post.tags) ? (
            ""
          ) : (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{`#${tag}`}</span>
              ))}
            </div>
          )}
        </div>
        <Comments postId={id} history={history} />
      </div>
    </>
  ) : (
    ""
  );
}

export default PostDetails;
