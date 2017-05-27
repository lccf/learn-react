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

interface SystemConstructor {
  import: <T>(module: string) => Promise<T>;
}
declare var System: SystemConstructor;

declare var REDUX_DEBUG: boolean;
declare var REDUX_LOGGER: boolean;