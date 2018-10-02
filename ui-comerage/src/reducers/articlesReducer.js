import actionType from '../action/types';

const initialState = [];

export default function articlesReducer(state = initialState, action) {
    console.log('coucou  ?', action.type, action.payload)
    switch (action.type) {
        case actionType.DISPLAY_ARTICLES:
            return action.payload;
        default:
            return state;
    }
};