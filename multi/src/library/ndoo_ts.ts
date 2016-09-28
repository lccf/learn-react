/// <reference path="../declare/index.d.ts" />
/**
 * --------------------------------------------------
 *   FileName: ndoo_ts.js
 *       Desc: ndoo代码的ts支持模块，从ts编译
 *     Author: chenglifu 
 *      Email: chenglfiu@metersbonwe.com
 *    Version: 1.0
 * LastChange: 2016-09-22
 *    History: -
 * --------------------------------------------------
 */

namespace Ndoo {
  export enum RegType {
    App,
    Block,
    Service
  }

  /**
   * ndoo组件注册
   */
  export const Component = (path: string, type: RegType, isStatic = false) => (component: any) => {
    // 是否静态类型
    let instance = component;
    if (!isStatic) {
      instance = new component();
    }
    // 注册类型
    let method = '';
    switch(type) {
      case RegType.App:
        method = 'app';
        break;
      case RegType.Block:
        method = 'block';
        break;
      case RegType.Service:
        method = 'service';
        break;
    }
    // 注册
    method && ndoo[method](path, instance);
  }
}

export default Ndoo;