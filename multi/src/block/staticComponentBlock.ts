import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import * as Ndoo from 'ndoojs';
import use from '../library/use';

import ComponentService from '../service/componentService';
use(ComponentService);

let ndoo = Ndoo;

@Ndoo.Component('block.staticComponentBlock', Ndoo.RegType.Block, true)
export default class StaticComponentBlock {
  static init(elem: HTMLElement, param: string) {
    let componentService = Ndoo.service<ComponentService>('common.componentService');
    componentService.initComponent(elem);
  }
}