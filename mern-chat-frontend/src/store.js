//To hold the state and reducers

import { configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";


//To prevent login anytime page is refreshed

import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux';
import {persistReducer } from 'redux-persist'
import thunk from "redux-thunk";


//Reducers

const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,

});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath],

};
// To persist store

const  persistedReducer = persistReducer(persistConfig, reducer);

//To create the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],

});

export default store;