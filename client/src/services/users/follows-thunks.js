import * as followService from "./follows-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userFollowsUserThunk = createAsyncThunk("follow/create", async (follow) => {
  const followed = follow.followed;
  const follower = follow.follower;
  const response = await followService.userFollowsUser(follower, followed);
  return response.data;
});

export const userUnfollowsUserThunk = createAsyncThunk("follow/delete", async (follow) => {
  const followed = follow.followed;
  const follower = follow.follower;
  const response = await followService.userUnfollowsUser(follower, followed);
  return {followed:followed,follower:follower};
});

export const findFollowsByFollowedIdThunk = createAsyncThunk("follow/findfollower", async (followed) => {
  const response = await followService.findFollowsByFollowedId(followed);
  return response;
});

export const findFollowsByFollowerIdThunk = createAsyncThunk("follow/findfollowed", async (follower) => {
  const response = await followService.findFollowsByFollowerId(follower);
  return response;
});

export const findFollowsByFollowerAndFollowedThunk = createAsyncThunk("follow/findfollowedandfollower", async (follow) => {
  const followed = follow.followed;
  const follower = follow.follower;
  const response = await followService.findFollowsByFollowerAndFollowed(follower, followed);
  return response;
});



