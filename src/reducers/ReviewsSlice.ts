import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Config, LoadState, Review } from '../types';
import ConfigService from '../services/ConfigService';


interface ReviewsState {
    loadState: LoadState,
    completedReviews: Review[],
    activeReview: Review | undefined,
    activeReviewLoadState: LoadState,
};

const initialState: ReviewsState  = {
    loadState: LoadState.INIT,
    completedReviews: [],
    activeReview: undefined,
    activeReviewLoadState: LoadState.INIT,
};

const initialReview: Review = {
}


export const getCompletedReviewAsync = createAsyncThunk(
    'reviewState/getCompletedReview',
    async () => {
      const response = await ConfigService.fetchConfig();
      return response;
    }
);

export const reviewsSlice = createSlice({
    name: 'ReviewState',
    initialState,
    reducers: {
        startNewReview: (state) => {
            state.activeReview = initialReview;
            state.activeReviewLoadState = LoadState.LOADED;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCompletedReviewAsync.pending, (state) => {
            state.loadState = LoadState.LOADING;
          })
          .addCase(getCompletedReviewAsync.fulfilled, (state, action) => {
            state.loadState = LoadState.LOADED;
          })
          .addCase(getCompletedReviewAsync.rejected, (state, action) => {
            state.loadState = LoadState.ERROR;
          })
      },
});

export const {
    startNewReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;


