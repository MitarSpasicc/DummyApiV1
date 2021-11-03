import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../actions/PostActions";
import { Link } from "react-router-dom";
import "../styles/allStyles.css";
import Loader from "../components/Loader";
import ErrorHandler from "./ErrorHandler";
import Pagination from "./Pagination";
import CreateUserModal from "./CreateUserModal";

function PostsList({ history }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(20);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const userCreate = useSelector((state) => state.createUser);
  const { user } = userCreate;
  const postsList = useSelector((state) => state.postsList);
  const {
    error,
    posts,
    posts: { total },
    loading,
  } = postsList;

  const formatDate = (date) => {
    return date.split(" ").slice(0, 4).join(" ");
  };

  const checkForUser = () => {
    if (!user) {
      setModal(true);
    } else {
      history.push("/posts/create");
    }
  };

  useEffect(() => {
    dispatch(getAllPosts(currentPage, postsPerPage));
  }, [dispatch, currentPage, postsPerPage]);

  return (
    <>
      {modal && (
        <CreateUserModal history={history} closeModal={() => setModal(false)} />
      )}
      {/* <Link to="/posts/create"> */}
      <button
        className="btn action-btn"
        disabled={loading}
        onClick={() => checkForUser()}
      >
        CreatePost
      </button>
      {/* </Link> */}
      {total ? (
        <Pagination
          totalPages={total}
          postsPerPage={postsPerPage}
          setPage={(number) => setCurrentPage(number)}
          currentPage={currentPage}
          goToPreviousPage={() => setCurrentPage((prev) => prev - 1)}
          goToNextPage={() => setCurrentPage((prev) => prev + 1)}
          goToEnd={(end) => setCurrentPage(end)}
          goToStart={() => setCurrentPage(0)}
        />
      ) : (
        ""
      )}

      {error ? (
        <ErrorHandler error={error} />
      ) : loading ? (
        <Loader />
      ) : (
        <div className="posts-container">
          {posts.data
            ? posts.data.map((post) => {
                return (
                  <div className="post list-post" key={post.id}>
                    <Link to={`/post/${post.id}`}>
                      <button className="showMore">Show more</button>
                    </Link>

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
                      <span>{post.text.substr(0, 35) + "..."}</span>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      )}
    </>
  );
}

export default PostsList;
