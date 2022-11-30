import React, { Component } from 'react';
import { } from 'react-native';
import AppStack from './Route/AppStack';
import { Provider } from 'react-redux';
import store from './Redux/store/Store'
import { Root } from "native-base";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppStack />
        </Root>
      </Provider>
    );
  }
}
