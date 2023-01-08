import { combineReducers } from 'redux';
import configReducer from './ConfigSlice';
import sessionReducer from './SessionSlice';

const rootReducer = combineReducers({
    configState: configReducer,
    sessionState: sessionReducer,
});

export default rootReducer;