const { createSlice, current } = require("@reduxjs/toolkit");
const {userFollowsUserThunk,
       userUnfollowsUserThunk,
findFollowsByFollowedIdThunk,
findFollowsByFollowerIdThunk,
} = require("../services/users/follows-thunks.js")

const initialState = {
  follows:[],
};


const followsSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {},
  extraReducers: {
    [userFollowsUserThunk.fulfilled]: (state, action) => {
          state.follows.push({_id:action.payload.follower});
        },
    [userUnfollowsUserThunk.fulfilled]: (state, action) => {
              state.follows = state.follows
                             .filter(t => t._id !== action.payload.follower);
            },
    [findFollowsByFollowedIdThunk.fulfilled]:(state, action) => {
              state.follows = action.payload;
    },
    [findFollowsByFollowerIdThunk.fulfilled]:(state, action) => {
                  state.follows = action.payload;
        },
  },
});

export default followsSlice.reducer;