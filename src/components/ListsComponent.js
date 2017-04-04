import React, { Component } from 'react';
import { StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';

export default class ListsComponent extends React.Component {

  static navigationOptions = {
    title: 'Lists'
  };

  render() {
    const { navigate } = this.props.navigation;

	if (this.props.data.loading) {
	return (<Text>Loading</Text>)
	}
	const lists = this.props.data.User.lists;

		return (

        <View style={{justifyContent: 'space-between', flex: 1}}>

          <ScrollView>

        {lists.map((l,i) =>
          <View key={i} style={s.listRow}>

            {l.title !== 'All' ? (
              <TouchableNativeFeedback onPress={() => {this.props.deleteList({
									variables: { id: l.id },
									optimisticResponse: {
										deleteList: {
											title: l.title,
											__typename: 'List'
										},
									},
								})}}>
                <View style={s.closeContainer}>
                  <Text style={s.close}>&times;</Text>
                </View>
              </TouchableNativeFeedback>) : (<View/>)
            }

            <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
								onPress={() => navigate('Todos', { id: l.id, title: l.title })}>
              <View style={s.listContianer}>
                <Text style={l.title !== 'All' ? s.listTitle : s.listAll}>{l.title}</Text>

              </View>
            </TouchableNativeFeedback>

          </View>
        )}

    </ScrollView>



      <View>

        <TextInput
          style={s.input}
          placeholder="Create List"
          placeholderTextColor="white"
          ref='create-list'
          underlineColorAndroid='#26C6DA'
					onSubmitEditing={(v) => {this.props.createList({
						variables: { title: v.nativeEvent.text },
						optimisticResponse: {
		          createList: {
		            id: -1, // A temporary id. The server decides the real id.
		            title: v.nativeEvent.text,
								__typename: 'List'
		          },
		        },
					 }).then(({ data }) => {});
						this.refs['create-list'].setNativeProps({text: ''});
						this.refs['create-list'].blur();
					}}
        />
      </View>

      </View>
		)
	}
}

const s = StyleSheet.create({

  input: {
    height: 50,
    backgroundColor: '#26C6DA',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  listRow: {
    flexDirection: 'row',
    height: 45,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,


  },
  closeContainer: {
    width: 45,
    backgroundColor: '#EC407A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    color:'#ffff',
    fontSize: 24,
  },
  listContianer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    marginLeft: 10,
    color: 'black',
  },
  listAll: {
    marginLeft: 60,
    color: 'black',
  },
  listCounter: {
    marginRight: 10,
    color: 'black',
  },

})
