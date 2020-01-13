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
    stamps: 0,
    treeLoading: false,
    treeItemLoading: false,
    selectedCardLoading: true
}

const SET_USER_ID = "SET_USER_ID"
const GET_USER = "GET_USER"
const CLEAR_STATE = "CLEAR_STATE"
const GET_TREE = "GET_TREE"
const GET_CATEGORIES = "GET_CATEGORIES"
const ADD_TREE_ITEM = "ADD_TREE_ITEM"
const SAVE_TREE = "SAVE_TREE"
const DELETE_TREE = "DELETE_TREE"
const HANDLE_TREE_CHANGE = "HANDLE_TREE_CHANGE"
const CARD_SELECTED = "CARD_SELECTED"
const SAVE_SELECTED_CARD = "SAVE_SELECTED_CARD"
const GET_SELECTED_CARDS = "GET_SELECTED_CARDS"
const DELETE_SELECTED_CARD = "DELETE_SELECTED_CARD"
const HANDLE_USER_CHANGE = "HANDLE_USER_CHANGE"
const SAVE_USER_CHANGE = "SAVE_USER_CHANGE"
const ADD_STAMPS = "ADD_STAMPS"
const DELETE_STAMP = "DELETE_STAMP"
const DELETE_ALL_STAMPS = "DELETE_ALL_STAMPS"
const GET_STAMPS = "GET_STAMPS"
const ADD_STAMP = "ADD_STAMP"

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

export const deleteTree = (cust_id, tree_rel_id, tree) => {
    let treeCopy = tree
    treeCopy.splice(tree_rel_id, 1)
    treeCopy.forEach((el, i) => el.tree_rel_id = treeCopy.indexOf(treeCopy[i]))
    /* let result = axios.post('/api/tree/delete', {cust_id, tree_rel_id}).then(res => res.data)
    return {
        type: DELETE_TREE,
        payload: result
    } */
    let result = axios.post('/api/tree/delete', {cust_id, tree_rel_id, treeCopy}).then(res => res.data)
    // console.log(result)
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

export const cardSelected = (card_id, tree_rel_id, price, img_out, card_relationship) => {
    let matchObj = {card_id, tree_rel_id, price, img_out, card_relationship}
    return {
        type: CARD_SELECTED,
        payload: matchObj
    }
}

export const saveSelectedCard = (cust_id, selected_cards, tree_rel_id) => {
    let test = {cust_id, selected_cards, tree_rel_id}
    axios.put('/api/card/save', test).then(res => res.data)
    return {
        type: SAVE_SELECTED_CARD
    }
}

export const getSelectedCards = (cust_id) => {
    let result = axios.get(`/api/cards/saved/${cust_id}`)
    return {
        type: GET_SELECTED_CARDS,
        payload: result
    }
}

export const deleteSelectedCard = (selectedCardIndex, selected_cards, tree_rel_id) => {
    // make axios request to delete card
    // in the return, replace selected_cards on reduxstate with the return
    // check order to make sure it came back right.
    if (selectedCardIndex === null){
        let selectedCardIndex2 = selected_cards.findIndex(el => el.tree_rel_id === tree_rel_id)
        return {
            type: DELETE_SELECTED_CARD,
            payload: selectedCardIndex2
        }
    }
    return {
        type: DELETE_SELECTED_CARD,
        payload: selectedCardIndex
    }
}

export const handleUserChange = (firstName, lastName, email) => {
    let newInfo = {firstName, lastName, email}
    return {
        type: HANDLE_USER_CHANGE,
        payload: newInfo
    }
}

export const saveUserChange = (firstName, lastName, email, cust_id) => {
    let newInfo = {firstName, lastName, email, cust_id}
    axios.put('/user/save', newInfo).then(res => res.data)
    return {
        type: SAVE_USER_CHANGE
    }
}

export const addStamps = (mailCount) => {
    axios.post('/api/stamps/add', {mailCount}).then(res => res.data)
    return {
        type: ADD_STAMPS,
        payload: mailCount
    }
}

export const getStamps = () => {
    let result = axios.get('/api/stamps').then(res => res.data)
    return {
        type: GET_STAMPS,
        payload: result
    }
}

export const deleteStamp = () => {
    return {
        type: DELETE_STAMP
    }
}

export const addStamp = () => {
    return {
        type: ADD_STAMP
    }
}

export const deleteAllStamps = () => {
    return {
        type: DELETE_ALL_STAMPS
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
        case GET_CATEGORIES + '_FULFILLED':
            return {...state, categories: action.payload}
        case ADD_TREE_ITEM:
            let nextId = 0
            if (state.tree.length !== 0){
                nextId = state.tree[state.tree.length - 1].tree_rel_id + 1
            }
            return {...state, tree: [...state.tree, {
                tree_rel_id: nextId,
                rel_name: '',
                rel_relationship: 'neutral',
                rel_delivery: 'in-person',
                card_id: null,
                rel_bday_mo: null,
                rel_bday_day: null
            }]}
        case SAVE_TREE + '_PENDING':
            return {...state, treeItemLoading: true}
        case SAVE_TREE + '_FULFILLED':
            return {...state, tree: action.payload, treeItemLoading: false}
        case DELETE_TREE + '_PENDING':
            return {...state, treeItemLoading: true}
        case DELETE_TREE + '_FULFILLED':
            return {...state, tree: action.payload, treeItemLoading: false}
        case HANDLE_TREE_CHANGE:
            let index = state.tree.findIndex(el => el.tree_rel_id === action.payload.tree_rel_id)
            let oldTree = [...state.tree]
            oldTree[index][action.payload.key] = action.payload.e
            return {...state, tree: oldTree}
        case CARD_SELECTED:
            let selectedCardsArr = [...state.selected_cards]
            let indexSelectedCard = selectedCardsArr.findIndex(el => el.tree_rel_id === action.payload.tree_rel_id)
            if (indexSelectedCard === -1) {
                // this if statement below adds to the end of selected_cards. Hopefully not a problem.
                selectedCardsArr.push({
                    tree_rel_id: action.payload.tree_rel_id,
                    card_id: action.payload.card_id,
                    price: action.payload.price,
                    img_out: action.payload.img_out,
                    card_relationship: action.payload.card_relationship
                })
            } else if (indexSelectedCard !== -1){
                selectedCardsArr.splice(indexSelectedCard, 1, {
                    tree_rel_id: action.payload.tree_rel_id,
                    card_id: action.payload.card_id,
                    price: action.payload.price,
                    img_out: action.payload.img_out,
                    card_relationship: action.payload.card_relationship
                })
            }
            return {...state, selected_cards: selectedCardsArr}
        case SAVE_SELECTED_CARD + '_FULFILLED':
            return {...state}
        case GET_SELECTED_CARDS + '_PENDING':
            return {...state, selectedCardLoading: true}
        case GET_SELECTED_CARDS + '_FULFILLED':
            return {...state, selectedCardLoading: false, selected_cards: action.payload.data}
        case DELETE_SELECTED_CARD:
            let treeCopy = [...state.selected_cards]
            treeCopy.splice(action.payload, 1)
            return {...state, selected_cards: treeCopy}
        case HANDLE_USER_CHANGE:
            return {...state,
                first_name: action.payload.firstName || state.first_name,
                last_name: action.payload.lastName || state.last_name,
                email: action.payload.email || state.email
            }
        case SAVE_USER_CHANGE:
            return {...state}
        case ADD_STAMPS:
            return {...state, stamps: action.payload}
        case DELETE_STAMP:
            if (state.stamps <= 0){
                return {...state, stamps: 0}
            } else {
                return {...state, stamps: state.stamps - 1}
            }
        case DELETE_ALL_STAMPS:
            return {...state, stamps: 0}
        case ADD_STAMP:
            return {...state, stamps: 1 + state.stamps}
        case GET_STAMPS + '_FULFILLED':
            return {...state, stamps: action.payload.stamps}
        default:
            return state
    }
}

export default reducer