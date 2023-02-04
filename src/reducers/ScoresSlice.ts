import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Config, LoadState, Review } from '../types';
import ScoresService from '../services/ScoresService';

interface ScoresState {
    loadState: LoadState,
    employeeScore: any,
    reviewScores: Array<any>,
};

const initialState: ScoresState  = {
    loadState: LoadState.INIT,
    employeeScore: undefined,
    reviewScores: [],
};

export const getEmployeeScoreAsync = createAsyncThunk(
    'scoresState/getEmployeeScore',
    async (token: string) => {
      const response = await ScoresService.getEmployeeScore(token);
      return response;
    }
);

export const getSummaryAsync = createAsyncThunk(
    'scoresState/getSummary',
    async (token: string) => {
      const response = await ScoresService.getSummary(token);
      return response;
    }
);


export const scoresSlice = createSlice({
    name: 'ScoresState',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEmployeeScoreAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(getEmployeeScoreAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.employeeScore = action.payload.employeeScore;
        })
        .addCase(getEmployeeScoreAsync.rejected, (state, action) => {
          state.loadState = LoadState.ERROR;
        })
        .addCase(getSummaryAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(getSummaryAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.reviewScores = action.payload.reviewScores;
        })
        .addCase(getSummaryAsync.rejected, (state, action) => {
          state.loadState = LoadState.ERROR;
        })
      },
});

// export const {
//     resetActiveReviewState
// } = scoresSlice.actions;

export default scoresSlice.reducer;


