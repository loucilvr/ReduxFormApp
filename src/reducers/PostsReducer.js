import _ from 'lodash';
import {CREATE_POST, FETCH_POSTS} from "../actions/index";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS:
            //pass array of posts as 1st arg,
            // then pass the array property to be used for key
            return _.mapKeys(action.payload.data, 'id');
        case CREATE_POST:


        default:
            return state;
    }
}