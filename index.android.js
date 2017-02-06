
import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from './src/App';
import reducer from './src/reducers';
import devToolsEnhancer from 'remote-redux-devtools';

const store = createStore(reducer, devToolsEnhancer());


const NativeConverter = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
};

export default



AppRegistry.registerComponent('NativeConverter', () => NativeConverter);
