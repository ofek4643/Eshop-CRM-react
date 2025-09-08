import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

// יצירת חנות
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// החזרת states והפעלת actions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
