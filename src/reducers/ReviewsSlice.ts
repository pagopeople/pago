import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Config, LoadState, Review } from '../types';
import ConfigService from '../services/ConfigService';
import ReviewService from '../services/ReviewService';


interface ReviewsState {
    loadState: LoadState,
    completedReviews: Review[],
    requestedReviews: Review[],
    activeReview: Review | undefined,
    activeReviewLoadState: LoadState,
    submitReviewLoadState: LoadState,
};

const initialState: ReviewsState  = {
    loadState: LoadState.INIT,
    completedReviews: [],
    requestedReviews: [],
    activeReview: undefined,
    activeReviewLoadState: LoadState.INIT,
    submitReviewLoadState: LoadState.INIT,
};

const initialReview: Review = {
  schemaId: 'endproj',
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
    if (!params.reviewId) {
      return {
        review: initialReview,
      }
    }

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

export const getPeerReviewWithIdAsync = createAsyncThunk(
  'reviewsState/getPeerReview',
  async (params: {reviewId: string, token: string}) => {
    const resp = await ReviewService.getPeerReview(params.reviewId, params.token);
    return resp
  }
)


export const submitReviewAsync = createAsyncThunk(
  'reviewsState/submitReview',
  async (params: {review: Review, token: string}) => {
    const resp = await ReviewService.submitReview(params.review, params.token);
    return resp;
  }
)

export const submitPeerReviewAsync = createAsyncThunk(
  'reviewsState/submitPeerReview',
  async (params: {review: Review, token: string}) => {
    const resp = await ReviewService.submitPeerReview(params.review, params.token);
  }
)

export const reviewsSlice = createSlice({
    name: 'ReviewState',
    initialState,
    reducers: {
        startNewReview: (state, action) => {
            state.activeReview = {
              ...initialReview,
              schemaId: action.payload,
            };
            state.activeReviewLoadState = LoadState.LOADED;
        },
        resetActiveReviewState: (state) => {
          state.activeReview = undefined;
          state.activeReviewLoadState = LoadState.INIT;
          state.submitReviewLoadState = LoadState.INIT;
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
          state.completedReviews = action.payload.completedReviews;
          state.completedReviews.sort((r1, r2) => {
            const submittedAt1 = r1.submittedAt || 0;
            const submittedAt2 = r2.submittedAt || 0;
            return submittedAt2 - submittedAt1;
          })
          state.requestedReviews = action.payload.requestedReviews;
          state.requestedReviews.sort((r1, r2) => {
            const submittedAt1 = r1.submittedAt || 0;
            const submittedAt2 = r2.submittedAt || 0;
            return submittedAt2 - submittedAt1;
          })
        })
        .addCase(getReviewsAsync.rejected, (state, action) => {
          state.loadState = LoadState.ERROR;
        })
        .addCase(getReviewWithIdAsync.pending, (state) => {
          state.activeReviewLoadState = LoadState.LOADING;
        })
        .addCase(getReviewWithIdAsync.fulfilled, (state, action) => {
          state.activeReviewLoadState = LoadState.LOADED;
          console.log('gr');
          state.activeReview = {...action.payload.review, deadlineDate: parseInt(action.payload.review.deadlineDate) }
        })
        .addCase(getReviewWithIdAsync.rejected, (state, action) => {
          state.activeReviewLoadState = LoadState.ERROR;
        })
        .addCase(getPeerReviewWithIdAsync.pending, (state) => {
          state.activeReviewLoadState = LoadState.LOADING;
        })
        .addCase(getPeerReviewWithIdAsync.fulfilled, (state, action) => {
          state.activeReviewLoadState = LoadState.LOADED;
          state.activeReview = {...action.payload.review, deadlineDate: parseInt(action.payload.review.deadlineDate), schemaId: 'manager' }
        })
        .addCase(getPeerReviewWithIdAsync.rejected, (state, action) => {
          state.activeReviewLoadState = LoadState.ERROR;
        })
        .addCase(submitReviewAsync.pending, (state) => {
          state.submitReviewLoadState = LoadState.LOADING;
        })
        .addCase(submitReviewAsync.fulfilled, (state, action) => {
          state.submitReviewLoadState = LoadState.LOADED;
          console.log(action);
        })
        .addCase(submitReviewAsync.rejected, (state, action) => {
          state.submitReviewLoadState = LoadState.ERROR;
        })
        .addCase(submitPeerReviewAsync.pending, (state) => {
          state.submitReviewLoadState = LoadState.LOADING;
        })
        .addCase(submitPeerReviewAsync.fulfilled, (state, action) => {
          state.submitReviewLoadState = LoadState.LOADED;
        })
        .addCase(submitPeerReviewAsync.rejected, (state, action) => {
          state.submitReviewLoadState = LoadState.ERROR;
        })
      },
});

export const {
    startNewReview,
    resetActiveReviewState
} = reviewsSlice.actions;

export default reviewsSlice.reducer;


