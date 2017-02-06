import React from 'react';
import { StackNavigator } from 'react-navigation'
import Lists from './containers/Lists'
import Todos from './containers/Todos'

const App = StackNavigator({
  Lists: { screen: Lists },
  Todos: { screen: Todos }
})









 export default App;
