import { combineReducers } from 'redux';
import configReducer from './ConfigSlice';
import sessionReducer from './SessionSlice';
import reviewsReducer from './ReviewsSlice';
import scoresReducer from './ScoresSlice';

const rootReducer = combineReducers({
    configState: configReducer,
    sessionState: sessionReducer,
    reviewsState: reviewsReducer,
    scoresState: scoresReducer,
});

export default rootReducer;