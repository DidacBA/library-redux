/*
  Characteristics of a Pure function
  1) They always return the same result if the same argumetns are passed in
  2) They depend only on the arguments passed into them
  3) Never produce any side effects
*/


// Reducer function
function todos (state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id )
    case 'TOGGLE_TODO':
      return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default:
      return state
  }
}


function goals (state = [], action) {
  switch(action.type) {
    case 'ADD_GOAL':
    return state.concat([action.goal])
    case 'REMOVE_GOAL':
    return state.filter((goal) => goal.id !== action.id)
    default:
    return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

function createStore (reducer) {
  // the store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
    // loop over listeners and invoke them
  }
  
  return {
    getState,
    subscribe,
    dispatch,
  }
}

const store = createStore(app);
store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})
