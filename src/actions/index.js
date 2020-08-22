import { BaseURL } from '../config/config'
import axios from 'axios'


export function signIn(data) {

    return {
        type: 'SIGN_IN',
        payload: data
    }
}
export function signOut() {
    return {
        type: 'SIGN_OUT',
    }
}