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
       * Remove old login.
       */

      localStorage.removeItem("user");


      /*
       * Send login request.
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
       * Find backend user object.
       */

      const backendUser =
        response?.user ||
        response?.data?.user ||
        response;


      /*
       * Get backend role.
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


      /*
       * Normalize backend role.
       */

      const normalizedBackendRole =
        normalizeRole(
          backendRole
        );


      /*
       * Role selected on login page.
       */

      const selectedRole =
        normalizeRole(
          loginData?.role
        );


      /*
       * For the frontend dashboard:
       *
       * If the user selected Doctor,
       * keep Doctor.
       *
       * Otherwise use the backend role.
       */

      let finalRole =
        normalizedBackendRole;


      if (
        selectedRole === "DOCTOR"
      ) {

        finalRole = "DOCTOR";

      } else if (
        selectedRole === "CLINIC_ADMIN"
      ) {

        finalRole = "CLINIC_ADMIN";

      } else if (
        selectedRole === "PATIENT"
      ) {

        finalRole = "PATIENT";
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
       * Get user name.
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
       * Create final frontend user.
       */

      const user = {

        ...backendUser,

        fullName,

        email,

        role: finalRole,

        token,

      };


      console.log(
        "CARELINK LOGIN USER:",
        user
      );


      console.log(
        "CARELINK LOGIN ROLE:",
        finalRole
      );


      /*
       * Store user.
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

          state.user =
            action.payload;

          state.message = "";
        }
      )


      /* ===============================================
         LOGIN FAILED
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
         REGISTER FAILED
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