import {
  POST_LIST_REQUEST,
  POST_LIST_FAILED,
  POST_LIST_SUCCESS,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAILED,
  POST_DETAILS_RESET,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_FAILED,
  POST_EDIT_RESET,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAILED,
  POST_CREATE_RESET,
} from "../constants/PostConstants";

export const allPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };

    case POST_LIST_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postDetailsReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST: {
      return { ...state, loading: true };
    }
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };

    case POST_DETAILS_FAILED:
      return { loading: false, error: action.payload };

    case POST_DETAILS_RESET:
      return { post: null };

    default:
      return state;
  }
};

export const editPostReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case POST_EDIT_REQUEST: {
      return { ...state, loading: true };
    }
    case POST_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };

    case POST_EDIT_FAILED:
      return { loading: false, error: action.payload };

    case POST_EDIT_RESET:
      return { posts: null };

    default:
      return state;
  }
};

export const createPostReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST: {
      return { ...state, loading: true };
    }
    case POST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };

    case POST_CREATE_FAILED:
      return { loading: false, error: action.payload };

    case POST_CREATE_RESET:
      return { posts: null };

    default:
      return state;
  }
};
