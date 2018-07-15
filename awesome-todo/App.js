import React from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, Platform, TextInput, ScrollView } from 'react-native';
import ToDo from './ToDo';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
  };

  handleNewTodo = (text) => {
    this.setState({
      newTodo: text,
    });
  };

  render() {
    const { newTodo } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.title}>Awesome Todo</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={'New Todo'} value={newTodo} onChangeText={this.handleNewTodo} returnKeyType={'done'} />
          <ScrollView contentContainerStyle={styles.todo}>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        }
      },
      android: {
        elevation: 3,
      }
    })
  },
  input: {
    padding: 20,
    fontSize: 20,
  },
  todo: {
    alignItems: 'center',
  },
});
