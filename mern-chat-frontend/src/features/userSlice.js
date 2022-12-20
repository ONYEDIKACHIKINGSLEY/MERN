 import {createSlice} from '@reduxjs/toolkit';
 import appApi from '../services/appApi';


 export const userSlice = createSlice ({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, {payload}) => {},
        resetNotifications: (state, {payload }) => {},

    },

    extraReducers: (builder) => {

        // To save user after signup

        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, {payload}) => payload);

        //To save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => payload);
        //To logout user
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);


    },

 });

 export const { addNotifications, resetNotifications } = userSlice.actions;
 export default userSlice.reducer;