import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import ListsComponent from '../components/ListsComponent';


const MyQuery = gql`query MyQuery($userId: String!){
  User(auth0UserId: $userId) {
    lists {
      title
			id
    }
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
	graphql(MyQuery, {
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
