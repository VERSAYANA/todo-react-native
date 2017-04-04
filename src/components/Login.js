import React, { Component } from 'react';
import {TouchableHighlight ,StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';
import Auth0Lock from 'react-native-lock';
import App from '../App';

const lock = new Auth0Lock({clientId: 'r4dTNSeUfoBPIHJM4vxn2um1322mSq5L', domain: 'versayana.eu.auth0.com'});


export default class Login extends React.Component {

	render() {
		// console.log(this.props.navigation)
		// const { navigate } = this.props.navigation;
		const { specifyUser } = this.props;

		return (
			<View>
				{lock.show({
					closable: true,
				}, (err, profile, token) => {
					if (err) {
						return;
					}
					console.log(profile);
					console.log(token);

					specifyUser(profile.userId)
				})}

			</View>
		)
	}
}
