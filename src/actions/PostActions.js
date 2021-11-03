import axios from "axios";
import apiKey from "../dummyApiId";

import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAILED,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAILED,
  POST_EDIT_REQUEST,
  POST_EDIT_FAILED,
  POST_EDIT_SUCCESS,
  POST_CREATE_REQUEST,
  POST_CREATE_FAILED,
  POST_CREATE_SUCCESS,
} from "../constants/PostConstants";

export const getAllPosts = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const config = {
      headers: {
        "app-id": apiKey,
      },
    };
    const { data } = await axios.get(
      `https://dummyapi.io/data/v1/post?page=${page}&limit=${limit}`,
      config
    );
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAILED,
      payload: error.response,
    });
  }
};

export const getPostByAnId = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });
    const config = {
      headers: {
        "app-id": apiKey,
      },
    };
    const { data } = await axios.get(
      `https://dummyapi.io/data/v1/post/${id}`,
      config
    );
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAILED,
      payload: error.response,
    });
  }
};

export const editPost = (id, text, image, tags) => async (dispatch) => {
  console.log(tags);
  try {
    dispatch({ type: POST_EDIT_REQUEST });
    const config = {
      headers: {
        "app-id": apiKey,
      },
    };
    const editedPost = {
      text,
      image,
      tags,
    };
    const { data } = await axios.put(
      `https://dummyapi.io/data/v1/post/${id}`,
      editedPost,
      config
    );
    dispatch({ type: POST_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_EDIT_FAILED,
      payload: error.response,
    });
  }
};

export const createPost =
  (text, image, likes, tags, owner) => async (dispatch) => {
    try {
      dispatch({ type: POST_CREATE_REQUEST });
      const config = {
        headers: {
          "app-id": apiKey,
        },
      };

      const { data } = await axios.post(
        `https://dummyapi.io/data/v1/post/create`,
        { text, image, likes, tags, owner },
        config
      );
      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAILED,
        payload: error.response,
      });
    }
  };
