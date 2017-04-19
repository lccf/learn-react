// import library
import * as React from 'react';
import { connect } from 'react-redux';
// import model
import { cate, cateModel, filterRequestModel, crumbItemModel, externalCallbackModel, commonProps } from '../model';
// import action
import { actionHideCate, actionExpandCate, actionTest, actionUpdateFilter, ACTION_UPDATE_FILTER } from '../actions';
// import middleware
import { updateFilterMiddleware } from '../util';

interface CatePanelProps extends commonProps {
    cate: cateModel,
    crumb: crumbItemModel[],
}

class CatePanel extends React.Component<CatePanelProps, any> {
    init = false;

    constructor(props: any) {
        super(props)
    }

    renderSubCate(data: cate[], expandCateId, ownerId) {
        const { dispatch, externalCallback, crumb } = this.props;
        let { selected, code } = this.props.cate;
        let selectedItemId = [];
        if (crumb.length >= 4) {
            selectedItemId.push(crumb[3].catId);
        }
        // let selectedItemId = selected.map( item => {
        //     let ids = item.split(',');
        //     // @TODO 硬编码，需优化
        //     if (ids.length >= 2) {
        //         return ids[2];
        //     }
        // })
        return data.map((item) => {
            let subItem;
            let showAll = 'none';
            let showElem = 'none';
            if (expandCateId.length) {
                for(let cateId of expandCateId) {
                    if (cateId == item.parentId) {
                        showAll = 'block';
                    }
                    if (cateId == item.cateId) {
                        showElem = 'block';
                    }
                }
            }
            if (item.subs.length) {
                subItem = item.subs.map((sub) => (
                    <li key={ sub.cateId } style={ {display: showElem} }
                    onClick={ ()=> { dispatch( externalCallback(ACTION_UPDATE_FILTER, {code: code, value: sub.cateId}, updateFilterMiddleware) ) } }
                    className={ selectedItemId.filter(cateId => cateId == sub.cateId.toString()).length ? 'itemSelected' : null }
                    >
                    { sub.cateName }<span data-bid={ sub.cateId }></span></li>)
                )
            }
            return (
                [<li  key={ item.cateId } style={ {display: showAll} }>
                    <h5 style={ {position: "relative"} } name="cid" 
                        onClick={ () => dispatch(actionExpandCate(item.cateId.toString(), item.level)) }
                        className={ showElem == 'block' ? 'dt_open' : null }>
                        { item.cateName }
                    </h5>
                </li>, <li className="sub_cate" style={{display: showElem}}>
                    <ul>
                    
                    <li key={ item.cateId + '_all' } className="toEnd level2" onClick={ () => dispatch( externalCallback(ACTION_UPDATE_FILTER, {code: code, value: item.cateId}, updateFilterMiddleware) ) }>全部</li>
                    { subItem }
                    </ul>
                </li>])
        });
    }

    render() {
        const {dispatch, externalCallback } = this.props;
        const { visible, selected, selectLimit, data, expandCateId, code } = this.props.cate;
        if (!this.init && visible) {
            this.init = true;
        }
        let filterElem;
        if (this.init) {
            filterElem = data.map( item => {
                let subItem;
                if (item.subs.length) {
                    subItem = this.renderSubCate(item.subs, expandCateId, item.cateId);
                }
                let showAll = expandCateId.length &&　expandCateId.filter( cateId => cateId == item.cateId.toString()).length ? 'block' : 'none';
                return ([<li style={ {display: "block"} } key={ item.cateId }>
                    <h5
                        style={ {position: "relative"} }
                        onClick={ () => dispatch(actionExpandCate(item.cateId.toString(), item.level)) }
                        className={ showAll == 'block' ? 'dt_open': null}
                    >{ item.cateName }</h5>
                </li>, <li className="sub_cate" style={ {display: showAll} }><ul>
                    
                    <li key={item.cateId + '_all'} className="toEnd" style={ {display: showAll} } 
                        onClick={ () => dispatch( externalCallback(ACTION_UPDATE_FILTER, {code: code, value: item.cateId}, updateFilterMiddleware) ) }>全部</li>
                    { subItem }
                    </ul></li>])
            } )
        }
        else {
            filterElem = <li />
        }
        return (
            <div className="filter_wrap" id="filter2" style={ {display: (visible? "block": "none")} }>
                <div className="filter_content filterContent flex-box flex-box-vertical">
                <div className="filter_header filterHeader ">
                    <i className="wap_icon_back" onClick={ ()=> dispatch(actionHideCate("hide")) }></i>全部分类
                </div>
                <div className="filter_item filterItem flex-item-1">
                    <ul className="filter_cate">
                        <li style={ {display: 'none'} }>
                            <h5 id="cateAll">全部 <i></i></h5>
                        </li>
                        { filterElem }
                    </ul>
                </div>
                </div>
            </div>
        );
    }
}

export default CatePanel;