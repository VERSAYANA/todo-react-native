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
const MyQuery = gql`query MyLists {
  allLists {
    title
		id
  }
}`;

const CreateNewList = gql`mutation createNewList($title: String!) {
  createList(title: $title) {
    title
		id
  }
}`;

const DeleteList = gql`mutation DeleteList($id: ID!) {
  deleteList(id: $id) {
    title
  }
}`;


export default compose(
  graphql(MyQuery),
  graphql(CreateNewList, {
	name: 'createList',
  options: {
    updateQueries: {
      MyLists: (previousData, { mutationResult }) => {
        const newList = mutationResult.data.createList;
        // Note how we return a new copy of `previousData` instead of mutating
        // it. This is just like a Redux reducer!
        return {
          ...previousData,
          allLists: [...previousData.allLists,newList],
        };
      },
    },
  },
	}),
	graphql(DeleteList, {
		name: 'deleteList',
		options: {
			updateQueries: {
				MyLists: (previousData, { mutationResult }) => {
					const deletedList = mutationResult.data.deleteList;
					return {
						...previousData,
						allLists: previousData.allLists.filter(l => l.title !== deletedList.title),
					};
				},
			},
		},
	})
)(ListsComponent);
// const Lists = graphql(MyQuery)(ListsComponent);
//
// export default Lists;
