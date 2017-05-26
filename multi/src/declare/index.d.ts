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

declare var BGSite: BGSiteConstructor;

declare var REDUX_DEBUG: boolean;
declare var REDUX_LOGGER: boolean;