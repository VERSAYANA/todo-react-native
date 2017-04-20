import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import ListsComponent from '../components/ListsComponent';


const MyLists = gql`query MyLists($userId: ID!){
  User(id: $userId) {
    lists {
      title
			id
    }
  }
}`;

const CreateNewList = gql`mutation createNewList($title: String!, $userId: ID!) {
  createList(title: $title, userId: $userId) {
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
	graphql(MyLists, {
		options: (props) => ({
			variables: {
				userId: props.screenProps
			},
		}),
	}),
  graphql(CreateNewList, {
	name: 'createList',
  options: {
    updateQueries: {
      MyLists: (previousData, { mutationResult }) => {
        const newList = mutationResult.data.createList;

        return {
          ...previousData,
					User: {
						...previousData.User,
						lists: [...previousData.User.lists,newList]
					}
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
						User: {
							...previousData.User,
						}
					};
				},
			},
		},
	})
)(ListsComponent);
