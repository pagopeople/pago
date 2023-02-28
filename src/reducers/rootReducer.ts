import { combineReducers } from 'redux';
import configReducer from './ConfigSlice';
import sessionReducer from './SessionSlice';
import reviewsReducer from './ReviewsSlice';
import scoresReducer from './ScoresSlice';
import usersReducer from './UsersSlice';

const rootReducer = combineReducers({
    configState: configReducer,
    sessionState: sessionReducer,
    reviewsState: reviewsReducer,
    scoresState: scoresReducer,
    usersState: usersReducer,
});

export default rootReducer;