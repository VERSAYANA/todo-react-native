import React from 'react';
import { connect } from 'react-redux';
import ListsComponent from '../components/ListsComponent';

// const getNumber = (todo, list) => {
//   return todo.reduce(
//     (num, x) => {
//       return (list.title === x.list || list.title === "All") && !x.completed
//         ? num + 1
//         : num;
//     },
//     0
//   );
// };

const mapStateToProps = state => ({
  // lists: number(state.todos, state.lists)
  lists: state.lists
});
const mapDispatchToProps = {
  createList: title => ({
    type: "CREATE_LIST",
    title
  }),
  deleteList: title => ({
    type: "DELETE_LIST",
    title
  })
};

const Lists = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);

export default Lists;
