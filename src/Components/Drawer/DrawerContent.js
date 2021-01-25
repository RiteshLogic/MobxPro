import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ViewPropTypes,TouchableOpacity,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {observer,inject} from "mobx-react";
import { observable,computed ,action,extendObservable} from "mobx";
@inject('userStore')
@observer

class DrawerContent extends React.Component {

  @observable empdata = []

  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  onClickSignOut = () =>{
      const { userStore } = this.props
      userStore.resetData();
      Actions.reset("login");
  }

  render() {
    return (
      <View style={styles.container}>
          <View>
              <Text style={styles.nameText}>" Hi Demo</Text>
          </View>
          <View>
            <TouchableOpacity style={{flexDirection:"row",marginTop:"20%"}}
              onPress={() => this.onClickSignOut()}
            >
              <View style={{padding:"2%"}}>
                <Image style={styles.iconImage} source={{uri:"https://cdn.iconscout.com/icon/premium/png-256-thumb/signout-1-561714.png"}}/>
              </View>

              <View style={{padding:"2%"}}>
                <Text style={styles.signOutText}>Sign out</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"10%",
    padding:"10%"
    // backgroundColor: 'transparent',
  },
  nameText:{
    fontSize:18,
    fontWeight:"bold"
  },
  iconImage:{
    width:20,
    height:20
  },
  signOutText:{
    fontSize:14,
    fontWeight:"bold"
  }
});
export default DrawerContent;