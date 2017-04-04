import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
// import Main from './components/Main'

// import Login from './components/Login'
import Lists from '../containers/Lists'
import Todos from '../containers/Todos'
// import { gql, graphql, compose } from 'react-apollo';
// import Auth0Lock from 'react-native-lock';
// import {TouchableHighlight ,StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';
export default class Main extends React.Component {

	render() {
		const Home = StackNavigator({
		  Lists: { screen: Lists },
		  Todos: { screen: Todos }
		})
		return (
			<Home screenProps={this.props.userId} />
		);
	}


}
