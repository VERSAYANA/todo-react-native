import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import {TouchableHighlight ,StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';
import Main from '../components/Main'

const MyQuery = gql`query MyQuery($userId: String!){
  User(auth0UserId: $userId) {
		id
	}
}`;
const CreateUser = gql`mutation CreateUser($idToken: String!) {
  createUser(authProvider: {
    auth0: {
      idToken: $idToken
    }
  }) {
    id
  }
}`;

let SpecifyUser = (props) => {
	console.log(props);
	if(props.data.loading) {
		return(<Text>Loading</Text>)
	}
	return(<Text>thinking</Text>)

	// if(props.data.User === null) {
	// 	props.mutate({
	// 		variables: {idToken: props.idToken},
	// 		optimisticResponse: {
	// 			createUser: {
	// 				id: -1,
	// 				__typename: 'User'
	// 			},
	// 		},
	// 	})
		// .then(({ data }) => {
		// 	console.log(data);
    //     return (<Main userId={data.createUser.id}/>);
    //   }).catch((error) => {
    //     console.log('there was an error sending the query', error);
    //   });
		// 	return(<Main userId={data.createUser.id}/>)
  	// }


			// return (
			// 	<Main userId={props.data.User.id}/>
			// )
			//


	// console.log(props);
	// return (
	// 	<Text>gello</Text>
	// );
};

export default compose(
	graphql(MyQuery, {
		options: (props) => ({
			variables: {
				userId: props.authId
			},
		}),
	}),
	graphql(CreateUser, {
		options: (props) => ({
			variables: {
				idToken: props.idToken
			}
	})
})
)(SpecifyUser);
