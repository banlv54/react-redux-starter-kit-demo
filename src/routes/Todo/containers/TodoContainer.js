import { connect } from 'react-redux'
import { actions } from '../modules/todo'
import Todo from '../components/Todo'

const mapStateToProps = (state) => ({
  todo: state.todo.todos.find(todo => todo.id === state.todo.current),
  todos: state.todo.todos,
  saved: state.todo.todos.filter(todo => state.todo.saved.indexOf(todo.id) !== -1)
})
export default connect(mapStateToProps, {...actions})(Todo)
