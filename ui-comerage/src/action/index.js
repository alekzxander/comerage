import actionType from './types';
import axios from 'axios';

export const getArticles = () => {
    return async dispatch => {
        const articles = await axios('http://localhost:3001/articles');
        try {
            dispatch({
                type: actionType.DISPLAY_ARTICLES,
                payload: articles
            })
        } catch (err) {
            dispatch(err)
        }

    }
}
