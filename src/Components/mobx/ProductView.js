import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux'
import {observer,inject} from "mobx-react";
import { observable,computed ,action} from "mobx";
@inject('userStore')
@observer
export default class productView extends Component {

    // @observable id = ""
    @observable employeeObj  = {}; 
    @observable index = -1;
    @observable employee_name = "";
    @observable employee_salary = ""

    @action setEmpName = (val) => {
        this.employee_name = val
    }
    @action setEmpSalary = (val) => {
        this.employee_salary = val
    }

    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
        }
        console.log("pass data::",this.props.id)
    }

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible })
    }

    @action setEmployeeDetails = (dataObj, arrayIndex) => {
      if(dataObj) {
        this.employeeObj = dataObj;
        this.index = arrayIndex
      }
    }

    componentDidMount(){   
      let index = this.props.userStore.empData.findIndex(x => x.id ===this.props.id);
      if(index !== -1) {
        const dataObj = this.props.userStore.empData[index]
        this.setEmployeeDetails(dataObj, index)
      }
    }

    @action onClickSubmitButton = () => {
      const { userStore } = this.props
      userStore.updateEmpData(this.index, { employee_name: this.employee_name, employee_salary: this.employee_salary })
      this.employeeObj.employee_name = this.employee_name
      this.employeeObj.employee_salary = this.employee_salary
      this.setModalVisible(false)
    }

    @action onClickEditButton = () => {
      this.employee_name = this.employeeObj.employee_name
      this.employee_salary = this.employeeObj.employee_salary
      this.setModalVisible(true)
    }

  render() {
    const { modalVisible } = this.state;
    const { item} = this.props.id;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30,marginTop:50}}>
            <Image style={styles.productImg} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca"}}/>
            <Text style={styles.name}>{this.employeeObj && this.employeeObj.employee_name}</Text>
            <Text style={styles.price}>{`$${this.employeeObj && this.employeeObj.employee_salary}`}</Text>
            
          </View>
         
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => {this.onClickEditButton()}}>
              <Text style={styles.shareButtonText}>Edit Data</Text>  
            </TouchableOpacity>
          </View> 

          <View style={{ flex: 1 }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>

                  <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                      placeholder="Emp Name"
                      keyboardType="email-address"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.setEmpName(text)}
                      value={this.employee_name}
                      // onChangeText={employee_name => this.setEmail('username', employee_name)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                      placeholder="Emp salary"
                      keyboardType="email-address"
                      underlineColorAndroid='transparent'
                      onChangeText={(employee_salary) => this.setEmpSalary(employee_salary)}
                      value={this.employee_salary}
                    />
                  </View>
                <View style={{flexDirection:"row"}}>
                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.onClickSubmitButton()
                    }}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setModalVisible(false)
                    }}
                  >
                    <Text style={styles.textStyle}>Cencel</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  productImg:{
    width:200,
    height:200,
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  separator1:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:100,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    backgroundColor: "#00BFFF",
  },
  shareButton1: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    backgroundColor: "red",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  },

  //******************************  \\\modal style/// ***********************/
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor :'#DCDCDC',
  borderRadius:5,
  borderBottomWidth: 1,
  width:250,
  height:45,
  marginBottom:20,
  flexDirection: 'row',
  alignItems:'center'
},
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin:5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});    