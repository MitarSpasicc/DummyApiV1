import axios from "axios";
import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILED,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAILED,
} from "../constants/CommentConstants";
import apiKey from "../dummyApiId";

export const getPostComments = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENTS_REQUEST });
    const config = {
      headers: {
        "app-id": apiKey,
      },
    };
    const { data } = await axios.get(
      `https://dummyapi.io/data/v1/post/${id}/comment`,
      config
    );
    dispatch({ type: COMMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENTS_FAILED,
      payload: error.response,
    });
  }
};

export const createComment = (message, owner, post) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST });
    const config = {
      headers: {
        "app-id": apiKey,
      },
    };
    const { data } = await axios.post(
      "https://dummyapi.io/data/v1/comment/create",
      { message, owner, post },
      config
    );
    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAILED,
      payload: error.response,
    });
  }
};
