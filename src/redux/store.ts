import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import navBarReducer from './slices/navBarSlice';
import searchReducerm from './slices/searchSlice';
import storage from 'redux-persist/lib/storage'; // Utiliza el almacenamiento local por defecto
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // Asegúrate de que el slice que quieres persistir esté en el whitelist
};

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    navBar: navBarReducer,
    search: searchReducerm
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);

// Exportar store y persistor
export { store, persistor };

// Exportación de tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
