import type { TodoObject, TodoStateObject } from '../interfaces/todo.js'
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_TODO = 'REQUEST_TODO'
export const RECIEVE_TODO = 'RECIEVE_TODO'
export const POST_TODO = 'POST_TODO'
export const SAVE_CURRENT_TODO = 'SAVE_CURRENT_TODO'
// ------------------------------------
// Actions
// ------------------------------------
export function requestTodo(){
  return {
    type: REQUEST_TODO
  }
}
let availableId = 0
export function recieveTodo(value: string) {
  return {
    type: RECIEVE_TODO,
    payload: {
      value,
      id: availableId++
    }
  }
}
export function saveCurrentTodo() {
  return {
    type: SAVE_CURRENT_TODO
  }
}

export const fetchTodo = () => {
  return (dispatch): Promise => {
    dispatch(requestTodo())
    return fetch('https://api.github.com/zen')
      .then(data => data.text())
      .then(text => dispatch(recieveTodo(text)))
  }
}

export const postTodo = () => {
  return (dispatch): Promise => {
    dispatch(requestTodo())
    return fetch('/api/react', {
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({"user":{
          "email": 'email',
          "password": 'password'
      }})}
      ).then((data) => {
        return data.text();
      })
      .then(text => dispatch(recieveTodo(text)))
  }
}

export const actions = {
  requestTodo,
  recieveTodo,
  fetchTodo,
  postTodo,
  saveCurrentTodo
}

const TODO_ACTION_HANDLERS = {
  [REQUEST_TODO]: (state: TodoStateObject): TodoStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_TODO]: (state: TodoStateObject, action: {payload: TodoObject}): TodoStateObject => {
    return ({ ...state, todos: state.todos.concat(action.payload), current: action.payload.id, fetching: false })
  },
  [POST_TODO]: (state: TodoStateObject, action: {payload: TodoObject}): TodoStateObject => {
    return state.current != null ? ({ ...state, saved: state.saved.concat(state.current) }) : state
  },
  [SAVE_CURRENT_TODO]: (state: TodoStateObject): TodoStateObject => {
    return state.current != null ? ({ ...state, saved: state.saved.concat(state.current) }) : state
  }
}


const initialState: TodoStateObject = { fetching: false, current: null, todos: [], saved: [] }

export default function todoReducer (state: TodoStateObject = initialState, action: Action): TodoStateObject {
  const handler = TODO_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
