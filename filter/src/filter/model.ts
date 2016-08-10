/// <reference path="./declare.d.ts" />
import { Action } from 'redux-actions';
export type cate = {
  cateId: number,
  cateName: string,
  count: number,
  level: number,
  parentId: number,
  sort: number,
  subs?: cate[],
}

export type cateModel = {
  visible: boolean,
  selected: string[],
  selectLimit: number,
  expandCateId: string[],
  code: string,
  data: cate[],
}

export type filterItem = {
  code: string,
  name: string,
  count?: number,
  first_letter?: string,
  sortIndex?: number,
}

export type filterItemGroup = {
  code: string | number,
  name?: string,
  value: filterItem[],
  max?: string,
  min?: string,
}
// export type filterItemGroup = any;

export type filterItemModel = {
  visible: boolean,
  selected: string[],
  selectLimit: number,
  data: filterItemGroup
}
export type requestInfoModel = {
  brand: string,
  cid: string,
  color: string,
  controller: string,
  discount: string,
  discountRate: string,
  isqf: number,
  list: string,
  price: string,
  promotionId: string,
  size: string,
  sortField: string,
  sortType: string,
  stock: string,
  suffix: string,
  tcode: string,
  ts: string,
  word: string,
}
// 已选分类数据
export type crumbItemModel = {
  catId: string,
  catName: string,
  level: number,
  parentId: number|string,
}
// 原始数据模型
export type filterRequestModel = {
  code: number,
  data: {
    bd: string,
    brandCate: string,
    cName: string,
    catName: string,
    cate: cate[],
    crumb: crumbItemModel[],
    level: number,
    others: filterItemGroup[],
    parent_id: number,
    randCate: number,
    request: requestInfoModel,
    searchId: string,
  }
  msg: string,
}
export type updateFilterMiddlewareModel = (dispatch: any, data: filterRequestModel, externalCallback: externalCallbackModel) => any;
// 外部扩展api 模型
export type externalCallbackModel = (extendAction: string, data: any, action: Action | updateFilterMiddlewareModel) => any;

export type uiControlModel = {
  visible: boolean,
  showPanel: boolean,
  expand: string|number,
}
export type reducerDataModel = {
  cate: cateModel,
  crumb: crumbItemModel[],
  others: filterItemModel[],
  request: requestInfoModel,
}

// reducer Model
export type reducerModel = {
  uiControl: uiControlModel,
  data: reducerDataModel,
  externalCallback: externalCallbackModel,
}
export interface commonProps {
  externalCallback: externalCallbackModel,
  dispatch: (any) => any,
}