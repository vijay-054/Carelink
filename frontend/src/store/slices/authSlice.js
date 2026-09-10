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
    const storedUser = localStorage.getItem("user");

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

  // If backend sends roles as an object
  if (typeof role === "object") {
    role =
      role.name ||
      role.role ||
      role.authority ||
      "";
  }

  let normalizedRole = String(role)
    .trim()
    .toUpperCase();

  if (normalizedRole.startsWith("ROLE_")) {
    normalizedRole = normalizedRole.substring(5);
  }

  return normalizedRole;
};


/* =========================================================
   GET ROLE FROM BACKEND RESPONSE
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

  // Handle roles array
  if (!role && Array.isArray(backendUser?.roles)) {
    role = backendUser.roles[0];
  }

  if (!role && Array.isArray(response?.roles)) {
    role = response.roles[0];
  }

  return normalizeRole(role);
};


/* =========================================================
   LOGIN
========================================================= */

export const login = createAsyncThunk(
  "auth/login",

  async (loginData, { rejectWithValue }) => {
    try {
      // Remove previous session
      localStorage.removeItem("user");

      // Login ONLY with email and password
      const response = await authService.login({
        email: loginData.email,
        password: loginData.password,
      });

      console.log(
        "=========================================="
      );

      console.log(
        "CARELINK BACKEND LOGIN RESPONSE:",
        response
      );

      /* -----------------------------------------------------
         BACKEND USER
      ----------------------------------------------------- */

      const backendUser =
        response?.user ||
        response?.data?.user ||
        response?.data ||
        response;

      /* -----------------------------------------------------
         ROLE FROM BACKEND
      ----------------------------------------------------- */

      const role = getBackendRole(response);

      console.log(
        "CARELINK BACKEND ROLE:",
        role
      );

      /* -----------------------------------------------------
         NEVER ASSUME PATIENT
      ----------------------------------------------------- */

      if (!role) {
        console.error(
          "CARELINK ERROR: Backend did not return a role."
        );

        return rejectWithValue(
          "Login successful, but the server did not return the user's role."
        );
      }

      /* -----------------------------------------------------
         TOKEN
      ----------------------------------------------------- */

      const token =
        response?.token ||
        response?.accessToken ||
        response?.jwt ||
        backendUser?.token ||
        backendUser?.accessToken ||
        "";

      /* -----------------------------------------------------
         NAME
      ----------------------------------------------------- */

      const fullName =
        backendUser?.fullName ||
        backendUser?.name ||
        response?.fullName ||
        response?.name ||
        "";

      /* -----------------------------------------------------
         EMAIL
      ----------------------------------------------------- */

      const email =
        backendUser?.email ||
        response?.email ||
        loginData.email;

      /* -----------------------------------------------------
         FINAL USER
      ----------------------------------------------------- */

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

      console.log(
        "=========================================="
      );

      /* -----------------------------------------------------
         SAVE USER
      ----------------------------------------------------- */

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

  async (registerData, { rejectWithValue }) => {
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


  /* =======================================================
     EXTRA REDUCERS
  ======================================================= */

  extraReducers: (builder) => {

    builder

      /* ---------------------------------------------------
         LOGIN PENDING
      --------------------------------------------------- */

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


      /* ---------------------------------------------------
         LOGIN SUCCESS
      --------------------------------------------------- */

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


      /* ---------------------------------------------------
         LOGIN FAILED
      --------------------------------------------------- */

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


      /* ---------------------------------------------------
         REGISTER PENDING
      --------------------------------------------------- */

      .addCase(
        register.pending,
        (state) => {

          state.isLoading = true;

          state.isError = false;

          state.isSuccess = false;

          state.message = "";
        }
      )


      /* ---------------------------------------------------
         REGISTER SUCCESS
      --------------------------------------------------- */

      .addCase(
        register.fulfilled,
        (state) => {

          state.isLoading = false;

          state.isError = false;

          state.isSuccess = true;

          state.message = "";
        }
      )


      /* ---------------------------------------------------
         REGISTER FAILED
      --------------------------------------------------- */

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


/* =========================================================
   EXPORTS
========================================================= */

export const {
  reset,
  logout,
} = authSlice.actions;

export default authSlice.reducer;