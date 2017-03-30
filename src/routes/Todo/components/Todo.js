import React from 'react'
import classes from './Todo.scss'

export const Todo = (props) => (
  <div>
  {console.log(props)}
    <div>
      <h2>

        {props.todo ? props.todo.value : ''}
      </h2>
      <button className='btn btn-default' onClick={props.fetchTodo}>
        Fetch Todo
      </button>
      {' '}
      <button className='btn btn-default' onClick={props.saveCurrentTodo}>
        Save Todo
      </button>
    </div>
    {props.saved.length
      ? <div className='savedWisdoms'>
        <h3>
          SAEVES LIST (saved)
        </h3>
        <ul>
          {props.saved.map(todo =>
            <li key={todo.id}>
              {todo.value}
            </li>
          )}
        </ul>
      </div>
      : null
    }
    {props.todos.length
      ? <div className='savedWisdoms'>
        <h3>
          FETCH LIST (todos)
        </h3>
        <ul>
          {props.todos.map(todo =>
            <li key={todo.id}>
              {todo.value}
            </li>
          )}
        </ul>
      </div>
      : null
    }
  </div>
)

export default Todo
