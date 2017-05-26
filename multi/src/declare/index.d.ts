/**
 * unescape string
 */
declare function unescape(escapeString: string): string;

/**
 * Object.assign
 */
interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

/**
 * BGSite
 */
interface BGSiteConstructor {
  component: any;
}

declare var BGSite: BGSiteConstructor

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;