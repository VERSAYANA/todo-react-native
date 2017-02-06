import React, { Component } from 'react';
import { Button, View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import CheckBox from 'react-native-checkbox';

export default class TodosComponent extends React.Component {
  static navigationOptions = {
  title: ({ state }) => state.params.title
};

  render() {
    const { todos, filter, toggleFilter, complete, addTodo } = this.props;
    const { title } = this.props.navigation.state.params
    return (
      <View>
        <TextInput
          placeholder="Add New Todo"
          ref={title}
          onSubmitEditing={(v) => {addTodo(v.nativeEvent.text, title);
            this.refs[title].setNativeProps({text: ''});
            this.refs[title].blur();
          }}
        />
        <Switch
          value={filter}
          onValueChange={() => {toggleFilter()}}
        />
        {todos.map((x,i) =>
          <CheckBox
            key={i}
            label={x.text}
            checked={x.completed}
            onChange={a => complete(x.id)}
            labelStyle={{textDecorationLine: x.completed ? 'line-through' : 'none'}}
          />
      )}
      </View>
    )
  }
}

// const s = StyleSheet.create({
//   bavk
// })
