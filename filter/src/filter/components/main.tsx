/// <reference path="../declare.d.ts" />
/* --------------------------------------------------
 *   FileName: index.tsx
 *       Desc: 共用筛选组件
 *     Author: leaf
 *      Email: chenglifu@metersbonwe.com
 *    Version: 1.0.0
 * LastChange: 2016/07/05 15:56
 * --------------------------------------------------
 */
// import library
import * as React from 'react';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
import { Action } from 'redux-actions';
// import { IDispatch } from 'redux-thunk';

// import component
import CatePanel from './catePanel';
import FilterView from './filterView';
import FilterPanel from './filterPanel';
// import actions
import {
  actionHidePanel,
  actionShowCate,
  actionReset,
  actionOk,
  actionUpdateFilter,
  ACTION_SHOW_CATE,
  ACTION_OK,
  ACTION_RESET } from '../actions';
// import model
import { cateModel, filterItemModel, requestInfoModel, crumbItemModel, uiControlModel, reducerDataModel, externalCallbackModel, commonProps } from '../model';
// import middleware
import { updateFilterMiddleware } from '../util';

const blockStyle = {
  display: 'block'
};

interface CommonFilterProps extends commonProps {
  visible: boolean,
  uiControl: uiControlModel,
  data: reducerDataModel,
}

class CommonFilter extends React.Component<CommonFilterProps, any> {
  constructor(props) {
    super(props);
  }
  // 根据选择
  getSelectedCateName (selected, cate):string[] {
    let currCateId = selected[0];
    let result = [];
    let currCate;
    for (let item of cate) {
      if (item.cateId == currCateId) {
        currCate = item;
        
        break;
      }
    }
    if (currCate) {
      result.push(currCate.cateName);
      if (selected.length > 1 && currCate.subs.length) {
        result = result.concat(this.getSelectedCateName(selected.slice(1), currCate.subs));
      }
    }
    return result;
  }

  render(): JSX.Element {
    const { 
      uiControl: {visible, showPanel, expand},
      data: {cate, crumb, others, request},
      externalCallback, dispatch
    } = this.props;

    let filterItem;
    if (expand) {
      filterItem = others.filter( other => other.data.code == expand)[0];
    }
    let selectedCateName = "";
    // if (cate.selected.length >= 1 && visible) {
    //   selectedCateName = cate.selected.map( (item) => this.getSelectedCateName(item.toString().split(','), cate.data).join('/')).join(',');
    // }
    if (crumb.length > 1) {
      selectedCateName = crumb.slice(1).map( (item) => item.catName ).join('/');
    }

    let showCate = false;
    if (cate.data && cate.data.length) {
      showCate = true;
    }

    return (
      <div className="banggo_wap_floopy_box banggoWapFloopyBox" style={ {display: visible ? 'block' : 'none'} } onClick={ () => dispatch(actionHidePanel()) }>
        <section id="filterPanel" className="imgLazyload" onClick={ (e) => e.stopPropagation() }>
          <CatePanel cate={ cate } dispatch={ dispatch } externalCallback={ externalCallback } crumb={ crumb } />
          <FilterPanel filterItem={ filterItem } dispatch={ dispatch } externalCallback={ externalCallback } request={ request } />
          <div className="filter_wrap" id="filter1" style={ {display: showPanel? "block": "none"} }>
            <div className="filter_content filterContent flex-box flex-box-vertical">
              <div className="filter_header2 filterHeader2 flex-box" style={ {display: "none"} }>
                <span style={ {marginLeft: "0.75rem"} }>清除</span>
                <i className="flex-item-1" style={ {textAlign: "center"} }>筛选</i>
                <em style={ {marginRight: "0.75rem"} }>确认</em>
              </div>
              <p style={ {marginTop: "0.5rem", marginBottom: "0.5rem", display: (showCate ? 'block':'none')} } onClick={ () => dispatch( externalCallback(ACTION_SHOW_CATE, {}, actionShowCate(showCate)) ) }>
                分类<label id="category">{ selectedCateName }</label>
                <i className="wap_icon_forward"></i>
                <em>全部</em>
              </p>
              <FilterView dispatch={ dispatch } request={ request } filterItems={ others } externalCallback={ externalCallback } />
              <div className="btn_area btnArea flex-box">
                <div className="flex-item-1 reset" onClick={ () => dispatch( externalCallback(ACTION_RESET,'', updateFilterMiddleware) ) }>重置</div>
                <div className="flex-item-1 ok" onClick={ () => dispatch( externalCallback(ACTION_OK, {}, actionHidePanel())) }>确认</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(state => state)(CommonFilter);