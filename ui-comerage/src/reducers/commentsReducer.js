import actionType from '../action/types';

const initialState = [];

export default function commentsReducer(state = initialState, action) {
    console.log('coucou  ?', action.type, action.payload)
    switch (action.type) {
        case actionType.DISPLAY_COMMENTS:
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};