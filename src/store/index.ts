import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import playlistReducer from "./slices/playlistSlice";
import searchReducer from "./slices/searchSlice"; 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistReducer,
    search: searchReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
