import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
  };

  toggleComplete = () => {
    this.setState((prevState) => {
      return ({
        isCompleted: !prevState.isCompleted
      });
    })
  }

  render() {
    const { isEditing, isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleComplete}>
          <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
        </TouchableOpacity>
        <Text style={styles.text}>Lorem Ipsum</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#F23657',
    borderWidth: 3,
    marginRight: 20, 
  },
  completedCircle: {
    backgroundColor: '#F23657',
  },
  uncompletedCircle: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  }
});
