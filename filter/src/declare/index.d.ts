/// <reference path="../../typings/index.d.ts" />

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

// declare module "BGSite" {
//   type main = {
//     component: any;
//     dispatch: {
//       on: () => void;
//       trigger: () => void;
//     }
//   }
//   export = main;
// }

declare module "BGSite" {
  const component: any;
  namespace dispatch {
    function on(type: string, listener: any, once?: boolean): void;
    function once(type: string, listener: any): void;
    function trigger(type: string, detail: any): boolean;
  }
  function extend(target: any, ...sources: any[]): any;
}