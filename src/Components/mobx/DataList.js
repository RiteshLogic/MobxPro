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
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {observer,inject} from "mobx-react";
import { observable,computed ,action} from "mobx";
import axios from 'axios';
@inject('userStore')
@observer
export default class DataList extends Component {

    @observable empdata = []
   

    constructor(props) {
        super(props);
        this.state = {
        
        }
    }

    @action setList = (val) => {
      this.empdata = val
    }

    componentDidMount () {
      const { userStore } = this.props
      if(userStore.empData.length == 0) {
        this.userDataList();
      }
    }
    
    userDataList = () => {
        axios.get('http://dummy.restapiexample.com/api/v1/employees').then((res) => {
          // this.setList(res.data.data)
          // this.setList(res)
          this.props.userStore.setEmpDataList(res.data.data)
          // console.log(res.data.data)
        }).catch((error) => {
          console.log('ERROR::', error)
        })
        
    }
    // componentDidMount() {
    //     console.log("emp data disp->",this.empdata)
    //   }


  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.props.userStore.empData}
          // data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <TouchableOpacity style={styles.socialBarButton} onPress={() =>Actions.productView({id:item.id})}>
               <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.employee_name}</Text>
                    <Text style={styles.price}>{item.employee_salary}</Text>
                  </View>
                </View>

               
                </TouchableOpacity>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '47%',
    marginHorizontal: 5,
    borderRadius:5
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5
  },
  /******** social bar ******************/
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  