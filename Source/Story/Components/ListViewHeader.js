'user strict'

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  },
  coverImage:{
    flex:1
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

const ListViewHeader = (props) => (
  <View style={styles.container}>
    <View style={styles.flowRight}>
      <Image
      source={require('./Assests/listViewHeader.png')}
      style={styles.coverImage}/>
    </View>
    <View style={styles.flowRight}>
      <Image source={{uri:'https://storage.googleapis.com/rocky-production/profilepictures/small_3906dba5250464c4b0f959a2c82c3c6a.jpg'}}/>
      <Text style={{textAlign:'right', marginLeft:15, marginTop:4, marginRight:5}}>by</Text>
      <Text style={styles.titleText}>Denis Stepanov</Text>
    </View>
  </View>
);

module.exports = ListViewHeader;
