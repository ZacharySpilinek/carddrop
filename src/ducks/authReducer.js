const initialState = {
    cust_id: null,
    email: '',
    first_name: '',
    last_name: '',
    sub_id: null,
    sub_interval: ''
}

const SET_USER_ID = "SET_USER_ID"
const GET_USER = "GET_USER"
const CLEAR_USER_STATE = "CLEAR_USER_STATE"

export const setUserId = (userInfo) => {
    return {
        type: SET_USER_ID,
        payload: userInfo
    }
}

export const getUser = (userInfo) => {
    return {
        type: GET_USER,
        payload: userInfo
    }
}

export const clearUserState = () => {
    return {
        type: CLEAR_STATE
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER:
            return {...state,
                cust_id: action.payload.cust_id,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                sub_id: action.payload.sub_id,
                sub_interval: action.payload.sub_interval}
        case SET_USER_ID:
                return {...state,
                    cust_id: action.payload.cust_id,
                    email: action.payload.email,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    sub_id: action.payload.sub_id,
                    sub_interval: action.payload.sub_interval}
        case CLEAR_USER_STATE:
                return {...state,
                    cust_id: null,
                    email: '',
                    first_name: '',
                    last_name: '',
                    sub_id: null,
                    sub_interval: '',
                }
        default:
            return state
    }
}

export default reducer