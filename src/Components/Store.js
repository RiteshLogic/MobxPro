import UserStore from '../Components/mobx/UserStore.js';
import AsyncStorage from '@react-native-community/async-storage';
import {create} from 'mobx-persist';
import { toJS } from 'mobx';
import {Actions} from 'react-native-router-flux'

const hydrate = create({
  storage: AsyncStorage,
  // jsonify: true,
});

export function createStores(api, app) {
  const stores = {
    userStore: new UserStore(),
  };
  return stores;
}

export function hydrateStores(storeManager) {
  const {stores} = storeManager;
  console.log("hydrateStores",toJS(stores.userStore))
  hydrate('userStore', stores.userStore).then(() => {    
    if (stores.userStore &&  stores.userStore.user && stores.userStore.user.email) {
      Actions.reset("drawerContent");
    } else {
      Actions.reset("login");
    }
    console.log("User Store::: ",toJS(stores.userStore))
  });




  // hydrate('updateStore', stores.updateStore).then(() => {    
  //   console.log("Update User Store data ::: ",toJS(stores.updateStore))
  // });

}