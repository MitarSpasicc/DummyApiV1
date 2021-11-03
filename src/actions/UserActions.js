import {
  CREATE_USER_FAILED,
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
} from "../constants/UserConstants";
import axios from "axios";
import apiKey from "../dummyApiId";

export const createNewUser =
  (firstName, lastName, email, picture) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_USER_REQUEST });
      const config = {
        headers: {
          "app-id": apiKey,
        },
      };
      const { data } = await axios.post(
        `https://dummyapi.io/data/v1/user/create`,
        { firstName, lastName, email, picture },
        config
      );
      dispatch({ type: CREATE_USER_SUCCESS, payload: data });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILED,
        payload: error.response,
      });
    }
  };
