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
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage:{
    flex:1
  }
});

const ListViewHeader = (props) => (
  <View style={styles.container}>
    <Image
      source={require('./Assests/listViewHeader.png')}
      style={styles.coverImage}
    />
  </View>
);

module.exports = ListViewHeader;
