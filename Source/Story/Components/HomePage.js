'use strict'

import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native'

const StoryDetail = require('./StoryDetail')

const styles = StyleSheet.create({
  description:{
    marginBottom:20,
    fontSize:18,
    textAlign:'center',
    color:'#656565'
  },
  container:{
    padding:30,
    marginTop:100,
    alignItems:'center'
  },
  buttonContainer:{
    padding:30,
    marginTop:30,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  button: {
    flex: 1,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 20,
    borderRadius: 2,
    marginBottom: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});

function urlForQueryAndPage(storyId, chapterNumber) {
  var data = {
      stories: storyId,
      chapters: chapterNumber,
  };

  var querystring = Object.keys(data)
    .map(key => key + '/' + encodeURIComponent(data[key]))
    .join('/');

  return 'https://cap_america.inkitt.de/1/' + querystring;
}

class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      message: ''
    }
  }

  _navigate(){
    this.props.navigator.push({
      component: StoryDetail,
    });
  }

  _executeQuery(query) {
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
      this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
    }));
  }

  _handleResponse(response) {
    this.setState({ isLoading: false , message: '' });
    this.props.navigator.push({
      title: response.name,
      component: StoryDetail,
      passProps: {chapter: response}
    });
  }

  _didTapStartReading(){
    var query = urlForQueryAndPage(106766, 1);
    this._executeQuery(query);
  }

  render(){
    var spinner = this.state.isLoading ?
    ( <ActivityIndicator
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Welcome to the Story.{"\n\n\n"}A place where you get all stories based on your interest.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button}
          onPress={this._didTapStartReading.bind(this)}
          underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>
              Start Reading
            </Text>
          </TouchableHighlight>
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    )
  }
}

module.exports = HomePage;
