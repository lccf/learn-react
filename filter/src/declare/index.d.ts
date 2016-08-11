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


interface BGSiteConstructor {
  component: any;
}

declare var BGSite: BGSiteConstructor