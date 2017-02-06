import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class TodosComponent extends React.Component {

  render() {
    const { todos } = this.props;
    console.log(todos)
    return (
      <View>
      {todos.map((x,i) =>
        <Text key={i}>{x.text}</Text>

      )}
      </View>
    )
  }
}
