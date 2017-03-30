export type TodoObject = {
  id: number,
  value: string
}
export type TodoStateObject = {
  current: ?number,
  fetching: boolean,
  saved: Array<number>,
  todos: Array<TodoObject>
}
