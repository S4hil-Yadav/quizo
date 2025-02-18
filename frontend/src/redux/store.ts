import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizDraftReducer from "./quizDraft/quizDraftSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["quizDraft"],
};

const quizDraftConfig = {
  key: "quizDraft",
  storage,
};

const rootReducer = combineReducers({
  // theme: themeReducer,
  quizDraft: persistReducer(quizDraftConfig, quizDraftReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
