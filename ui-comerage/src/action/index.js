import actionType from './types';
import axios from 'axios';
export const getArticles = () => {
    return async dispatch => {
        const articles = await axios('/articles');
        dispatch({
            type: actionType.DISPLAY_ARTICLES,
            payload: articles.data.articles
        })
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
        console.log(article.data)
        dispatch({
            type: actionType.SELECT_ARTICLE,
            payload: article.data.article
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
        const id = comment.data.commentCreate.article_id;
        const article = await axios(`/article/${id}`);
        console.log(article.data)
        dispatch({
            type: actionType.SELECT_ARTICLE,
            payload: article.data.article
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
        dispatch({
            type: actionType.DISPLAY_ARTICLES,
            payload: articles.data.articles
        });
    }

}

export const filterCategories = (filters) => {
    return async dispatch => {
        let articles;
        if (filters.length === 0) {
            articles = await axios(`/articles`)
        } else {
            articles = await axios(`/articles/?category=${filters}`)
        }
        dispatch({
            type: actionType.DISPLAY_ARTICLES,
            payload: articles.data.articles
        })
    }
}
export const deleteArticle = (id, token) => {
    console.log('delete article')
    return async dispatch => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
        const deleteArticle = await axios.delete(`/delete-article/${id}`, { headers });
        const articles = await axios('/articles');
        console.log(deleteArticle)
        dispatch({
            type: actionType.DISPLAY_ARTICLES,
            payload: articles.data.articles
        })
    }
}
export const updateArticle = (id, token, body) => {
    const data = { body }
    return async dispatch => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        };
        const article = await axios.put(`/update-article/${id}`, data, { headers });
        console.log(article.data)
        dispatch({
            type: actionType.SELECT_ARTICLE,
            payload: article.data
        })
    }
}