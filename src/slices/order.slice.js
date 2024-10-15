import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";


//get orders
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (thunkAPI) => {
    try {
      const response = await orderService.getOrders();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//update order status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    console.log(orderId)
    try {
      const response = await orderService.updateOrderStatus(orderId, status);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
  message: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearState: () => {
      return initialState; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.orders = payload.orders;
      })
      .addCase(getOrders.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(updateOrderStatus.fulfilled, (state, payload) => {
        state.loading = false;
        state.message = payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { clearState } = orderSlice.actions;
export default orderSlice.reducer;