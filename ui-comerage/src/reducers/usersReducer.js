import actionType from '../action/types';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case actionType.LOGIN_USER:
            return action.payload;
        case actionType.CREATE_USER:
            return action.payload;
        case actionType.LOGOUT:
            return {};
        default:
            return state;
    }
}