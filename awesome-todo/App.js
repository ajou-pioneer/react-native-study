import React from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, Platform, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';
import uuidvl from 'uuid';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedTodo: false,
    todos: {}
  };

  handleNewTodo = (text) => {
    this.setState({
      newTodo: text,
    });
  };

  loadTodo = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(todos);

      this.setState({
        loadedTodo: true,
        todos: parsedTodos || {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  addTodo = () => {
    const { newTodo } = this.state;

    if (newTodo !== '') {
      this.setState({
        newTodo: '',
      });

      this.setState((prevState) => {
        const id = uuidvl();

        const newTodoObject = {
          [id]: {
            id: id,
            iscompleted: false,
            text: newTodo,
            createdAt: Date.now(),
          }
        };

        const newState = {
          ...prevState,
          newTodo: '',
          todos: {
            ...prevState.todos,
            ...newTodoObject
          }
        };

        this.saveTodos(newState.todos);
        return { ...newState };
      });
    }
  };

  deleteTodo = (id) => {
    this.setState((prevState) => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos
      };

      this.saveTodos(newState.todos);
      return { ...newState };
    })
  };

  uncompleteTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false,
          }
        }
      };

      this.saveTodos(newState.todos);
      return { ...newState };
    });
  };

  completeTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true,
          }
        }
      };

      this.saveTodos(newState.todos);
      return { ...newState };
    });
  };

  updateTodo = (id, text) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text: text
          }
        }
      };

      this.saveTodos(newState.todos);
      return { ...newState };
    });
  };

  saveTodos = (newTodos) => {
    const satveTodo = AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  componentDidMount = () => {
    this.loadTodo();
  };

  render() {
    const { newTodo, loadedTodo, todos } = this.state;

    if (!loadedTodo) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.title}>Awesome Todo</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={'New Todo'} value={newTodo} onChangeText={this.handleNewTodo} returnKeyType={'done'} onSubmitEditing={this.addTodo} />
          <ScrollView contentContainerStyle={styles.todo}>
            {Object.values(todos).reverse().map((todo) =>
              <ToDo
                key={todo.id}
                deleteTodo={this.deleteTodo}
                uncompleteTodo={this.uncompleteTodo}
                completeTodo={this.completeTodo}
                updateTodo={this.updateTodo}
                {...todo}
              />
            )}
          </ScrollView>
        </View>
      </View>
    );
  };
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
