import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";

export default class Weather extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#00C6FB', '#00669B']}
        style={styles.container}
      >
        <View style={styles.upper}>
          <Text>Icon</Text>
          <Text style={styles.temp}>35°C</Text>
        </View>
        <View style={styles.lower}>
          <Text style={styles.title}>Raining</Text>
          <Text style={styles.subtitle}>For more info look outside</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lower: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingBottom: 25
  },
  title: {
    fontSize: 38,
    color: 'white'
  },
  subtitle: {
    fontSize: 24,
    color: 'white'
  },
  temp: {
    fontSize: 38,
    marginTop: 10,
    color: 'white'
  }
});
