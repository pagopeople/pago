import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Config, LoadState, Review } from '../types';
import ConfigService from '../services/ConfigService';
import ReviewService from '../services/ReviewService';


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

export const getReviewsAsync = createAsyncThunk(
  'reviewsState/getReviews',
  async (token: string) => {
    const resp = await ReviewService.getReviews(token);
    return resp;
  }
);

export const getReviewWithIdAsync = createAsyncThunk(
  'reviewsState/getReview',
  async (params: {reviewId: string, token: string}, thunkApi) => {
    const state: any = thunkApi.getState();

    const loadedReview = state.reviewsState.completedReviews.find((review: Review) => review.id === params.reviewId);

    if (loadedReview) {
      return {
        review: loadedReview,
      }
    }
    const resp = await ReviewService.getReview(params.reviewId, params.token);
    return resp
  }
)

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
        .addCase(getReviewsAsync.pending, (state) => {
          state.loadState = LoadState.LOADING;
        })
        .addCase(getReviewsAsync.fulfilled, (state, action) => {
          state.loadState = LoadState.LOADED;
          state.completedReviews = action.payload.reviews
        })
        .addCase(getReviewsAsync.rejected, (state, action) => {
          state.loadState = LoadState.ERROR;
        })
        .addCase(getReviewWithIdAsync.pending, (state) => {
          state.activeReviewLoadState = LoadState.LOADING;
        })
        .addCase(getReviewWithIdAsync.fulfilled, (state, action) => {
          state.activeReviewLoadState = LoadState.LOADED;
          console.log(action);
          state.activeReview = {...action.payload.review, deadlineDate: parseInt(action.payload.review.deadlineDate) }
        })
        .addCase(getReviewWithIdAsync.rejected, (state, action) => {
          state.activeReviewLoadState = LoadState.ERROR;
        })
      },
});

export const {
    startNewReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;


