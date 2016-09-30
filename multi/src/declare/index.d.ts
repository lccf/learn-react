/// <reference path="../../typings/index.d.ts" />
/// <reference path="./ndoo.d.ts" />

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