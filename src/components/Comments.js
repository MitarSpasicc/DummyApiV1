import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments, createComment } from "../actions/CommentActions";
import "../styles/allStyles.css";
import Loader from "./Loader";
import CreateUserModal from "./CreateUserModal";

function Comments({ postId }) {
  const [newComment, setNewComment] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.postComments);
  const {
    comments: { data },
  } = comments;
  const createdComment = useSelector((state) => state.createComment);
  const createUser = useSelector((state) => state.createUser);
  const { user } = createUser;
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  useEffect(() => {
    dispatch(getPostComments(postId));
  }, [dispatch, postId, createdComment]);

  const postComment = (e) => {
    e.preventDefault();
    if (!user) {
      setModal(true);
    }
    if (newComment && user) {
      dispatch(createComment(newComment, user.id, postId));
      setNewComment("");
    }
  };

  return (
    <div className="comments-container">
      {modal && <CreateUserModal closeModal={() => setModal(false)} />}
      <div className="comment-list-holder">
        {data ? (
          data
            .sort((a, b) => {
              return new Date(a.publishDate) - new Date(b.publishDate);
            })
            .map((comment) => {
              console.log(comment);
              return (
                <div
                  className="comment"
                  ref={window.innerWidth > 768 ? scrollRef : null}
                  key={comment.id}
                >
                  <div className="comment-info">
                    <div className="comment-owner-image-container">
                      <img
                        src={comment.owner.picture}
                        alt={comment.owner.picture}
                      />
                    </div>
                    <div className="comment-user-info">
                      <p>
                        {comment.owner.firstName} {comment.owner.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="comment-text">
                    <p>{comment.message}</p>
                  </div>
                </div>
              );
            })
        ) : (
          <Loader />
        )}
      </div>

      <div className="comment-create">
        <form onSubmit={postComment}>
          <button type="submit">New comment</button>
          <input
            className="new-comment"
            type="text"
            name="comment"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default Comments;
