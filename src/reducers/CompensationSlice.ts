import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiUser, InviteUserRequest, PresignedUrl } from '../apiTypes';
import { Config, LoadState, ThunkApiType, User } from '../types';


interface CompensationState {
    loadState: LoadState,
    uploadDataLoadState: LoadState,
    uploadUrl: string,
    salary?: number
};

const initialState: CompensationState  = {
    loadState: LoadState.INIT,
    uploadDataLoadState: LoadState.INIT,
    uploadUrl: '',
};


export const getUploadUrlAsync = createAsyncThunk<string, void, ThunkApiType>(
    'compensationState/getUploadUrl',
    async (_, thunkApi) => {
      const state = thunkApi.getState();
      const response = await thunkApi.extra.api(state).compensationService.getUploadUrl();
      return response;
    }
);

export const uploadCompDataAsync = createAsyncThunk<void, File, ThunkApiType>(
    'compensationState/uploadCompData',
    async (fileToUpload, thunkApi) => {
      const state = thunkApi.getState();
      const response = await thunkApi.extra.api(state).compensationService.getUploadUrl();
      const s3Response = await thunkApi.extra.api(state).compensationService.uploadToS3(fileToUpload, response);
      return s3Response;
    }
);

export const getCompDataAsync = createAsyncThunk<any, void, ThunkApiType>(
  'compensationState/getCompData',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const response = await thunkApi.extra.api(state).compensationService.getCompData();
    return response;
  }
);

export const compensationSlice = createSlice({
    name: 'CompensationState',
    initialState,
    reducers: {
        setInviteUserLoadState: (state, action) => {
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUploadUrlAsync.pending, (state) => {
            state.uploadDataLoadState = LoadState.LOADING;
          })
          .addCase(getUploadUrlAsync.fulfilled, (state, action) => {
            state.uploadDataLoadState = LoadState.LOADED;
            console.log(action.payload);
          })
          .addCase(getUploadUrlAsync.rejected, (state, action) => {
            state.uploadDataLoadState = LoadState.ERROR;
          })
          .addCase(getCompDataAsync.pending, (state) => {
            state.loadState = LoadState.LOADING;
          })
          .addCase(getCompDataAsync.fulfilled, (state, action) => {
            state.loadState = LoadState.LOADED;
            state.salary = action.payload.salary;
          })
          .addCase(getCompDataAsync.rejected, (state, action) => {
            state.loadState = LoadState.ERROR;
          })
      },
});

// export const {
//     setInviteUserLoadState,
// } = compensat.actions;

export default compensationSlice.reducer;


