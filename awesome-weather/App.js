import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View, StatusBar } from "react-native";
import Weather from "./Weather";

const API_KEY = '{KEY}';

export default class App extends Component {
  state = {
    isLoaded: false,
    err: null,
    temp: null,
    name: null
  };

  _getWeather = (lat, lon) => {
    fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => { 
      this.setState({
        temp: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true
      });
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longtitude)
      },
      error => {
        this.setState({
          err: error
        });
      }
    );
  }

  render() {
    const { isLoaded, err, temp, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather temp={Math.ceil(temp - 273.15)} name={name} />
        ) : (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Getting the awesome weather</Text>
              {err ? <Text>{err}</Text> : null}
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FFCE05",
    justifyContent: "flex-end",
    paddingLeft: 25,
    paddingBottom: 25
  },
  loadingText: {
    fontSize: 20
  }
});
