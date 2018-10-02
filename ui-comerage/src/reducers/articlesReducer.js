import actionType from '../action/types';

const initialState = [];

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.DISPLAY_ARTICLES:
            return action.payload;
        default:
            return state;
    }
};