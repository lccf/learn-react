import * as Ndoo from 'ndoojs';
import use from '../library/use';


import ReduxService from '../service/reduxService';
import Util from '../service/utilService';
use(ReduxService, Util);

import * as Component from '../component';

let ndoo = Ndoo;

@Ndoo.Component('block.dynamicComponentBlock', Ndoo.RegType.Block, true)
export default class DynamicComponentBlock {
  static init(elem: HTMLElement, rawParam: string) {
    let { componentName, dataLabel } = Util.formatUrlParam(rawParam);
    let label = (<string>dataLabel).replace('[id]', ndoo.getPk());
    let reduxService = ndoo.service<ReduxService>('common.reduxService');
    let store = reduxService.addReducer(label, Component[`${<string>componentName}Reducer`](label));
    if (Component[`${<string>componentName}Saga`]) {
      reduxService.addSaga(Component[`${<string>componentName}Saga`](label));
    }
    Component.render(elem, Component[<string>componentName], store, label);
  }
}