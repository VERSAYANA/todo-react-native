import React, { Component } from 'react';
import { Button, View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import CheckBox from 'react-native-checkbox';

export default class todoesComponent extends React.Component {
  static navigationOptions = {
  title: ({ state }) => state.params.title
};

  render() {
    // const { todoes, filter, toggleFilter, complete, addTodo } = this.props;
    // const { title } = this.props.navigation.state.params
		if(this.props.data.loading) {
			return (<Text>Loading</Text>)
		}
		console.log(this.props)
		const todoes = this.props.data.List;
		const { filter, toggleFilter, id } = this.props;
    return (
      <View style={{flex:1, justifyContent: 'space-between'}}>

        <View>
        <View style={s.switchContainer}>
          <Text style={{marginLeft: 8}}>Show Completed todoes</Text>
        <Switch
          style={{marginRight: 8}}
          value={filter}
          onValueChange={() => {toggleFilter()}}
        />
      </View>


        {todoes.notCompleted.map((x,i) =>
          // <View >
            <CheckBox
              containerStyle={s.itemContainer}
              key={i}
              label={x.text}
              checked={x.completed}
              labelStyle={{textDecorationLine: x.completed ? 'line-through' : 'none'}}
              checkboxStyle={{height: 20, width: 20}}
							onChange={() => {this.props.completeTodo({
								variables: { id: x.id, completed: true },
								optimisticResponse: {
									updateTodo: {
										text: x.text,
										completed: true,
										id: x.id,
										__typename: 'Todo',
									},
								},
							})}}
            />
          // </View>
      )}

        {filter ? (todoes.completed.map((x,i) =>
          // <View >
            <CheckBox
              containerStyle={s.itemContainer}
              key={i}
              label={x.text}
              checked={x.completed}
              labelStyle={{textDecorationLine: x.completed ? 'line-through' : 'none'}}
              checkboxStyle={{height: 20, width: 20}}
							onChange={() => {this.props.completeTodo({
								variables: { id: x.id, completed: false },
								optimisticResponse: {
									updateTodo: {
										text: x.text,
										completed: false,
										id: x.id,
										__typename: 'Todo'
									},
								},
							})}}
            />
          // </View>
      )) : (<View/>)}

    </View>

		<TextInput
			style={s.input}
			placeholder="Add New Todo"
			placeholderTextColor="white"
			ref='title'
			onSubmitEditing={(v) => {this.props.newTodo({
				variables: { text: v.nativeEvent.text, listId: id },
				optimisticResponse: {
					createTodo: {
						id: -1,
						text: v.nativeEvent.text,
						completed: false,
						__typename: 'Todo'
					},
				},

			 }).then(({ data }) => {console.log('got data', data)});
				this.refs['title'].setNativeProps({text: ''});
				this.refs['title'].blur();
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
