import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiUser, InviteUserRequest } from '../apiTypes';
import { LoadState, ThunkApiType, User } from '../types';


interface UsersState {
    loadState: LoadState,
    users: User[],
    inviteUserLoadState: LoadState,
};

const initialState: UsersState  = {
    loadState: LoadState.INIT,
    users: [],
    inviteUserLoadState: LoadState.INIT,
};


export const getUsersAsync = createAsyncThunk<ApiUser[], void, ThunkApiType>(
    'usersState/getUsers',
    async (_, thunkApi) => {
      const state = thunkApi.getState();
      const response = await thunkApi.extra.api(state).userService.getUsers();
      return response;
    }
);

export const inviteUserAsync = createAsyncThunk<void, InviteUserRequest, ThunkApiType>(
    'usersState/inviteUser',
    async (req, thunkApi) => {
      const state = thunkApi.getState();
      const response = await thunkApi.extra.api(state).userService.inviteUser(req);
      return response;
    }
);

export const uploadOrgDataAsync = createAsyncThunk<void, File, ThunkApiType>(
  'usersState/uploadOrgData',
  async (fileToUpload, thunkApi) => {
    const state = thunkApi.getState();
    const response = await thunkApi.extra.api(state).userService.getUploadUrl();
    const s3Response = await thunkApi.extra.api(state).userService.uploadToS3(fileToUpload, response);
    return s3Response;
  }
);

export const usersSlice = createSlice({
    name: 'UsersState',
    initialState,
    reducers: {
        setInviteUserLoadState: (state, action) => {
            state.inviteUserLoadState = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUsersAsync.pending, (state) => {
            state.loadState = LoadState.LOADING;
          })
          .addCase(getUsersAsync.fulfilled, (state, action) => {
            state.loadState = LoadState.LOADED;
            console.log(action.payload);
            state.users = action.payload.map((returnedUser) => (
                {
                    email: returnedUser.email,
                    username: returnedUser.user_name,
                    role: returnedUser.user_role,
                    familyName: returnedUser.last_name,
                    givenName: returnedUser.first_name,
                    enabled: returnedUser.enabled,
                }
            ))
          })
          .addCase(getUsersAsync.rejected, (state, action) => {
            state.loadState = LoadState.ERROR;
          })
          .addCase(inviteUserAsync.pending, (state) => {
            state.inviteUserLoadState = LoadState.LOADING;
          })
          .addCase(inviteUserAsync.fulfilled, (state, action) => {
            state.inviteUserLoadState = LoadState.LOADED;
          })
          .addCase(inviteUserAsync.rejected, (state, action) => {
            state.inviteUserLoadState = LoadState.ERROR;
          })
      },
});

export const {
    setInviteUserLoadState,
} = usersSlice.actions;

export default usersSlice.reducer;


