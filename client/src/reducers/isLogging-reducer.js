import {createSlice} from "@reduxjs/toolkit";

const isLoggingSlice = createSlice(
    {
        name: "isLogging",
        initialState: [{isLogging: false}],
        reducers: {
            changeState(state, action) {
                state.isLogging = !state.isLogging;
            }
        }
    }
)

export const {changeState} = isLoggingSlice.actions;
export default isLoggingSlice.reducer;
