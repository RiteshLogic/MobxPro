import React, { Component } from 'react'
import Router from "./src/Components/Router";
import { observer, Provider } from 'mobx-react';

import StoreManager from './src/Components/storeManager';
import { createStores, hydrateStores } from './src/Components/Store';
import { toJS } from 'mobx';

const storeManager = new StoreManager(createStores());
hydrateStores(storeManager);

@observer
export default class App extends Component {

  constructor(props) {
    super(props)
    console.log('constructors :: ', storeManager.stores)
  }
  componentDidMount() {
    console.log(':: ', storeManager.stores)
  }
  render() {
    // console.log("App::",toJS.sto)
    return (

      <Provider {...storeManager.stores}>
        <Router />
      </Provider>
    )
  }
}