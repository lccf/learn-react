import React, { Component } from 'react';
import {
  Text, TextStyle
} from 'react-native';

interface Props {
  style: TextStyle,
  text: string
}

export default (props: Props) => {
  let {style, text} = props;
  return (
    <Text style={ style }>
      { text }
    </Text>
  )
}