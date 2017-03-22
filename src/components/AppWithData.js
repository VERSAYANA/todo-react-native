import React, { Component } from 'react';
import { Text } from 'react-native';

const AppWithData = (props) => {
if (props.data.loading) {
return (<Text>Loading</Text>)
}
console.log(props.data);
return (<Text>Yeap</Text>)
}
export default AppWithData;
