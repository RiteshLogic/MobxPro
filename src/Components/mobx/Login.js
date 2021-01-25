import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {observer,inject} from "mobx-react";
import { observable,computed ,action} from "mobx";
@inject('userStore')
@observer
export default class Login extends Component {

    
    @observable email = ""
    @observable password = ""

    
    @action setEmail = (val) => {
        this.email = val
    }
    @action setPassword = (val) => {
        this.password = val
    }

    constructor(props) {
        super(props);
        // this.state = {
        //   email : "",
        //   password : ""
        // }
    }

    onClickListener = () => {
        
            this.props.userStore.setUserData({ email: this.email, password: this.password }),
                // Actions.dataList()
                Actions.reset("drawerContent");
    
    }
  
  componentDidMount() {
    console.log("emp data disp->",this.props.userStore.user)
  }
    
  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setEmail(email)}
              />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setPassword(password)}
              />
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickRegister()}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:5,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:5,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
