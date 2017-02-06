import React, { Component } from 'react';
import { Button, View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import CheckBox from 'react-native-icon-checkbox';

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
          style={s.input}
          placeholder="Add New Todo"
          placeholderTextColor="white"
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
            color="red"
            iconStyle={{color: 'blue'}}
            checked={x.completed}
            onPress={a => complete(x.id)}
            labelStyle={{textDecorationLine: x.completed ? 'line-through' : 'none'}}
          />
      )}
      </View>
    )
  }
}

const s = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#F4511E',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
});
