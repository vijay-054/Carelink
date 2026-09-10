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

  let value =
    String(role)
      .trim()
      .toUpperCase();


  if (value.startsWith("ROLE_")) {

    value =
      value.substring(5);
  }


  return value;
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
       * Clear old session.
       */

      localStorage.removeItem("user");


      /*
       * Login.
       */

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
       * Find returned user.
       */

      const backendUser =
        response?.user ||
        response?.data?.user ||
        response ||
        {};


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
        loginData.email.split("@")[0];


      /*
       * Get email.
       */

      const email =
        backendUser?.email ||
        response?.email ||
        loginData.email;


      /*
       * IMPORTANT:
       *
       * For the frontend dashboard we use the
       * role selected on the Login page.
       *
       * This is why selecting Doctor will open
       * the Doctor Dashboard.
       */

      const selectedRole =
        normalizeRole(
          loginData.role
        );


      /*
       * Safety fallback only if no role was
       * selected.
       */

      const backendRole =
        normalizeRole(
          backendUser?.role ||
          response?.role ||
          ""
        );


      const finalRole =
        selectedRole ||
        backendRole ||
        "PATIENT";


      /*
       * Create frontend user.
       */

      const user = {

        ...backendUser,

        id:
          backendUser?.id ||
          response?.id,

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
        "CARELINK SELECTED ROLE:",
        selectedRole
      );


      console.log(
        "CARELINK FINAL ROLE:",
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