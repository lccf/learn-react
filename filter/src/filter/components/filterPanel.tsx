/// <reference path="../declare.d.ts" />
import * as React from 'react';
import { actionHideFilter, actionUpdateFilter, ACTION_UPDATE_FILTER, ACTION_CLEAR_FILTER } from '../actions';
import { filterItemModel, requestInfoModel, externalCallbackModel, commonProps } from '../model';
// import middleware
import { updateFilterMiddleware } from '../util';

interface FilterPanelProps extends commonProps {
  filterItem: filterItemModel,
  request: requestInfoModel,
}

class FilterPanel extends React.Component<FilterPanelProps, any> {
  render(): JSX.Element {
    const { dispatch, externalCallback, filterItem, request } = this.props;
    let result;
    if (filterItem) {
      let filterData = filterItem.data;
      let selected = '';
      if (request[filterData.code] != 'a') {
        selected = request[filterData.code];
      }
      // @TODO type clear为硬编码
      result = <div className="filterPannel3 filter_pannel_3 flex-box flex-box-vertical" onClick={ (e) => e.stopPropagation() }>
        <h5><i className="wap_icon_back" onClick={() => dispatch(actionHideFilter(filterData.code)) }></i>全部{ filterData.name }</h5>
        <dl className="flex-item-1">
          <dt style={ { display: "none" } } onClick={ () => dispatch(externalCallback(ACTION_CLEAR_FILTER, {code: filterData.code, value: ''}, updateFilterMiddleware)) }>全部</dt>
          {
            filterData.value.map((item) => {
              return (<dt key={ item.code } className={ (selected && selected == item.code) ? 'itemSelected' : null }
               onClick={() => dispatch(externalCallback(ACTION_UPDATE_FILTER, {code: filterData.code, value: item.code}, updateFilterMiddleware)) }>{ item.name }</dt>)
            })
          }
        </dl>
      </div>
    }
    else {
      result = <div className="filterPannel3 filter_pannel_3 flex-box flex-box-vertical" style={ { display: "none" } }></div>
    }

    return result;
  }
}

export default FilterPanel;