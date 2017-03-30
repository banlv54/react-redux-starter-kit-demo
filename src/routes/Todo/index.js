import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path: 'todo',
  getComponent (nextState, next) {
    require.ensure([
      './containers/TodoContainer',
      './modules/todo'
    ], (require) => {
      const Todo = require('./containers/TodoContainer').default
      const todoReducer = require('./modules/todo').default
      injectReducer(store, {
        key: 'todo',
        reducer: todoReducer
      })
      next(null, Todo)
    })
  }
})
