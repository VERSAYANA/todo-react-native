import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import ListsComponent from '../components/ListsComponent';

// const getNumber = (todos, list) => {
//   return todos.reduce(
//     (num, x) => {
//       return (list.title === x.list || list.title === "All") && !x.completed
//         ? num + 1
//         : num;
//     },
//     0
//   );
// };
//
// const number = (todos, lists) => {
//   return lists.map(x => ({
//     ...x,
//     count: getNumber(todos, x) || ''
//   }))
// }
//
// const mapStateToProps = state => ({
//   lists: number(state.todos, state.lists)
//   // lists: state.lists
// });
// const mapDispatchToProps = {
//   createList: title => ({
//     type: "CREATE_LIST",
//     title
//   }),
//   deleteList: title => ({
//     type: "DELETE_LIST",
//     title
//   })
// };
const MyMutation = gql`mutation createNewList($title: String!) {
  createList(title: $title) {
    title
		id
  }
}`

const MyQuery = gql`query {
  allLists {
    title
		id
  }
}`;
export default compose(
  graphql(MyQuery),
  graphql(MyMutation)
)(ListsComponent);
// const Lists = graphql(MyQuery)(ListsComponent);
//
// export default Lists;
