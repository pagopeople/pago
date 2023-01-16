import { combineReducers } from 'redux';
import configReducer from './ConfigSlice';
import sessionReducer from './SessionSlice';
import reviewsReducer from './ReviewsSlice';

const rootReducer = combineReducers({
    configState: configReducer,
    sessionState: sessionReducer,
    reviewsState: reviewsReducer,
});

export default rootReducer;