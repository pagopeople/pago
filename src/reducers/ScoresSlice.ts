import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoadState, ProjectSizeSummary, ThunkApiType } from '../types';

interface ScoresState {
    loadState: LoadState,
    employeeScore: number | undefined,
    summary: Summary | undefined,
};

interface Summary {
    employeeScore: number,
    Existential: ProjectSizeSummary,
    Large: ProjectSizeSummary,
    Medium: ProjectSizeSummary,
    Small: ProjectSizeSummary,
}

const initialState: ScoresState  = {
    loadState: LoadState.INIT,
    employeeScore: undefined,
    summary: undefined,
};

export const getEmployeeScoreAsync = createAsyncThunk<number, void, ThunkApiType>(
    'scoresState/getEmployeeScore',
    async (_, thunkApi) => {
      const state = thunkApi.getState();
      const response = await thunkApi.extra.api(state).scoresService.getEmployeeScore();
      return response;
    }
);

export const getSummaryAsync = createAsyncThunk<Summary, void, ThunkApiType>(
    'scoresState/getSummary',
    async (_, thunkApi) => {
      const state = thunkApi.getState();
      const response = await thunkApi.extra.api(state).scoresService.getSummary();
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
          state.employeeScore = action.payload;
        })
        .addCase(getEmployeeScoreAsync.rejected, (state, action) => {
          state.loadState = LoadState.ERROR;
        })
        .addCase(getSummaryAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(getSummaryAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.summary = action.payload;
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


