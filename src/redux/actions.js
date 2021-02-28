import * as types from './actionTypes'

const addContact = (name, number) => {
    return {
        type: types.ADD_CONTACT,
        name: name,
        number: number,
    };
};

export default addContact;
