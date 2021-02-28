import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as types from './actionTypes';
import validatePhoneNumber from '../utils/validator'
import * as actions from './actions'

// const initialState = {
//     name: '',
//     number: '+380',
// };

const initialState = [];

const reducer = (state = initialState, actions) => {
    switch (types) {
        case types.ADD_CONTACT:
            return
            [
                ...state,
                //     {
                //     id: action.id,
                //         text: action.text,
                //             completed: false
                // }

                // name: EventTarget.name.value,
                // number: EventTarget.name.value,

                {
                    name: action.name,
                    number: action.number,
                }
            ]

        case types.ON_SUBMIT:
            // e.preventDefault();
            return {

                // {
                // name: onSubmit.name,
                //     number: onSubmit.number,
                // }

            };
        default:
            return state;
    }
};

const store = createStore(reducer, composeWithDevTools(
    // ...applyMiddleware(...middleware)
));

export default store;
