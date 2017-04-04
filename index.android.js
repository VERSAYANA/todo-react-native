
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import App from './src/App'
import reducer from './src/reducers';
// import devToolsEnhancer from 'remote-redux-devtools';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import filter from './src/reducers/filter';
import userId from './src/reducers/userId';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj0glz8cz8soy013606fq2z0z' }),
	addTypename: true,
    dataIdFromObject: (result) => {
        if (result.id && result.__typename) {
            return result.__typename + result.id
        }
        return null
    }
});

const store = createStore(
  combineReducers({
    filter: filter,
		userId: userId,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware())
      // If you are using the devToolsExtension, you can add it here also
      // (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);


const NativeTodo = () => {
    return (
      <ApolloProvider store={store} client={client}>
        <App />
      </ApolloProvider>
    );
};

export default AppRegistry.registerComponent('NativeConverter', () => NativeTodo);
