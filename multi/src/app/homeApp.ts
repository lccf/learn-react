import * as ndoo from 'ndoojs';

let { RegType, Component } = ndoo;

@Component('home', RegType.App, false)
export default class HomeApp {
  public indexAction(rawParam?: string) {
    console.log('app: home, action: index');
  }
}