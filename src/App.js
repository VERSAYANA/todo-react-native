import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import Main from './components/Main'

import Login from './components/Login'
import Lists from './containers/Lists'
import Todos from './containers/Todos'
import { gql, graphql, compose } from 'react-apollo';
// import Auth0Lock from 'react-native-lock';
import {TouchableHighlight ,StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';
import { connect } from "react-redux";


// var lock = new Auth0Lock({clientId: 'r4dTNSeUfoBPIHJM4vxn2um1322mSq5L', domain: 'versayana.eu.auth0.com'});

//
// export default class App extends React.Component {
// 	onLogin() {
// 	lock.show({
// 		closable: true,
// 	}, (err, profile, token) => {
// 		if (err) {
//
// 			return;
// 		}
// 		console.log(profile);
// 		console.log(token);
// 	});
// }
// 	render() {
//
// 		return (
// 			<View>
// 				{lock.show({
// 					closable: true,
// 				}, (err, profile, token) => {
// 					if (err) {
// 						return;
// 					}
// 					console.log(profile);
// 					console.log(token);
// 				})}
// 		</View>
// 	);
//
//
// 	}
// }



// lock.show({}, (err, profile, token) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
  // Authentication worked!
//   console.log('Logged in with Auth0!');
// });

// const App = StackNavigator({
	// Login:  { screen: Login },
//   Lists: { screen: Lists },
//   Todos: { screen: Todos }
// })
const mapStateToProps = (state, props) => ({
	userId: state.userId
});


const mapDispatchToProps = {
  specifyUser: (userId) => ({
    type: "SPECIFY_USER",
		userId
  })
};


let App = ({ userId, specifyUser }) => {
	// console.log(props);
	// return (<Text>gi</Text>)
	if(userId === false) {
		return (
			<Login specifyUser={specifyUser}/>
		)
	}
		else {
			return (
				<Main userId={userId}/>
			)
		}
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
