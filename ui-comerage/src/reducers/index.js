import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import commentsReducer from './commentsReducer';
import userReducer from './usersReducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  articles: articlesReducer,
  comments: commentsReducer,
  user: userReducer,
  form

});

export default rootReducer;
