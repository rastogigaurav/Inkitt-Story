'use strict'

import React,{Component} from 'react'
import HTMLView from 'react-native-htmlview';
import ScrollTopView from 'react-native-scrolltotop';
import {
  View,
  Text,
  ListView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

const ListViewHeader = require('./ListViewHeader')

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  htmlViewContainer:{
    flex:1,
    padding:15,
    marginTop:15
  }
});

class StoryDetail extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1']),
      isShowToTop: false
    };
  }

  _listView() {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderHeader={() => <ListViewHeader />}
        onEndReachedThreshold = {10}
        ref="listview"
        onScroll={(e)=>this._onScroll(e)}
        renderScrollComponent={(props)=>{
            return <ScrollView style={styles.ViewPort} {...props}/>
        }}
        />
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View style={styles.htmlViewContainer}>
          <HTMLView
            value={this.props.chapter.text}
            />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let listView = this._listView();
    return (
      <View style={{flex:1}}>
        {listView}
        {this.state.isShowToTop?<ScrollTopView root={this} ></ScrollTopView>:null}
      </View>
    );
  }

  _onScroll(e) {
    var offsetY = e.nativeEvent.contentOffset.y;

    if(offsetY > 100) {
        this.setState({
            isShowToTop: true
        })
    } else {
        this.setState({
            isShowToTop: false
        })
    }
  }
}

module.exports = StoryDetail;
