interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

interface BGSiteConstructor {
  component: any;
}

declare var BGSite: BGSiteConstructor