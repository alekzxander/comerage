import actionType from '../action/types';

const initialState = [];

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.DISPLAY_COMMENTS:
            return action.payload;
        default:
            return state;
    }
};