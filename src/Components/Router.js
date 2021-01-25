import React, { Component } from 'react'
import { Dimensions, Alert, BackHandler } from 'react-native'
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Stack,
  Drawer,
  Tabs
} from 'react-native-router-flux'
import Login from "./mobx/Login";
import DataList from "./mobx/DataList";
import ProductView from "./mobx/ProductView";
import DrawerContent from "./Drawer/DrawerContent";


class RouterView extends Component {


  render() {
    return <Router>

      <Stack key='root'>
      <Scene key='login' component={Login} title='' hideNavBar={true} />
      <Drawer
          hideNavBar
          key="drawerContent"
          contentComponent={DrawerContent}
          drawerWidth={250}
          // drawerPosition="right"
        >

          <Scene key='dataList' component={DataList} type="reset" title='' backTitle=" " hideNavBar={false} />
        
        </Drawer>
      
      
        
        
        <Scene key='productView' component={ProductView} title='' hideNavBar={false} />
       
        

        
        
      </Stack>

    </Router>
 
  }
}

export default RouterView
