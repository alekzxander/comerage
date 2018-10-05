import actionType from './types';
import axios from 'axios';
export const getArticles = () => {
    return async dispatch => {
        const articles = await axios('/articles');
        const getUsers = articles.data.articles.map(async (article) => {
            return {
                body: article.body,
                user_id: article.user_id,
                date: article.publication_date,
                userName: await axios(`/user/${article.user_id}`).then(res => res.data.nickname),
                id: article.id,
                categories: await axios(`/categories/${article.id}`).then(res => res.data.arrayName)
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

export const LogUser = (email, password) => {
    return async dispatch => {
        const user = await axios.post('/login', {
            email,
            password
        });
        dispatch({
            type: actionType.LOGIN_USER,
            payload: user.data
        })
    }
};
export const RegUser = (name, email, password) => {
    return async dispatch => {
        const user = await axios.post('/create-user', {
            nickname: name,
            email,
            password
        })
        dispatch({
            type: actionType.CREATE_USER,
            payload: user.data
        })
    }
};
export const Logout = () => {
    return dispatch => {
        dispatch({
            type: actionType.LOGOUT,
        })
    }
};

export const getComments = (id) => {
    return async dispatch => {
        const comments = await axios(`/comments/${id}`);
        dispatch({
            type: actionType.DISPLAY_COMMENTS,
            payload: comments.data
        })
    }
}

export const selectArticle = (id) => {
    return async dispatch => {
        const article = await axios(`/article/${id}`);
        dispatch({
            type: actionType.SELECT_ARTICLE,
            payload: article.data
        })
    }
}

export const addComment = (token, body, articleId) => {
    return async dispatch => {
        let data = { body };
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };

        const comment = await axios.post(`/add-comment/${articleId}`, data, { headers });
        dispatch({
            type: actionType.CREATE_COMMENT,
            payload: comment.data.commentCreate
        })
    }

}

export const getCategories = () => {
    return async dispatch => {
        const categories = await axios('/categories');
        dispatch({
            type: actionType.DISPLAY_CATEGORIES,
            payload: categories.data
        })
    }
}

export const createArticle = (token, body, categories) => {
    return async dispatch => {
        let data = { body, categories }
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
        const addArticle = await axios.post('/create-article', data, { headers })
        console.log(addArticle)
        const articles = await axios('/articles');
        const getUsers = articles.data.articles.map(async (article) => {
            return {
                body: article.body,
                user_id: article.user_id,
                date: article.publication_date,
                userName: await axios(`/user/${article.user_id}`).then(res => res.data.nickname),
                id: article.id,
                categories: await axios(`/categories/${article.id}`).then(res => res.data.arrayName)
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

}

export const filterCategories = (event) => {
    return async dispatch => {
        const categories = event.target
        console.log(categories.name)
        dispatch({
            type: actionType.FILTER_ARTICLES,
            payload: categories.name
        })
    }
}
export const deleteArticle = (id, token) => {
    return async dispatch => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
        const article = await axios.delete(`/delete-article/${id}`, { headers });
        console.log(article)
    }
}
export const updateArticle = (id, token, body) => {
    console.log(id, token, data)
    const data = { body }
    return async dispatch => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
        const article = await axios.put(`/update-article/${id}`, data, { headers });
    }
}