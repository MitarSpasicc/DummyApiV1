import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  allPostsReducer,
  postDetailsReducer,
  editPostReducer,
  createPostReducer,
} from "./reducers/PostReducer";
import {
  listCommentsReducer,
  createCommentReducer,
} from "./reducers/CommentReducer";
import { createUserReducer } from "./reducers/UserReducers";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  postsList: allPostsReducer,
  postDetails: postDetailsReducer,
  postComments: listCommentsReducer,
  editPost: editPostReducer,
  createPost: createPostReducer,
  createUser: createUserReducer,
  createComment: createCommentReducer,
});

const middleware = [thunk];

const userFromStorage = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  createUser: { user: userFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
