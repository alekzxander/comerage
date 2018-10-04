import actionType from '../action/types';

const initialState = [];

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.DISPLAY_ARTICLES:
            return action.payload;
        case actionType.SELECT_ARTICLE:
            const article = {
                view: action.payload.article.body,
                user: action.payload.article.user.nickname,
                comments: action.payload.article.comments,
                date: action.payload.article.publication_date,
                id: action.payload.article.id
            }
            return article;
        case actionType.CREATE_COMMENT:
            state.comments.push(action.payload)
            return state;
        default:
            return state;
    }
};