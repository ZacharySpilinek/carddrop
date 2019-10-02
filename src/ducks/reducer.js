import axios from 'axios'

const initialState = {
    cust_id: null,
    first_name: '',
    last_name: '',
    email: '',
    sub_id: null,
    sub_interval: '',
    categories: [],
    selected_cards: [],
    tree: [],
    treeLoading: false
}

const SET_USER_ID = "SET_USER_ID"
const GET_USER = "GET_USER"
const CLEAR_STATE = "CLEAR_STATE"
// const REGISTER_USER = "REGISTER_USER"
const GET_TREE = "GET_TREE"
const GET_CATEGORIES = "GET_CATEGORIES"

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

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}

export const getTree = (cust_id) => {
    let tree = axios.get(`/api/tree/${cust_id}`).then(res => res.data)
    return {
        type: GET_TREE,
        payload: tree
    }
}

export const getCategories = () => {
    let categories = axios.get('/api/card/categories').then(res => res.data)
    return {
        type: GET_CATEGORIES,
        payload: categories
    }
}

// export const registerUser = (newUser) => {
//     let returnNewUser = axios.post(`/auth/register`, newUser).then(res => res.data)
//     return {
//         type: REGISTER_USER,
//         payload: returnNewUser
//     }
// }

const reducer = (state = initialState, action) => {
    console.log(action.type)
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
        case CLEAR_STATE:
            return {...state,
                cust_id: null,
                email: '',
                first_name: '',
                last_name: '',
                sub_id: null,
                sub_interval: '',
                categories: [],
                selected_cards: [],
                tree: []}
        case GET_TREE + '_PENDING':
            return {...state, treeLoading: true}
        case GET_TREE + '_FULFILLED':
            return {...state, tree: action.payload, treeLoading: false}
        // case REGISTER_USER + '_PENDING':
        //     return {...state, loading: true}
        // case REGISTER_USER + '_REJECTED':
        //     alert('Email already in use. Please try a different one.')
        //     return {...state}
        // case REGISTER_USER + '_FULFILLED':
        //     this.props.history.push('/tree')
        //     return {...state,
        //         loading: false,
        //         cust_id: action.payload.cust_id,
        //         email: action.payload.email,
        //         first_name: action.payload.first_name,
        //         last_name: action.payload.last_name,
        //         sub_id: action.payload.sub_id,
        //         sub_interval: action.payload.sub_interval}
        default:
            return state
    }
}

export default reducer