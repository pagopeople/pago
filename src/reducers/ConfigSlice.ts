import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Config, LoadState } from '../types';
import ConfigService from '../services/ConfigService';


interface ConfigState {
    loadState: LoadState,
    config?: Config,
};

const initialState: ConfigState  = {
    loadState: LoadState.INIT,
    config: {},
};


export const getConfigAsync = createAsyncThunk(
    'configState/getConfig',
    async () => {
      const response = await ConfigService.fetchConfig();
      return response;
    }
);

export const configSlice = createSlice({
    name: 'ConfigState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getConfigAsync.pending, (state) => {
            state.loadState = LoadState.LOADING;
          })
          .addCase(getConfigAsync.fulfilled, (state, action) => {
            state.loadState = LoadState.LOADED;
            state.config = action.payload.config
          })
          .addCase(getConfigAsync.rejected, (state, action) => {
            state.loadState = LoadState.ERROR;
          })
      },
});

export default configSlice.reducer;


