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

  startEditing = () => {
    this.setState({
      isEditing: true,
    })
  }

  finishEditing = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    const { isEditing, isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleComplete}>
            <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
          </TouchableOpacity>
          <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>Lorem Ipsum</Text>
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✔️</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this.startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#BFBFBF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: '#BFBFBF',
    borderColor: '#BFBFBF',
  },
  uncompletedCircle: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: {
    color: '#BFBFBF',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839'
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  }
});
