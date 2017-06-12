/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React,{Component} from 'react'
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} from 'react-native'

const HomePage = require('./Components/HomePage')

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});

class StoryApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Story',
          component: HomePage,
        }}/>
    );
  }
}

AppRegistry.registerComponent('Story', function(){return StoryApp});
