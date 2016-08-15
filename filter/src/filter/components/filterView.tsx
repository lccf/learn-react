/// <reference path="../declare.d.ts" />

// import library
import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
// import model
import { filterItemModel, requestInfoModel, externalCallbackModel, commonProps } from '../model';
// import action
import { actionShowFilter, actionUpdateFilter, ACTION_UPDATE_FILTER } from '../actions';
// import middleware
import { updateFilterMiddleware } from '../util';

interface FilterViewProps extends commonProps {
  filterItems: filterItemModel[],
  request: requestInfoModel,
}

class FilterView extends React.Component<FilterViewProps, any> {
  constructor(props) {
    super(props);
  }
  
  renderFilterItem(filterItem: filterItemModel): JSX.Element {
    const { dispatch, request, externalCallback } = this.props;
    
    let itemData = filterItem.data;
    let values: Array<any> = [];
    let selected = '';
    let selectedName = '';
    if (request[itemData.code] != 'a') {
      selected = request[itemData.code];
    }
    for (let value of itemData.value) {
      if (value) {
        if (values.length < 6) {
          values.push(value);
        }
        if (value.code == selected) {
          selectedName = value.name;
        }
      }
      if (values.length >= 6 && selectedName) break;
    }

    return (
      <li key={ itemData.code }>
        <h5 className={ itemData.code } onClick={ () => dispatch(actionShowFilter(itemData.code)) }>
          { itemData.name }&nbsp;<i className="wap_icon_forward"></i>
          <label className="itemSelected">{ selectedName }</label>
          <em>全部</em>
        </h5>
        <dl>
          <dt type="clear" name="brand" style={ {display: "none"} }>全部</dt>
          {
            values.map((item) => <dt key={ item.code } className={ (selected && selected == item.code) ? 'itemSelected' : null }
              onClick={ () => dispatch( externalCallback( ACTION_UPDATE_FILTER, {code: itemData.code, value: item.code}, updateFilterMiddleware) ) }
              type={ item.code } name={ itemData.name }>{ item.name }</dt>)
          }
        </dl>
      </li>
    );
  }

  render(): JSX.Element {
    const filterItems = this.props.filterItems;
    return (
      <div className="filter_item filterItem flex-item-1 filter_view">
        <ul>
          { filterItems.map((item) => this.renderFilterItem(item) ) }
        </ul>
      </div>
    );
  }
}

export default FilterView;