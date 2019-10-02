const initialState = {
    cust_id: null,
    first_name: '',
    last_name: '',
    email: '',
    sub_id: null,
    sub_interval: '',
    categories: [],
    selected_cards: [],
    tree: []
}

const SET_USER_ID = "SET_USER_ID"
const GET_USER = "GET_USER"

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
        default:
            return state
    }
}

export default reducer