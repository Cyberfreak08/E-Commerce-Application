import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserApi, signInApi, signUpApi } from "../apis/user.api";
import { warning } from "../utils/sharedService";
export const USER_KEY = "user";

const userSlice = createSlice({
  name: USER_KEY,
  initialState: {
    users: [],
    loggedUser: {},
    payment: false,
    success: false,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    updateLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    updateSuccess: (state, action) => {
      state.success = action.payload;
    },
    logoutCurrentUser: (state) => {
      state.loggedUser = {};
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const {
  getAllUsers,
  updateLoggedUser,
  updateSuccess,
  logoutCurrentUser,
  setPayment,
  setToken,
} = userSlice.actions;

export const signIn = (credentials) => {
  const { email } = credentials;
  return async (dispatch) => {
    try {
      const response = await signInApi(credentials);
      localStorage.setItem("x-auth-token", response.accessToken);
      dispatch(setToken(response.accessToken));
      dispatch(
        updateLoggedUser({
          userId: response.user.id,
          email,
          userName: response.user.name,
        })
      );
      dispatch(updateSuccess(true));
      warning("User logged in successfully", "success");
    } catch (err) {
      warning('Oops! Something is wrong please check your user credentials', "error");
      dispatch(updateSuccess(false));
    }
  };
};

export const signUpUser = (credentials) => {
  const { email } = credentials;
  return async (dispatch) => {
    try {
      const response = await signUpApi(credentials);
      localStorage.setItem("x-auth-token", response.accessToken);
      dispatch(setToken(response.accessToken));
      dispatch(
        updateLoggedUser({
          userId: response.user.id,
          email,
          userName: response.user.name,
        })
      );
      dispatch(updateSuccess(true));

      warning("User logged in successfully", "success");
    } catch (err) {
      warning('Oops! Failed to Sign Up please check your user credentials', "error");
      dispatch(updateSuccess(false));
    }
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await getCurrentUserApi();
      dispatch(
        updateLoggedUser({
          userId: response?.id,
          email: response?.email,
          userName: response?.name,
        })
      );
    } catch (err) {
      // warning(err.response?.data.message, "error");
      console.log(err);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      localStorage.removeItem("x-auth-token");
      dispatch(logoutCurrentUser());
      dispatch(updateSuccess(false));
      dispatch(setToken(null));
      warning("logout successfull", "success");
    } catch (err) {
      dispatch(updateSuccess(false));
    }
  };
};

export const userReducer = userSlice.reducer;
