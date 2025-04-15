import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import messageSliceReducer from "./slices/messageSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    message: messageSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
