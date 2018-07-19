import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      todoValue: props.text
    }
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };

  toggleComplete = () => {
    event.stopPropagation();

    const { isCompleted, uncompleteTodo, completeTodo, id } = this.props;

    if (isCompleted) {
      uncompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };

  startEditing = () => {
    event.stopPropagation();

    this.setState({
      isEditing: true,
    });
  };

  finishEditing = () => {
    event.stopPropagation();

    const {todoValue} = this.state;
    const {id, updateTodo} = this.props;

    updateTodo(id, todoValue); 
    this.setState({
      isEditing: false,
    });
  };

  controllInput = (text) => {
    this.setState({
      todoValue: text,
    });
  };

  render() {
    const { isEditing, todoValue } = this.state;
    const { text, id, deleteTodo, isCompleted } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleComplete}>
            <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput style={[styles.input, styles.text, isCompleted ? (
              styles.completedText
            ) : (
                styles.uncompletedText
              )]} value={todoValue} multiline={true} onChangeText={this.controllInput} returnKeyType={'done'} onBlur={this.finishEditing} />
          ) : (
              <Text style={[styles.text,
              isCompleted ? (
                styles.completedText
              ) : (
                  styles.uncompletedText
                )]}>{text}</Text>
            )}
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
              <TouchableOpacity onPressOut={(event) => {event.stopPropagation; deleteTodo(id)}}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  };
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
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 15,
    width: width / 2,
  }
});
