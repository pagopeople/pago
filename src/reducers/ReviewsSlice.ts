import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PagoApi } from '../api/PagoApi';
import { RootState } from '../store';
import { Config, LoadState, Review, ThunkApiType } from '../types';


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


export const getCompletedReviewAsync = createAsyncThunk<Review, void, ThunkApiType>(
    'reviewState/getCompletedReview',
    async (_, thunkApi) => {
      const state: RootState = thunkApi.getState();
      const response = thunkApi.extra.api(state).configService.get();
      // const response = await ConfigService.fetchConfig();
      return response;
    }
);

export const getReviewsAsync = createAsyncThunk<{completedReviews: Review[], requestedReviews: Review[]}, void, ThunkApiType>(
  'reviewsState/getReviews',
  async (_, thunkApi) => {
    const state: RootState = thunkApi.getState();
    const resp = await thunkApi.extra.api(state).reviewService.getReviews();
    return resp;
  }
);

export const getReviewWithIdAsync = createAsyncThunk<Review, string, ThunkApiType>(
  'reviewsState/getReview',
  async (reviewId, thunkApi) => {
    const state: any = thunkApi.getState();

    if (!reviewId) {
      return {
        ...initialReview,
      }
    }

    const loadedReview = state.reviewsState.completedReviews.find((review: Review) => review.id === reviewId);

    if (loadedReview) {
      return {
        ...loadedReview,
      }
    }
    const resp = await thunkApi.extra.api(state).reviewService.getReview(reviewId);
    return resp
  }
)

export const getPeerReviewWithIdAsync = createAsyncThunk<Review, string, ThunkApiType>(
  'reviewsState/getPeerReview',
  async (reviewId, thunkApi) => {
    const state: any = thunkApi.getState();
    if (!reviewId) {
      return {
        review: initialReview,
      }
    }

    const loadedReview = state.reviewsState.requestedReviews.find((review: Review) => review.originalReview === reviewId);

    if (loadedReview) {
      return {
        review: loadedReview,
      }
    }
    const resp = await thunkApi.extra.api(state).reviewService.getPeerReview(reviewId);
    return resp
  }
)


export const submitReviewAsync = createAsyncThunk<void, Review, ThunkApiType>(
  'reviewsState/submitReview',
  async (review, thunkApi) => {
    const state = thunkApi.getState();
    const resp = await thunkApi.extra.api(state).reviewService.submitReview(review);
    return resp;
  }
)

export const submitPeerReviewAsync = createAsyncThunk<void, Review, ThunkApiType>(
  'reviewsState/submitPeerReview',
  async (review, thunkApi) => {
    const state = thunkApi.getState();
    const resp = await thunkApi.extra.api(state).reviewService.submitPeerReview(review);
    return resp;
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
          state.activeReview = {...action.payload, deadlineDate: parseInt(action.payload.deadlineDate as any) }
        })
        .addCase(getReviewWithIdAsync.rejected, (state, action) => {
          state.activeReviewLoadState = LoadState.ERROR;
        })
        .addCase(getPeerReviewWithIdAsync.pending, (state) => {
          state.activeReviewLoadState = LoadState.LOADING;
        })
        .addCase(getPeerReviewWithIdAsync.fulfilled, (state, action) => {
          state.activeReviewLoadState = LoadState.LOADED;
          state.activeReview = {...action.payload, deadlineDate: parseInt(action.payload.deadlineDate as any || "0") }
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


