import actionType from './types';
import axios from 'axios';

export const getArticles = () => {
    return async dispatch => {
        const articles = await axios('http://localhost:3001/articles');
        const getUsers = articles.data.articles.map(async (article) => {
            return {
                body: article.body,
                user_id: article.users_id,
                date: article.publication_date,
                userName: await axios(`http://localhost:3001/user/${article.users_id}`).then(res => res.data.nickname),
                id: article.id
            }
        });
        Promise.all(getUsers).then((completed) => {
            try {
                dispatch({
                    type: actionType.DISPLAY_ARTICLES,
                    payload: completed
                })
            } catch (err) {
                dispatch(err)
            }
        });
    }
};

export const getComments = (articleId) => {
    console.log('coucou')
    return async dispatch => {
        const comments = await axios(`http://localhost:3001/comments/${articleId}`);
        console.log(comments.data)
        dispatch({
            type: actionType.DISPLAY_COMMENTS,
            payload: comments.data
        })
    }
}