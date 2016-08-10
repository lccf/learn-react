/**
 * @namespace
 */
var fastUtil = (function () {
  /**
   * 插入script文件
   * @param url {string}
   * @param pos {string}[head|body]
   */
  var insertScriptTag = function (url, pos) {
    pos = pos || 'body'
    var _insert = function (url, pos) {
      var elem, script = document.createElement('script');

      if (pos == 'body') {
        elem = document.body;
      }
      else if (pos == 'head') {
        elem = document.documentElement.childNodes[0];
      }
      else if (typeof pos == 'object' && pos.appendChild) {
        elem = pos;
      }

      elem.appendChild(script);
      script.setAttribute('src', url);

      script = null;
    }

    url = [].concat(url);

    for(var i=0; i < url.length; i++) {
      try {
        _insert(url[i], pos);
      }
      catch (e) { }
    }
  }

  /**
   * 设置load后的回调函数
   * @param {function}
   */
  var setLoadCallback = (function() {
    var _calls = [];
    var _load = false;

    var _run = function (_funcs) {
      for(var i=0, j=_funcs.length; i<j; i++) {
        try {
          _funcs[i]();
        }
        catch(e) {
          console.error(e);
        }
      }

    }

    var _loadCall = function () {
      _load = true;
      _run(_calls);
      _calls = [];
    };

    if (window.addEventListener) {
      window.addEventListener('load', _loadCall);
    }
    else if (window.attachEvent) {
      window.attachEvent('onload', _loadCall);
    }

    return function (funcs) {
      if (!_load) {
        if (typeof funcs == 'function') {
          _calls = _calls.concat(funcs);
        }
      }
      else {
        _run([].concat(funcs));
      }
    }
  })();

  /**
   * 添加延迟加载脚本
   * @param url {string}
   */
  var setLazyScript = function (url) {
    if (typeof url == 'string' && url.length > 0) {
      setLoadCallback(function () {
        insertScriptTag(url);
      });
    }
  }

/**
 * Hilo
 * Copyright 2015 alibaba.com
 * Licensed under the MIT License
 */ 

/**
 * 创建类示例：
 * <pre>
 * var Bird = Hilo.Class.create({
 *     Extends: Animal,
 *     Mixes: EventMixin,
 *     constructor: function(name){
 *         this.name = name;
 *     },
 *     fly: function(){
 *         console.log('I am flying');
 *     },
 *     Statics: {
 *         isBird: function(bird){
 *             return bird instanceof Bird;
 *         }
 *     }
 * });
 *
 * var swallow = new Bird('swallow');
 * swallow.fly();
 * Bird.isBird(swallow);
 * </pre>
 * @namespace Class是提供类的创建的辅助工具。
 * @static
 * @module hilo/core/Class
 */
var Class = (function(){
  /**
   * 根据参数指定的属性和方法创建类。
   * @param {Object} properties 要创建的类的相关属性和方法。主要有：
   * <ul>
   * <li><b>Extends</b> - 指定要继承的父类。</li>
   * <li><b>Mixes</b> - 指定要混入的成员集合对象。</li>
   * <li><b>Statics</b> - 指定类的静态属性或方法。</li>
   * <li><b>constructor</b> - 指定类的构造函数。</li>
   * <li>其他创建类的成员属性或方法。</li>
   * </ul>
   * @returns {Object} 创建的类。
   */
  var create = function(properties){
      properties = properties || {};
      var clazz = properties.hasOwnProperty('constructor') ? properties.constructor : function(){};
      implement.call(clazz, properties);
      return clazz;
  }

  /**
   * @private
   */
  var implement = function(properties){
      var proto = {}, key, value;
      for(key in properties){
          value = properties[key];
          if(classMutators.hasOwnProperty(key)){
              classMutators[key].call(this, value);
          }else{
              proto[key] = value;
          }
      }

      mix(this.prototype, proto);
  };

  var classMutators = /** @ignore */{
      Extends: function(parent){
          var existed = this.prototype, proto = createProto(parent.prototype);
          //inherit static properites
          mix(this, parent);
          //keep existed properties
          mix(proto, existed);
          //correct constructor
          proto.constructor = this;
          //prototype chaining
          this.prototype = proto;
          //shortcut to parent's prototype
          this.superclass = parent.prototype;
      },

      Mixes: function(items){
          items instanceof Array || (items = [items]);
          var proto = this.prototype, item;

          while(item = items.shift()){
              mix(proto, item.prototype || item);
          }
      },

      Statics: function(properties){
          mix(this, properties);
      }
  };

  /**
   * @private
   */
  var createProto = (function(){
      if(Object.__proto__){
          return function(proto){
              return {__proto__: proto};
          }
      }else{
          var Ctor = function(){};
          return function(proto){
              Ctor.prototype = proto;
              return new Ctor();
          }
      }
  })();

  /**
   * 混入属性或方法。
   * @param {Object} target 混入目标对象。
   * @param {Object} source 要混入的属性和方法来源。可支持多个来源参数。
   * @returns {Object} 混入目标对象。
   */
  var mix = function(target){
      for(var i = 1, len = arguments.length; i < len; i++){
          var source  = arguments[i], defineProps;
          for(var key in source){
              var prop = source[key];
              if(prop && typeof prop === 'object'){
                  if(prop.value !== undefined || typeof prop.get === 'function' || typeof prop.set === 'function'){
                      defineProps = defineProps || {};
                      defineProps[key] = prop;
                      continue;
                  }
              }
              target[key] = prop;
          }
          if(defineProps) defineProperties(target, defineProps);
      }

      return target;
  };

  try{
      var defineProperty = Object.defineProperty,
          defineProperties = Object.defineProperties;
      defineProperty({}, '$', {value:0});
  }catch(e){
      if('__defineGetter__' in Object){
          defineProperty = function(obj, prop, desc){
              if('value' in desc) obj[prop] = desc.value;
              if('get' in desc) obj.__defineGetter__(prop, desc.get);
              if('set' in desc) obj.__defineSetter__(prop, desc.set);
              return obj;
          };
          defineProperties = function(obj, props){
              for(var prop in props){
                  if(props.hasOwnProperty(prop)){
                      defineProperty(obj, prop, props[prop]);
                  }
              }
              return obj;
          };
      }
  }

  return {create:create, mix:mix};

  })();

  /**
   * Hilo
   * Copyright 2015 alibaba.com
   * Licensed under the MIT License
   */

  /**
   * @class EventMixin是一个包含事件相关功能的mixin。可以通过 Class.mix(target, EventMixin) 来为target增加事件功能。
   * @mixin
   * @static
   * @module hilo/event/EventMixin
   * @requires hilo/core/Class
   */
  var EventMixin = {
      _listeners: null,

      /**
       * 增加一个事件监听。
       * @param {String} type 要监听的事件类型。
       * @param {Function} listener 事件监听回调函数。
       * @param {Boolean} once 是否是一次性监听，即回调函数响应一次后即删除，不再响应。
       * @returns {Object} 对象本身。链式调用支持。
       */
      on: function(type, listener, once){
          var listeners = (this._listeners = this._listeners || {});
          var eventListeners = (listeners[type] = listeners[type] || []);
          for(var i = 0, len = eventListeners.length; i < len; i++){
              var el = eventListeners[i];
              if(el.listener === listener) return;
          }
          eventListeners.push({listener:listener, once:once});
          return this;
      },

      /**
       * 删除一个事件监听。如果不传入任何参数，则删除所有的事件监听；如果不传入第二个参数，则删除指定类型的所有事件监听。
       * @param {String} type 要删除监听的事件类型。
       * @param {Function} listener 要删除监听的回调函数。
       * @returns {Object} 对象本身。链式调用支持。
       */
      off: function(type, listener){
          //remove all event listeners
          if(arguments.length == 0){
              this._listeners = null;
              return this;
          }

          var eventListeners = this._listeners && this._listeners[type];
          if(eventListeners){
              //remove event listeners by specified type
              if(arguments.length == 1){
                  delete this._listeners[type];
                  return this;
              }

              for(var i = 0, len = eventListeners.length; i < len; i++){
                  var el = eventListeners[i];
                  if(el.listener === listener){
                      eventListeners.splice(i, 1);
                      if(eventListeners.length === 0) delete this._listeners[type];
                      break;
                  }
              }
          }
          return this;
      },

      /**
       * 发送事件。当第一个参数类型为Object时，则把它作为一个整体事件对象。
       * @param {String} type 要发送的事件类型。
       * @param {Object} detail 要发送的事件的具体信息，即事件随带参数。
       * @returns {Boolean} 是否成功调度事件。
       */
      fire: function(type, detail){
          var event, eventType;
          if(typeof type === 'string'){
              eventType = type;
          }else{
              event = type;
              eventType = type.type;
          }

          var listeners = this._listeners;
          if(!listeners) return false;

          var eventListeners = listeners[eventType];
          if(eventListeners){
              eventListeners = eventListeners.slice(0);
              event = event || new EventObject(eventType, this, detail);
              if(event._stopped) return false;

              for(var i = 0; i < eventListeners.length; i++){
                  var el = eventListeners[i];
                  el.listener.call(this, event);
                  if(el.once) eventListeners.splice(i--, 1);
              }

              if(eventListeners.length == 0) delete listeners[eventType];
              return true;
          }
          return false;
      }
  };

  /**
   * 事件对象类。当前仅为内部类，以后有需求的话可能会考虑独立为公开类。
   */
  var EventObject = Class.create({
      constructor: function EventObject(type, target, detail){
          this.type = type;
          this.target = target;
          this.detail = detail;
          this.timeStamp = +new Date();
      },

      type: null,
      target: null,
      detail: null,
      timeStamp: 0,

      stopImmediatePropagation: function(){
          this._stopped = true;
      }
  });

  //Trick: `stopImmediatePropagation` compatibility
  var RawEvent = window.Event;
  if(RawEvent){
      var proto = RawEvent.prototype,
          stop = proto.stopImmediatePropagation;
      proto.stopImmediatePropagation = function(){
          stop && stop.call(this);
          this._stopped = true;
      }
  }

  /**
   * 事件调度对象
   */
  var dispatch = {
    trigger: function (type, detail) {
      return this.fire(type, detail);
      // this.fire.apply(this, [].call.slice(arguments, 0));
    },
    once: function (type, listener) {
      return this.on(type, listener, true);
    }
  }
  dispatch = Class.mix(dispatch, EventMixin);

  /**
   * 根据detail object换取done
   */
  var getDone = function (e) {
    var ret;
    if (e && e.detail) {
      ret = function () {
        setTimeout(function () {
          e.detail(e.type);
        }, 50);
      }
    }
    else {
      ret = new Function();
    }
    return ret;
  }
  var extend = function() {
      return Object.assign.apply(Object, [].slice.call(arguments, 0));
  }

  var fastUtil = {
    Class: Class,
    EventMixin: EventMixin,
    dispatch: dispatch,
    insertScriptTag: insertScriptTag,
    setLoadCallback: setLoadCallback,
    getDone: getDone,
    component: {},
    extend: extend,
  }

  return fastUtil;
})();

/**
 * @namespace
 */
var BGSite = fastUtil;