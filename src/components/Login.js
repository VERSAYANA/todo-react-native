import React, { Component } from 'react';
import {TouchableHighlight ,StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';
import Auth0Lock from 'react-native-lock';
import App from '../App';
import { gql, graphql, compose } from 'react-apollo';

const lock = new Auth0Lock({clientId: 'r4dTNSeUfoBPIHJM4vxn2um1322mSq5L', domain: 'versayana.eu.auth0.com'});

// const MyQuery = gql`query MyQuery($userId: String!){
//   User(auth0UserId: $userId) {
// 		id
// 	}
// }`;

export default class Login extends React.Component {

	render() {
		// console.log(this.props.navigation)
		// const { navigate } = this.props.navigation;
		const { loginAuth, loginId } = this.props;

			return (
				<View>
					{lock.show({
						closable: true,
					}, (err, profile, token) => {
						if (err) {
							return;
						}
						// console.log(profile);
						// console.log(token);

						loginAuth(profile.userId);
						loginId(token.idToken);
					})}

				</View>
			)
			// const LoginWithData = graphql()
		}
	}

// const LoginWithData = graphql()
