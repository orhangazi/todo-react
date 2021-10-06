import {ADD_TODO, TOGGLE, CLEAR_IS_DONE, LOAD_TODOS} from "../actions"

const INITIAL_STATE = []


const reducer = (state = INITIAL_STATE, action) => {
	let newState
	if (action.type === ADD_TODO) {
		newState = action.payload
	} else if (action.type === TOGGLE) {
		newState = action.payload
	} else if (action.type === CLEAR_IS_DONE) {
		newState = action.payload
	} else if (action.type === LOAD_TODOS) {
		newState = action.payload
	} else {
		newState = state
	}

	return newState
}

export default reducer