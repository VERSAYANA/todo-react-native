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
              onChange={() => {complete(x.id)}}
              checkboxStyle={{height: 20, width: 20}}
            />
          // </View>
      )}
    </View>

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
    backgroundColor: '#F4511E',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#E0E0E0',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginBottom: 0,
    paddingLeft: 8,
    justifyContent: 'flex-start',
  }
});
