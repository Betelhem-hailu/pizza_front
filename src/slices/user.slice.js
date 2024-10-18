import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

export const register = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userService.register(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "user/registerAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userService.registerAdmin(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await userService.login(email, password);
      console.log(data);
      return { data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//create role
export const createRole = createAsyncThunk(
  "user/createRole",
  async ({roleName, permissionIds }, thunkAPI) => {
    try {
      const response = await userService.createRole({roleName, permissionIds });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get permissions
export const getPermissions = createAsyncThunk(
  "user/getPermissions",
  async (thunkAPI) => {
    try {
      const response = await userService.getPermissions();
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get roles
export const getRoles = createAsyncThunk("user/getRoles", async (thunkAPI) => {
  try {
    const response = await userService.getRoles();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//get users
export const getUsers = createAsyncThunk("user/getUsers", async (thunkAPI) => {
  try {
    const response = await userService.getUsers();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  isLoggedIn: false,
  user: 
  typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loading: false,
  data: [],
  permissions: [],
  roles: [],
  users: [],
  error: null,
  msg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoggedIn = false;
        state.msg = payload.data;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.error = payload;
      })
      .addCase(registerAdmin.fulfilled, (state, { payload }) => {
        state.isLoggedIn = false;
        state.msg = payload.data;
      })
      .addCase(registerAdmin.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.error = payload;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.user = payload.data;
        state.error = null;
        if (typeof window !== "undefined") {
          localStorage.setItem("userInfo", JSON.stringify(payload.data));
        }
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
        .addCase(createRole.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.error = null;
            state.loading = false;
        })
        .addCase(createRole.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.data = null;
        })
        .addCase(createRole.pending, (state) => {
            state.error = null;
            state.data = null;
            state.loading = true;
        })
        .addCase(getPermissions.fulfilled, (state, { payload }) => {
            state.permissions = payload;
            state.error = null;
            state.loading = false;
        })
        .addCase(getPermissions.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.permissions = null;
        })
        .addCase(getPermissions.pending, (state) => {
            state.error = null;
            state.permissions = null;
            state.loading = true;
        })
        .addCase(getRoles.fulfilled, (state, { payload }) => {
            state.roles = payload;
            state.error = null;
            state.loading = false;
        })
        .addCase(getRoles.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.roles = null;
        })
        .addCase(getRoles.pending, (state) => {
            state.error = null;
            state.roles = null;
            state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, { payload }) => {
            state.users = payload;
            state.error = null;
            state.loading = false;
        })
        .addCase(getUsers.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.users = null;
        })
        .addCase(getUsers.pending, (state) => {
            state.error = null;
            state.users = null;
            state.loading = true;
        });
  },
});

export const { reducer } = userSlice.actions;
export default userSlice.reducer;
