import actionType from '../action/types';

const initialState = [];

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.DISPLAY_CATEGORIES:
            return action.payload.categories;
        default:
            return state;
    }
};