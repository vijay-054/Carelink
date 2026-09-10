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

  let normalizedRole = String(role)
    .trim()
    .toUpperCase();

  if (normalizedRole.startsWith("ROLE_")) {
    normalizedRole =
      normalizedRole.substring(5);
  }

  return normalizedRole;
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

      // Remove previous session
      localStorage.removeItem("user");


      // Login using email + password
      const response =
        await authService.login({
          email: loginData.email,
          password: loginData.password,
        });


      console.log(
        "CARELINK BACKEND LOGIN RESPONSE:",
        response
      );


      /*
       * Support different backend response formats.
       */

      const backendUser =
        response?.user ||
        response?.data?.user ||
        response;


      /*
       * Get role from backend.
       */

      const backendRole =
        backendUser?.role ||
        backendUser?.userRole ||
        backendUser?.roleName ||
        backendUser?.roles?.[0] ||
        response?.role ||
        response?.userRole ||
        response?.roleName ||
        response?.roles?.[0] ||
        "";


      const role =
        normalizeRole(backendRole);


      console.log(
        "CARELINK BACKEND ROLE:",
        role
      );


      /*
       * Do NOT default an unknown role to PATIENT.
       */

      if (!role) {

        return rejectWithValue(
          "Login successful, but the server did not return the user's role."
        );
      }


      /*
       * Token
       */

      const token =
        response?.token ||
        response?.accessToken ||
        response?.jwt ||
        backendUser?.token ||
        backendUser?.accessToken ||
        "";


      /*
       * Name
       */

      const fullName =
        backendUser?.fullName ||
        backendUser?.name ||
        response?.fullName ||
        response?.name ||
        "";


      /*
       * Email
       */

      const email =
        backendUser?.email ||
        response?.email ||
        loginData.email;


      /*
       * Final authenticated user
       */

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

      console.log(
        "CARELINK FINAL ROLE:",
        user.role
      );


      /*
       * Save user
       */

      localStorage.setItem(
        "user",
        JSON.stringify(user)
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
        error?.message ||
        "Login failed";


      return rejectWithValue(
        errorMessage
      );
    }
  }
);


/* =========================================================
   REGISTER
========================================================= */

export const register = createAsyncThunk(
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

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed";


      return rejectWithValue(
        errorMessage
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

const authSlice = createSlice({

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

      localStorage.removeItem("user");
    },
  },


  extraReducers: (builder) => {

    builder

      /* LOGIN PENDING */

      .addCase(
        login.pending,
        (state) => {

          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = "";

          state.user = null;
        }
      )


      /* LOGIN SUCCESS */

      .addCase(
        login.fulfilled,
        (state, action) => {

          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;

          state.user =
            action.payload;

          state.message = "";
        }
      )


      /* LOGIN FAILED */

      .addCase(
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
      )


      /* REGISTER PENDING */

      .addCase(
        register.pending,
        (state) => {

          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = "";
        }
      )


      /* REGISTER SUCCESS */

      .addCase(
        register.fulfilled,
        (state) => {

          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;

          state.message = "";
        }
      )


      /* REGISTER FAILED */

      .addCase(
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


export const {
  reset,
  logout,
} = authSlice.actions;


export default authSlice.reducer;