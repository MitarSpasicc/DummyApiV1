import {
  CREATE_USER_FAILED,
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_RESET,
} from "../constants/UserConstants";

export const createUserReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };

    case CREATE_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_USER_RESET:
      return { user: null };

    default:
      return state;
  }
};
