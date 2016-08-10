import assign = require('object-assign');
import { actionUpdateFilter } from './actions';
import {
  cate,
  cateModel,
  filterItemModel,
  filterRequestModel,
  requestInfoModel,
  crumbItemModel,

  reducerModel,
  externalCallbackModel,
} from './model';

const mixinAttr = {
  visible: false,
  selected: [],
  selectLimit: 1,
}
const mixUiControlAttr = (item: any, extend: any = {}) => assign({}, mixinAttr, {data: item}, extend);

export const dataTransform = function (data: filterRequestModel, externalCallback: externalCallbackModel):reducerModel {
  // 数据清洗
  let others = data.data.others.filter((item) => {return item.code && item.name ? true : false});
  others = others.map((item)=> {
    if (item.value.length) {
      item.value = item.value.filter((value) => {
        return value === null ? false : true
      })
    }
    // 处理数据是对象的情况
    else if (typeof item.value == 'object') {
      let oldValue = item.value;
      item.value = [];
      for(let value in oldValue) {
        item.value.push(oldValue[value]);
      }
    }
    return item;
  });

  return {
    uiControl: {
      visible: false,
      showPanel: true,
      expand: '',
    },
    data: {
      cate: <cateModel>mixUiControlAttr(<cate[]>data.data.cate, {expandCateId: [], code: 'cid'}),
      crumb: <crumbItemModel[]>data.data.crumb,
      others: <filterItemModel[]>others.map(mixUiControlAttr),
      request: <requestInfoModel>data.data.request,
    },
    externalCallback: externalCallback,
  }
}



// 更新筛选项的中间件
export const updateFilterMiddleware = (dispatch: any, data: filterRequestModel, externalCallback: externalCallbackModel) => {
    return dispatch( actionUpdateFilter( dataTransform(data, externalCallback) ));
}

/// <reference path="declare/index.d.ts" />
// import * as MockData from './MockData.ts';
// import dataTransform from './component/commonFilter/dataTransform';
// export const extendApi = (extendAction: string, data: any, action: any) => dispatch => {
//     let result;
//     if (data.code == 'cid' && data.value == '3') {
//         result = MockData.cid_3;
//     } else if (data.code == 'color' && data.value == '6') {
//         result = MockData.color_6;
//     }
//     else {
//         result = MockData.all;
//     }
    
//     dispatch(
//         action( dataTransform(result, extendApi) )
//     );
// }
// import dataTransform from './component/commonFilter/dataTransform';



// const assign = (...args) => _.assign.apply(_, args);

