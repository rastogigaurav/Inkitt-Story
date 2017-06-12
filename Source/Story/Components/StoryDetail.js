'use strict'

import React,{Component} from 'react'
import HTMLView from 'react-native-htmlview';
import ScrollTopView from 'react-native-scrolltotop';
import {
  View,
  Text,
  Image,
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
  sectionHeader: {
    flex: 1,
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    marginLeft:15,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 16,
    marginTop:2,
    fontWeight: 'bold',
  },
  flowRight: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch'
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

    var dataBlob = {};
    var sectionsID = ['Section 1'];
    var rowsID = ['Row 1'];

    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };

    var dataSource = function () {
      return new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
    }

    this.state = {
      dataSource: dataSource().cloneWithRowsAndSections(dataBlob, sectionsID, rowsID),//cloneWithRowsAndSections([['row 1', ...], ...]),
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
        renderSectionHeader={this.renderSectionHeader}
        onEndReachedThreshold = {10}
        ref="listview"
        onScroll={(e)=>this._onScroll(e)}
        renderScrollComponent={(props)=>{
            return <ScrollView style={styles.ViewPort} {...props}/>
        }}
        />
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionHeader}>
        <View style={styles.flowRight}>
          <Image source={{uri:'https://storage.googleapis.com/rocky-production/profilepictures/small_3906dba5250464c4b0f959a2c82c3c6a.jpg'}}/>
          <Text style={styles.titleText}>Test Work Book</Text>
          <Text style={{textAlign:'right', marginLeft:5, marginTop:5, marginRight:5}}>by</Text>
          <Text style={styles.subTitleText}>Denis Stepanov</Text>
        </View>
      </View>
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
