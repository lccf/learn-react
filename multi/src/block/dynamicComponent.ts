/// <reference path="../declare/index.d.ts" />
import Ndoo from '../library/ndoo_ts';
import use from '../library/use';

import ReduxService from '../service/reduxService';
import Util from '../service/utilService';
use(ReduxService, Util);

import * as Component from '../component';

@Ndoo.Component('block.dynamicComponent', Ndoo.RegType.Block, true)
export default class DynamicComponent {
  static init(elem: HTMLElement, rawParam: string) {
    let { componentName, dataLabel } = Util.formatUrlParam(rawParam);
    let label = (<string>dataLabel).replace('[id]', ndoo.getPk());
    let reduxService = ndoo.service<ReduxService>('common.reduxService');
    let store = reduxService.addReducer(label, Component[`${<string>componentName}Reducer`](label));
    Component.render(elem, Component[<string>componentName], store, label);
  }
}