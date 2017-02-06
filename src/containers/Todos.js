import { connect } from "react-redux";
import TodosComponent from "../components/TodosComponent";

// const currentList = (lists, match) => {
//   return lists.find(x => x.path === match.url).title;
// };
//
// const listTodos = (list, todos) => {
//   return todos.filter(x => x.list === list || list === "All");
// };
const listTodos = (todos, title) => {
  return todos.filter(x => x.list === title || title === 'All');
}
const fTodos = (todos, filter) => {
  if(filter) {
    return [...todos.filter(x => !x.completed), ...todos.filter(x => x.completed)]
  } else return todos.filter(x => !x.completed)
}
// const log = (state, props) => {
//   console.log(props.navigation.state.params.title)
// };
const mapStateToProps = (state, props) => ({
  // filter: state.filter,
  // list: currentTag(state.lists, props.match),
  // todos: listTodos(currentTag(state.lists, props.match), state.todos)
  todos: fTodos(listTodos(state.todos, props.navigation.state.params.title), state.filter),
  filter: state.filter,
});

let nextTodoId = 0;

const mapDispatchToProps = {
  toggleFilter: () => ({
    type: "TOGGLE_FILTER"
  }),
  addTodo: (text, list) => ({
    type: "ADD_TODO",
    text,
    list,
    id: nextTodoId++
  }),
  complete: id => ({
    type: "COMPLETE_TODO",
    id
  })
};

const Todos = connect(mapStateToProps, mapDispatchToProps)(TodosComponent);

export default Todos;
