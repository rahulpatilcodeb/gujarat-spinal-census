import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userSlice from "./userSlice";

// for storing in local storage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};
// const rootPersistConfig = {
// 	key: 'root',
// 	storage,

//   }

const reducer = combineReducers({
  users: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";

// export function makeStore(){
//     return configureStore({
//         reducer: {
//             user: userSlice,
//         },
//     });
// }

// export const store = makeStore()

// export type RootState =ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
