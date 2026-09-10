import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import authService from "../../services/authService";


/* =========================================================
   GET USER FROM LOCAL STORAGE
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

    console.error(
      "Invalid user data in localStorage"
    );

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

  /*
   * Handles Spring Security style:
   * ROLE_DOCTOR
   * ROLE_PATIENT
   * ROLE_CLINIC_ADMIN
   */

  if (normalizedRole.startsWith("ROLE_")) {
    normalizedRole =
      normalizedRole.substring(5);
  }

  return normalizedRole;
};


/* =========================================================
   NORMALIZE USER
========================================================= */

const normalizeUser = (response) => {

  if (!response) {
    return null;
  }


  /*
   * Backend may return:
   *
   * {
   *   id,
   *   fullName,
   *   email,
   *   role,
   *   token
   * }
   *
   * OR
   *
   * {
   *   user: {
   *      id,
   *      fullName,
   *      email,
   *      role
   *   },
   *   token
   * }
   */


  const backendUser =
    response.user ||
    response.data?.user ||
    response;


  const role =
    backendUser?.role ||
    backendUser?.userRole ||
    backendUser?.roleName ||
    backendUser?.roles?.[0] ||
    response?.role ||
    response?.userRole ||
    response?.roleName ||
    response?.roles?.[0] ||
    "";


  const normalizedRole =
    normalizeRole(role);


  const token =
    response?.token ||
    response?.accessToken ||
    response?.jwt ||
    backendUser?.token ||
    backendUser?.accessToken ||
    "";


  const fullName =
    backendUser?.fullName ||
    backendUser?.name ||
    response?.fullName ||
    response?.name ||
    "";


  const email =
    backendUser?.email ||
    response?.email ||
    "";


  return {

    ...backendUser,

    fullName,

    email,

    role: normalizedRole,

    token,

  };
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
       * Remove old session before attempting
       * a new login.
       *
       * This prevents an old PATIENT session
       * from appearing while logging in as DOCTOR.
       */

      localStorage.removeItem("user");


      const response =
        await authService.login(
          loginData
        );


      const user =
        normalizeUser(response);


      if (!user) {

        return rejectWithValue(
          "Invalid login response"
        );
      }


      /*
       * If backend didn't return a role,
       * don't silently make the user PATIENT.
       */

      if (!user.role) {

        console.error(
          "Login response does not contain a role:",
          response
        );

        return rejectWithValue(
          "Login successful, but user role was not returned by the server."
        );
      }


      /*
       * Store normalized user.
       */

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      console.log(
        "CARELINK LOGIN USER:",
        user
      );

      console.log(
        "CARELINK LOGIN ROLE:",
        user.role
      );


      return user;

    } catch (error) {

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed";


      return rejectWithValue(
        message
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

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed";


      return rejectWithValue(
        message
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


      /* ===============================================
         LOGIN PENDING
      =============================================== */

      .addCase(
        login.pending,
        (state) => {

          state.isLoading = true;

          state.isError = false;

          state.isSuccess = false;

          state.message = "";

          /*
           * Important:
           * Clear the old user immediately.
           */

          state.user = null;
        }
      )


      /* ===============================================
         LOGIN SUCCESS
      =============================================== */

      .addCase(
        login.fulfilled,
        (state, action) => {

          state.isLoading = false;

          state.isError = false;

          state.isSuccess = true;

          state.user = action.payload;

          state.message = "";
        }
      )


      /* ===============================================
         LOGIN ERROR
      =============================================== */

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


      /* ===============================================
         REGISTER PENDING
      =============================================== */

      .addCase(
        register.pending,
        (state) => {

          state.isLoading = true;

          state.isError = false;

          state.isSuccess = false;

          state.message = "";
        }
      )


      /* ===============================================
         REGISTER SUCCESS
      =============================================== */

      .addCase(
        register.fulfilled,
        (state) => {

          state.isLoading = false;

          state.isError = false;

          state.isSuccess = true;

          state.message = "";
        }
      )


      /* ===============================================
         REGISTER ERROR
      =============================================== */

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