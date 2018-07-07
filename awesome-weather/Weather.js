import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherCases = {
  Rain: {
    colors: ['#00C6FB', '#005BEA'],
    title: 'Raining',
    subtitle: 'For more info look outside',
    icon: 'ios-rainy'
  },
  Clear: {
    colors: ['#FEF253', '#FF7300'],
    title: 'Sunny',
    subtitle: 'For more info look outside',
    icon: 'ios-sunny'
  },
  Thunderstorm: {
    colors: ['#00ECBC', '#007ADF'],
    title: 'Thunderstorm',
    subtitle: 'For more info look outside',
    icon: 'ios-thunderstorm'
  },
  Clouds: {
    colors: ['#D7D2CC', '#304352'],
    title: 'Cloudy',
    subtitle: 'For more info look outside',
    icon: 'ios-cloudy'
  }
}

function Weather({temp, name}) {
  return (
    <LinearGradient
      colors={['#00C6FB', '#00669B']}
      style={styles.container}
    >
      <View style={styles.upper}>
        <Ionicons color='white' size={100} name={weatherCases[name].icon} />
        <Text style={styles.temp}>{temp}°C</Text>
      </View>
      <View style={styles.lower}>
        <Text style={styles.title}>{weatherCases[name].title}</Text>
        <Text style={styles.subtitle}>{weatherCases[name].subtitle}</Text>
      </View>
    </LinearGradient>
  )
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Weather;

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
