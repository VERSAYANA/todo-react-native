import React from 'react';
import { StackNavigator } from 'react-navigation'
import Lists from './containers/Lists'
import Todos from './containers/Todos'
import { Text } from 'react-native';
import { gql, graphql, compose } from 'react-apollo';
import AppWithData from './components/AppWithData';
import { connect } from 'react-redux';

//
const App = StackNavigator({
  Lists: { screen: Lists },
  Todos: { screen: Todos }
})

// const App = (props) => (
// 	<Text>Yeap</Text>
// );


// const MyQuery = gql`query {
// 	allLists {
//     title
//     todoes {
//       text
//     }
//   }
// }`;
//
// const mapStateToProps = (state, props) => ({
//   filter: state.filter,
// });
//
//
// const mapDispatchToProps = {
//   toggleFilter: () => ({
//     type: "TOGGLE_FILTER"
//   })
// };

// const Todos = connect(mapStateToProps, mapDispatchToProps)(TodosComponent);

// export default compose(
//   graphql(MyQuery),
//   connect(mapStateToProps, mapDispatchToProps)
// )(AppWithData);
export default App;
