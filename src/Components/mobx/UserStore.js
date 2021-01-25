import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

export default class UserStore {
    @persist('object') @observable user = {};
    @persist('list') @observable empData = [];
   

    @action
    setUserData(user) {
      this.user = user;
    }

    @action 
    setEmpDataList(dataList){
      this.empData = dataList;
    }

    @action updateEmpData(index, dataObj) {
      let dataArray = this.empData
      dataArray[index].employee_name = dataObj.employee_name
      dataArray[index].employee_salary = dataObj.employee_salary
      this.empData = [...dataArray]
    }

    @action resetData() {
      this.user = {}
      this.empData = []
    }
}
