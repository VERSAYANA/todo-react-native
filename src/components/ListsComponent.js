import React, { Component } from 'react';
import { StyleSheet, Button, View, TouchableNativeFeedback, Text, ScrollView, TextInput } from 'react-native';

export default class ListsComponent extends React.Component {

  static navigationOptions = {
    title: 'Lists'
  };

  render() {
    const { navigate } = this.props.navigation;
    const { lists, deleteList, createList } = this.props;
    return (
        <View style={{justifyContent: 'space-between', flex: 1}}>

          <ScrollView>

        {lists.map((l,i) =>
          <View key={i} style={s.listRow}>

            {l.title !== 'All' ? (
              <TouchableNativeFeedback onPress={() => {deleteList(l.title)}}>
                <View style={s.closeContainer}>
                  <Text style={s.close}>&times;</Text>
                </View>
              </TouchableNativeFeedback>) : (<View/>)
            }

            <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => navigate('Todos', { title: l.title })}>
              <View style={s.listContianer}>
                <Text style={l.title !== 'All' ? s.listTitle : s.listAll}>{l.title}</Text>
                <Text style={s.listCounter}>{l.count}</Text>
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
          underlineColorAndroid='#F4511E'
          onSubmitEditing={(v) => {createList(v.nativeEvent.text);
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
  // inputContainer: {
  // height: 70
  // },
  input: {
    height: 50,
    backgroundColor: '#F4511E',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  listRow: {
    flexDirection: 'row',
    height: 50,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,

  },
  closeContainer: {
    width: 50,
    backgroundColor: '#F4511E',
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
    marginLeft: 8,
    color: 'black',
  },
  listAll: {
    marginLeft: 58,
    color: 'black',
  },
  listCounter: {
    marginRight: 8,
    color: 'black',
  },


})
