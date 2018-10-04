import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import commentsReducer from './commentsReducer';
import userReducer from './usersReducer';
import { reducer as form } from 'redux-form';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  comments: commentsReducer,
  user: userReducer,
  categories: categoriesReducer,
  form

});

export default rootReducer;
