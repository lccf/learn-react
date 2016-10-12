/// <reference path="../declare/index.d.ts" />
import Ndoo from '../library/ndoo_ts';

@Ndoo.Component('common.util', Ndoo.RegType.Service, true)
export default class Util {
  /**
   * 格式化url参数
   */
  static formatUrlParam(url: string = ''): {[key: string]: string | string[]} {
    let paramObject: any = {}
    let urlParam: string[];
    url = url.replace(/^\?/, '');
    if (url && url.length > 1) {
      urlParam = url.split('&');
    } else {
      urlParam = [];
    }
    for (let item of urlParam) {
      let [key, value] = item.split('=');
      if (!key) continue;
      key = key.replace(/\[\]$/, '');
      if (value) {
        value = value.replace(/%u\w{4}/g, (char) => unescape(char));
        value = decodeURIComponent(value);
      }
      else {
        value = '';
      }
      if (_.has(paramObject, key)) {
        if (!_.isArray(paramObject[key])) {
          paramObject[key] = [paramObject[key]];
        }
        paramObject[key].push(value);
      }
      else {
        paramObject[key] = value;
      }
    }
    return paramObject;
  }

  static externalCallback(dataLabel: string, externalAction: string, data: any, action: any) {
    return (dispatch: Function) => {
      dispatch(action);
    }
  }
}