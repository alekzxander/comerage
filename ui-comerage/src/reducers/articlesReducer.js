import actionType from '../action/types';

const initialState = [];

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.DISPLAY_ARTICLES:
            const articlesWithCategories = action.payload.map((article) => {
                return {
                    id: article.id,
                    body: article.body,
                    user: article.user,
                    categories: article.categories_has_articles,
                    data: article.publication_date
                }
            });
            return articlesWithCategories;
        case actionType.SELECT_ARTICLE:
            const article = {
                view: action.payload.body,
                user: action.payload.nickname,
                comments: action.payload.comments,
                date: action.payload.publication_date,
                id: action.payload.id,
                user_id: action.payload.user_id
            }
            return article;
        case actionType.CREATE_COMMENT:
            state.comments.push(action.payload)
            return state;
        case actionType.FILTER_ARTICLES:
            const filter = state.filter((article) => {
                if (article.categories.indexOf(action.payload) !== -1) {
                    console.log(article.categories.indexOf(action.payload.name))
                    return article;
                }
                return false;
            })

            return filter;
        default:
            return state;
    }
};