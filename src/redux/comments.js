import * as ActionTypes from './ActionTypes'

export const Comments = (state = {errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.paylod};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.paylod};
        case ActionTypes.ADD_COMMENT:
            const comment = action.paylod;
            return {...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
};