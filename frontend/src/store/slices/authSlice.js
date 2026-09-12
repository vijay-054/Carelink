import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import authService from "../../services/authService";


/* =========================================================
   GET STORED USER
========================================================= */

const getStoredUser = () => {
  try {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);

  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
};


/* =========================================================
   NORMALIZE ROLE
========================================================= */

const normalizeRole = (role) => {
  if (!role) {
    return "";
  }

  if (typeof role === "object") {
    role =
      role.name ||
      role.role ||
      role.authority ||
      "";
  }

  let normalizedRole =
    String(role)
      .trim()
      .toUpperCase();

  if (
    normalizedRole.startsWith("ROLE_")
  ) {
    normalizedRole =
      normalizedRole.substring(5);
  }

  return normalizedRole;
};


/* =========================================================
   GET ROLE
========================================================= */

const getBackendRole = (response) => {
  const backendUser =
    response?.user ||
    response?.data?.user ||
    response?.data ||
    response;

  let role =
    backendUser?.role ||
    backendUser?.userRole ||
    backendUser?.roleName ||
    backendUser?.authority ||
    response?.role ||
    response?.userRole ||
    response?.roleName ||
    response?.authority;

  if (
    !role &&
    Array.isArray(
      backendUser?.roles
    )
  ) {
    role =
      backendUser.roles[0];
  }

  if (
    !role &&
    Array.isArray(
      response?.roles
    )
  ) {
    role =
      response.roles[0];
  }

  return normalizeRole(role);
};


/* =========================================================
   LOGIN
========================================================= */

export const login = createAsyncThunk(
  "auth/login",

  async (
    loginData,
    { rejectWithValue }
  ) => {

    try {

      localStorage.removeItem("user");

      const response =
        await authService.login({
          email: loginData.email,
          password: loginData.password,
        });


      console.log(
        "CARELINK LOGIN RESPONSE:",
        response
      );


      /*
       * Your backend returns:
       *
       * {
       *   token,
       *   email,
       *   role
       * }
       */

      const backendUser =
        response?.user ||
        response?.data?.user ||
        response?.data ||
        response;


      /* ROLE */

      const role =
        getBackendRole(response);


      console.log(
        "CARELINK USER ROLE:",
        role
      );


      if (!role) {

        return rejectWithValue(
          "Login successful, but the server did not return a user role."
        );

      }


      /* TOKEN */

      const token =
        response?.token ||
        response?.accessToken ||
        response?.jwt ||
        backendUser?.token ||
        backendUser?.accessToken ||
        "";


      if (!token) {

        return rejectWithValue(
          "Login failed because the server did not return a token."
        );

      }


      /* EMAIL */

      const email =
        backendUser?.email ||
        response?.email ||
        loginData.email;


      /* NAME */

      const fullName =
        backendUser?.fullName ||
        backendUser?.name ||
        response?.fullName ||
        response?.name ||
        email;


      /* FINAL USER */

      const user = {
        ...backendUser,

        fullName,

        email,

        role,

        token,
      };


      console.log(
        "CARELINK FINAL USER:",
        user
      );


      /* SAVE USER */

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      /*
       * Also save token separately.
       *
       * This makes the session easier
       * to use elsewhere in the application.
       */

      localStorage.setItem(
        "token",
        token
      );


      return user;

    } catch (error) {

      console.error(
        "CARELINK LOGIN ERROR:",
        error
      );


      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Login failed";


      return rejectWithValue(
        typeof errorMessage === "string"
          ? errorMessage
          : "Login failed"
      );
    }
  }
);


/* =========================================================
   REGISTER
========================================================= */

export const register =
  createAsyncThunk(
    "auth/register",

    async (
      registerData,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await authService.register(
            registerData
          );

        return response;

      } catch (error) {

        console.error(
          "CARELINK REGISTER ERROR:",
          error
        );


        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data ||
          error?.message ||
          "Registration failed";


        return rejectWithValue(
          typeof errorMessage === "string"
            ? errorMessage
            : "Registration failed"
        );
      }
    }
  );


/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {

  user: getStoredUser(),

  isLoading: false,

  isError: false,

  isSuccess: false,

  message: "",
};


/* =========================================================
   AUTH SLICE
========================================================= */

const authSlice =
  createSlice({

    name: "auth",

    initialState,

    reducers: {

      reset: (state) => {

        state.isLoading = false;

        state.isError = false;

        state.isSuccess = false;

        state.message = "";
      },


      logout: (state) => {

        state.user = null;

        state.isLoading = false;

        state.isError = false;

        state.isSuccess = false;

        state.message = "";


        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "authToken"
        );
      },
    },


    extraReducers: (builder) => {

      /* ===================================================
         LOGIN PENDING
      =================================================== */

      builder.addCase(
        login.pending,
        (state) => {

          state.isLoading = true;

          state.isError = false;

          state.isSuccess = false;

          state.message = "";

          state.user = null;
        }
      );


      /* ===================================================
         LOGIN SUCCESS
      =================================================== */

      builder.addCase(
        login.fulfilled,
        (state, action) => {

          state.isLoading = false;

          state.isError = false;

          state.isSuccess = true;

          state.user =
            action.payload;

          state.message = "";
        }
      );


      /* ===================================================
         LOGIN FAILED
      =================================================== */

      builder.addCase(
        login.rejected,
        (state, action) => {

          state.isLoading = false;

          state.isError = true;

          state.isSuccess = false;

          state.user = null;

          state.message =
            action.payload ||
            "Login failed";
        }
      );


      /* ===================================================
         REGISTER PENDING
      =================================================== */

      builder.addCase(
        register.pending,
        (state) => {

          state.isLoading = true;

          state.isError = false;

          state.isSuccess = false;

          state.message = "";
        }
      );


      /* ===================================================
         REGISTER SUCCESS
      =================================================== */

      builder.addCase(
        register.fulfilled,
        (state) => {

          state.isLoading = false;

          state.isError = false;

          state.isSuccess = true;

          state.message = "";
        }
      );


      /* ===================================================
         REGISTER FAILED
      =================================================== */

      builder.addCase(
        register.rejected,
        (state, action) => {

          state.isLoading = false;

          state.isError = true;

          state.isSuccess = false;

          state.message =
            action.payload ||
            "Registration failed";
        }
      );
    },
  });


/* =========================================================
   EXPORT ACTIONS
========================================================= */

export const {
  reset,
  logout,
} = authSlice.actions;


export default authSlice.reducer;