import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import authService from "../../services/authService";


/* =========================================================
   STORED USER
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

  let normalized =
    String(role)
      .trim()
      .toUpperCase();


  if (
    normalized.startsWith("ROLE_")
  ) {

    normalized =
      normalized.substring(5);
  }


  return normalized;
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

      /*
       * Remove previous user's session.
       */

      localStorage.removeItem("user");


      /*
       * Login using only email/password.
       */

      const response =
        await authService.login(
          loginData
        );


      console.log(
        "CARELINK BACKEND LOGIN RESPONSE:",
        response
      );


      /*
       * Find the user object.
       */

      const backendUser =
        response?.user ||
        response?.data?.user ||
        response;


      /*
       * Get role FROM BACKEND.
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
        normalizeRole(
          backendRole
        );


      console.log(
        "CARELINK BACKEND ROLE:",
        role
      );


      /*
       * Never default an unknown account to PATIENT.
       */

      if (!role) {

        return rejectWithValue(
          "Login successful, but the server did not return the user's role."
        );
      }


      /*
       * Get token.
       */

      const token =
        response?.token ||
        response?.accessToken ||
        response?.jwt ||
        backendUser?.token ||
        backendUser?.accessToken ||
        "";


      /*
       * Get name.
       */

      const fullName =
        backendUser?.fullName ||
        backendUser?.name ||
        response?.fullName ||
        response?.name ||
        "";


      /*
       * Get email.
       */

      const email =
        backendUser?.email ||
        response?.email ||
        loginData?.email ||
        "";


      /*
       * Create normalized user.
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
       * Store the authenticated user.
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
   SLICE
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


      .addCase(
        register.pending,
        (state) => {

          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = "";
        }
      )


      .addCase(
        register.fulfilled,
        (state) => {

          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
        }
      )


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