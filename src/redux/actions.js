import * as types from './actionTypes'
import { v4 as uuidv4 } from 'uuid'

const addContact = (name, number) => {
    console.log('addContact');
    
    return {
        type: types.ADD_CONTACT,
        payload: {
            id: uuidv4(),
            name,
            number,
        }
    };
};

const delContact = (id) => {
    return {
        type: types.DEL_CONTACT,
        payload: id
    };
};

const initContacts = (contacts) => {
    return {
        type: types.INIT_CONTACTS,
        payload: contacts
    };
};

export default {addContact, delContact, initContacts};
