import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class ListsComponent extends React.Component {
  static navigationOptions = {
    title: 'Lists'
  };
  // constructor(props) {
  //   super(props)
  // };
  render() {
    // const { props } = this.props;
    const { navigate } = this.props.navigation;
    const { lists } = this.props;
    // console.log(this.props);
    return (
      <View>
        {lists.map((l,i) =>
          <Button
            key={i}
           onPress={() => navigate('Todos', {title: l.title})}
           title={l.title}
         />
       )}
      </View>
    )
  }
}
