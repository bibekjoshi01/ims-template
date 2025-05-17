// redux-toolkit
import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

// project-imports
import { snackbarListenerMiddleware } from '@/pages/common/redux/snackbarListenerMiddleware';
import { rootAPI } from './apiSlice';
import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  // reducer to store
  whitelist: ['auth']
};

const combinedMiddleware = (
  getDefaultMiddleware: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(snackbarListenerMiddleware, rootAPI.middleware);
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: combinedMiddleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
