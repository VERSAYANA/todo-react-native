import React, { Component } from 'react';
// import { StackNavigator } from 'react-navigation'
import Main from './components/Main'
import Login from './components/Login'
import SpecifyUser from './containers/SpecifyUser.js'
// import Lists from './containers/Lists'
// import Todos from './containers/Todos'
// import { gql, graphql, compose } from 'react-apollo';
// import Auth0Lock from 'react-native-lock';
// import {TouchableHighlight ,StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';
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
	authId: state.userId.authId,
	idToken: state.userId.idToken
});


const mapDispatchToProps = {
  loginAuth: (id) => ({
    type: "AUTH_ID",
		id
  }),
	loginId: (id) => ({
		type: "ID_TOKEN",
		id
	})
};


let App = ({ authId, idToken, loginAuth, loginId }) => {
	// console.log(props);
	// return (<Text>gi</Text>)
	if(authId === false) {
		return (
			<Login loginAuth={loginAuth} loginId={loginId} />
		)
	} else {
		return(
			<SpecifyUser authId={authId} idToken={idToken}/>
		)
	}

}

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
