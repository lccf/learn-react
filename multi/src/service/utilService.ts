/// <reference path="../declare/index.d.ts" />
import Ndoo from '../library/ndoo_ts';

@Ndoo.Component('common.util', Ndoo.RegType.Service, true)
export default class Util {
  static formatUrlParam(url: string = ''): any {
    let paramObject = {}
    let urlparam: any;
    url = url.replace(/^\?/, '');
    if (url && url.length > 1) {
      urlparam = url.split('&');
    } else {
      urlparam = [];
    }
    for (let item of urlparam) {
      let [key, value] = item.split('=');
      if (!key) continue;
      key = key.replace(/\[\]$/, '');
      value = value ? value.replace(/%u\w{4}/g, (char) => unescape(char)) : '';
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
}