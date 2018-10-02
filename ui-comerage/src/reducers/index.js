import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  comments: commentsReducer
});

export default rootReducer;
