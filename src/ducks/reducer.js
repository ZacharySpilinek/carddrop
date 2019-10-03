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
    treeLoading: false,
    tree_rel_id_index: null
}

const SET_USER_ID = "SET_USER_ID"
const GET_USER = "GET_USER"
const CLEAR_STATE = "CLEAR_STATE"
// const REGISTER_USER = "REGISTER_USER"
const GET_TREE = "GET_TREE"
const GET_CATEGORIES = "GET_CATEGORIES"
const ADD_TREE_ITEM = "ADD_TREE_ITEM"
const SAVE_TREE = "SAVE_TREE"
const DELETE_TREE = "DELETE_TREE"
const HANDLE_TREE_CHANGE = "HANDLE_TREE_CHANGE"

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
    let categories = axios.get('/api/cards/categories').then(res => res.data)
    return {
        type: GET_CATEGORIES,
        payload: categories
    }
}

export const addTreeItem = () => {
    return {
        type: ADD_TREE_ITEM
    }
}

export const saveTree = (cust_id, tree) => {
    let result = axios.post(`/api/tree/save/${cust_id}`, tree).then(res => res.data)
    return {
        type: SAVE_TREE,
        payload: result
    }
}

export const deleteTree = (cust_id, tree_rel_id) => {
    let result = axios.post('/api/tree/delete', {cust_id, tree_rel_id}).then(res => res.data)
    return {
        type: DELETE_TREE,
        payload: result
    }
}

export const handleTreeChange = (e, key, tree_rel_id) => {
    let change = {e, key, tree_rel_id}
    return {
        type: HANDLE_TREE_CHANGE,
        payload: change
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
            // let num = action.payload[action.payload.length - 1].tree_rel_id
            // let newNum = 1 + num
            // console.log(newNum)
            return {...state, tree: action.payload, treeLoading: false}
        case GET_CATEGORIES + '_FULFILLED':
            return {...state, categories: action.payload}
        case ADD_TREE_ITEM:
            // console.log(state.tree[state.tree.length - 1].tree_rel_id)
            let nextId = state.tree[state.tree.length - 1].tree_rel_id + 1
            return {...state, tree: [...state.tree, {
                tree_rel_id: nextId,
                rel_name: '',
                rel_relationship: '',
                rel_delivery: '',
                card_id: null,
                rel_bday_mo: null,
                rel_bday_day: null
            }]}
        case SAVE_TREE + '_FULFILLED':
            return {...state, tree: action.payload}
        case DELETE_TREE + '_FULFILLED':
            return {...state, tree: action.payload}
        case HANDLE_TREE_CHANGE:
            let index = state.tree.findIndex(el => el.tree_rel_id === action.payload.tree_rel_id)
            // state.tree[index].rel_name = 'asdfadsf'
            // console.log(state.tree[index])
            /* let updatedTree = {
                tree_rel_id: state.tree[index].tree_rel_id,
                rel_name: action.payload.e || state.tree[index].rel_name,
                rel_relationship: action.payload.e || state.tree[index].rel_relationship,
                rel_delivery: action.payload.e || state.tree[index].rel_delivery,
                card_id: state.tree[index].card_id,
                rel_bday_mo: action.payload.e || state.tree[index].rel_bday_mo,
                rel_bday_day: action.payload.e || state.tree[index].rel_bday_day
            } */
            // let updatedTree = {
            //     tree_rel_id: state.tree[index].tree_rel_id,
            //     card_id: state.tree[index].card_id,
            //     [action.payload.key]: action.payload.e
            // }
            let oldTree = [...state.tree]
            oldTree[index][action.payload.key] = action.payload.e
            return {...state, tree: oldTree}
            // return {...state}
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