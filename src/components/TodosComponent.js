import React, { Component } from 'react';
import { Button, View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import CheckBox from 'react-native-checkbox';

export default class TodosComponent extends React.Component {
//   static navigationOptions = {
//   title: ({ state }) => state.params.title
// };

  render() {
    // const { todos, filter, toggleFilter, complete, addTodo } = this.props;
    // const { title } = this.props.navigation.state.params
		if(this.props.data.loading) {
			return (<Text>Loading</Text>)
		}
		// console.log(this.props)
		const todos = this.props.data.List.todoes;
		const { filter, toggleFilter } = this.props;
    return (
      <View style={{flex:1, justifyContent: 'space-between'}}>

        <View>
        <View style={s.switchContainer}>
          <Text style={{marginLeft: 8}}>Show Completed Todos</Text>
        <Switch
          style={{marginRight: 8}}
          value={filter}
          onValueChange={() => {toggleFilter()}}
        />
      </View>


        {todos.map((x,i) =>
          // <View >
            <CheckBox
              containerStyle={s.itemContainer}
              key={i}
              label={x.text}
              checked={x.completed}
              labelStyle={{textDecorationLine: x.completed ? 'line-through' : 'none'}}
              checkboxStyle={{height: 20, width: 20}}
            />
          // </View>
      )}
    </View>

      <TextInput
        style={s.input}
        placeholder="Add New Todo"
        placeholderTextColor="white"
      />
      </View>
    )
  }
}

const s = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomColor: '#E0E0E0',
    height: 50,
    // justifyContent: 'center',
    borderBottomWidth: 1,
  },
  input: {
    height: 50,
    backgroundColor: '#26C6DA',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#E0E0E0',
    height: 45,
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingLeft: 10,
    justifyContent: 'flex-start',
  }
});
