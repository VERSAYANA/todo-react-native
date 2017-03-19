
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import App from './src/App';
import reducer from './src/reducers';
import devToolsEnhancer from 'remote-redux-devtools';

import { createStore } from "redux";
import { ApolloClient, ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj0glz8cz8soy013606fq2z0z' }),
});

const store = createStore(
  combineReducers({
    todos: todoReducer,
    users: userReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);


const NativeTodo = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
};

export default



AppRegistry.registerComponent('NativeConverter', () => NativeTodo);
