import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import ConnectionReducer from "./connectionSlice";
import RequestSlice from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: ConnectionReducer,
    requests: RequestSlice
  }
});

export default appStore;