import {
  COMMENTS_REQUEST,
  COMMENTS_FAILED,
  COMMENTS_SUCCESS,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAILED,
} from "../constants/CommentConstants";

export const listCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST: {
      return { ...state, loading: true };
    }
    case COMMENTS_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };

    case COMMENTS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createCommentReducer = (state = { comment: null }, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST: {
      return { ...state, loading: true };
    }
    case COMMENT_CREATE_SUCCESS:
      return {
        loading: false,
        comment: action.payload,
      };

    case COMMENT_CREATE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
