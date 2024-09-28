import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import menuService from "../services/menu.service";

//createMenu
export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await menuService.createMenu(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//get toppings
export const fetchToppings = createAsyncThunk("menu/fetchToppings", async (thunkAPI) => {
  try {
    const response = await menuService.getToppings();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  toppings: [],
  data:[],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
      resetMenu: (state) => {
        state.data = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchToppings.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchToppings.fulfilled, (state, {payload}) => {
          state.loading = false;
          state.toppings = payload;
        })
        .addCase(fetchToppings.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(createMenu.pending, (state) => {
          state.loading = true;
          state.error = null; 
        })
        .addCase(createMenu.fulfilled, (state, action) => {
          state.loading = false;
          state.data.push(action.payload); 
        })
        .addCase(createMenu.rejected, (state, payload) => {
          state.loading = false;
          state.error = payload;
        });
    },
  });
  
  export const { resetMenu } = menuSlice.actions;
  export default menuSlice.reducer;