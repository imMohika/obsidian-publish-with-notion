var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/bail/index.js
var require_bail = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = bail;
  function bail(err) {
    if (err) {
      throw err;
    }
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS((exports2, module2) => {
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  module2.exports = function isBuffer(obj) {
    return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  };
});

// node_modules/extend/index.js
var require_extend = __commonJS((exports2, module2) => {
  "use strict";
  var hasOwn = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;
  var defineProperty = Object.defineProperty;
  var gOPD = Object.getOwnPropertyDescriptor;
  var isArray = function isArray2(arr) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(arr);
    }
    return toStr.call(arr) === "[object Array]";
  };
  var isPlainObject = function isPlainObject2(obj) {
    if (!obj || toStr.call(obj) !== "[object Object]") {
      return false;
    }
    var hasOwnConstructor = hasOwn.call(obj, "constructor");
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
      return false;
    }
    var key;
    for (key in obj) {
    }
    return typeof key === "undefined" || hasOwn.call(obj, key);
  };
  var setProperty = function setProperty2(target, options) {
    if (defineProperty && options.name === "__proto__") {
      defineProperty(target, options.name, {
        enumerable: true,
        configurable: true,
        value: options.newValue,
        writable: true
      });
    } else {
      target[options.name] = options.newValue;
    }
  };
  var getProperty = function getProperty2(obj, name) {
    if (name === "__proto__") {
      if (!hasOwn.call(obj, name)) {
        return void 0;
      } else if (gOPD) {
        return gOPD(obj, name).value;
      }
    }
    return obj[name];
  };
  module2.exports = function extend() {
    var options, name, src, copy, copyIsArray, clone;
    var target = arguments[0];
    var i = 1;
    var length = arguments.length;
    var deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (target == null || typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    for (; i < length; ++i) {
      options = arguments[i];
      if (options != null) {
        for (name in options) {
          src = getProperty(target, name);
          copy = getProperty(options, name);
          if (target !== copy) {
            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && isArray(src) ? src : [];
              } else {
                clone = src && isPlainObject(src) ? src : {};
              }
              setProperty(target, {name, newValue: extend(deep, clone, copy)});
            } else if (typeof copy !== "undefined") {
              setProperty(target, {name, newValue: copy});
            }
          }
        }
      }
    }
    return target;
  };
});

// node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (value) => {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  };
});

// node_modules/trough/wrap.js
var require_wrap = __commonJS((exports2, module2) => {
  "use strict";
  var slice = [].slice;
  module2.exports = wrap;
  function wrap(fn, callback) {
    var invoked;
    return wrapped;
    function wrapped() {
      var params = slice.call(arguments, 0);
      var callback2 = fn.length > params.length;
      var result;
      if (callback2) {
        params.push(done);
      }
      try {
        result = fn.apply(null, params);
      } catch (error) {
        if (callback2 && invoked) {
          throw error;
        }
        return done(error);
      }
      if (!callback2) {
        if (result && typeof result.then === "function") {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    }
    function done() {
      if (!invoked) {
        invoked = true;
        callback.apply(null, arguments);
      }
    }
    function then(value) {
      done(null, value);
    }
  }
});

// node_modules/trough/index.js
var require_trough = __commonJS((exports2, module2) => {
  "use strict";
  var wrap = require_wrap();
  module2.exports = trough;
  trough.wrap = wrap;
  var slice = [].slice;
  function trough() {
    var fns = [];
    var middleware = {};
    middleware.run = run;
    middleware.use = use;
    return middleware;
    function run() {
      var index = -1;
      var input = slice.call(arguments, 0, -1);
      var done = arguments[arguments.length - 1];
      if (typeof done !== "function") {
        throw new Error("Expected function as last argument, not " + done);
      }
      next.apply(null, [null].concat(input));
      function next(err) {
        var fn = fns[++index];
        var params = slice.call(arguments, 0);
        var values = params.slice(1);
        var length = input.length;
        var pos = -1;
        if (err) {
          done(err);
          return;
        }
        while (++pos < length) {
          if (values[pos] === null || values[pos] === void 0) {
            values[pos] = input[pos];
          }
        }
        input = values;
        if (fn) {
          wrap(fn, next).apply(null, input);
        } else {
          done.apply(null, [null].concat(input));
        }
      }
    }
    function use(fn) {
      if (typeof fn !== "function") {
        throw new Error("Expected `fn` to be a function, not " + fn);
      }
      fns.push(fn);
      return middleware;
    }
  }
});

// node_modules/unist-util-stringify-position/index.js
var require_unist_util_stringify_position = __commonJS((exports2, module2) => {
  "use strict";
  var own = {}.hasOwnProperty;
  module2.exports = stringify;
  function stringify(value) {
    if (!value || typeof value !== "object") {
      return "";
    }
    if (own.call(value, "position") || own.call(value, "type")) {
      return position(value.position);
    }
    if (own.call(value, "start") || own.call(value, "end")) {
      return position(value);
    }
    if (own.call(value, "line") || own.call(value, "column")) {
      return point(value);
    }
    return "";
  }
  function point(point2) {
    if (!point2 || typeof point2 !== "object") {
      point2 = {};
    }
    return index(point2.line) + ":" + index(point2.column);
  }
  function position(pos) {
    if (!pos || typeof pos !== "object") {
      pos = {};
    }
    return point(pos.start) + "-" + point(pos.end);
  }
  function index(value) {
    return value && typeof value === "number" ? value : 1;
  }
});

// node_modules/vfile-message/index.js
var require_vfile_message = __commonJS((exports2, module2) => {
  "use strict";
  var stringify = require_unist_util_stringify_position();
  module2.exports = VMessage;
  function VMessagePrototype() {
  }
  VMessagePrototype.prototype = Error.prototype;
  VMessage.prototype = new VMessagePrototype();
  var proto = VMessage.prototype;
  proto.file = "";
  proto.name = "";
  proto.reason = "";
  proto.message = "";
  proto.stack = "";
  proto.fatal = null;
  proto.column = null;
  proto.line = null;
  function VMessage(reason, position, origin) {
    var parts;
    var range;
    var location;
    if (typeof position === "string") {
      origin = position;
      position = null;
    }
    parts = parseOrigin(origin);
    range = stringify(position) || "1:1";
    location = {
      start: {line: null, column: null},
      end: {line: null, column: null}
    };
    if (position && position.position) {
      position = position.position;
    }
    if (position) {
      if (position.start) {
        location = position;
        position = position.start;
      } else {
        location.start = position;
      }
    }
    if (reason.stack) {
      this.stack = reason.stack;
      reason = reason.message;
    }
    this.message = reason;
    this.name = range;
    this.reason = reason;
    this.line = position ? position.line : null;
    this.column = position ? position.column : null;
    this.location = location;
    this.source = parts[0];
    this.ruleId = parts[1];
  }
  function parseOrigin(origin) {
    var result = [null, null];
    var index;
    if (typeof origin === "string") {
      index = origin.indexOf(":");
      if (index === -1) {
        result[1] = origin;
      } else {
        result[0] = origin.slice(0, index);
        result[1] = origin.slice(index + 1);
      }
    }
    return result;
  }
});

// node_modules/vfile/lib/minpath.js
var require_minpath = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = require("path");
});

// node_modules/vfile/lib/minproc.js
var require_minproc = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = process;
});

// node_modules/vfile/lib/core.js
var require_core = __commonJS((exports2, module2) => {
  "use strict";
  var p = require_minpath();
  var proc = require_minproc();
  var buffer = require_is_buffer();
  module2.exports = VFile;
  var own = {}.hasOwnProperty;
  var order = ["history", "path", "basename", "stem", "extname", "dirname"];
  VFile.prototype.toString = toString;
  Object.defineProperty(VFile.prototype, "path", {get: getPath, set: setPath});
  Object.defineProperty(VFile.prototype, "dirname", {
    get: getDirname,
    set: setDirname
  });
  Object.defineProperty(VFile.prototype, "basename", {
    get: getBasename,
    set: setBasename
  });
  Object.defineProperty(VFile.prototype, "extname", {
    get: getExtname,
    set: setExtname
  });
  Object.defineProperty(VFile.prototype, "stem", {get: getStem, set: setStem});
  function VFile(options) {
    var prop;
    var index;
    if (!options) {
      options = {};
    } else if (typeof options === "string" || buffer(options)) {
      options = {contents: options};
    } else if ("message" in options && "messages" in options) {
      return options;
    }
    if (!(this instanceof VFile)) {
      return new VFile(options);
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = proc.cwd();
    index = -1;
    while (++index < order.length) {
      prop = order[index];
      if (own.call(options, prop)) {
        this[prop] = options[prop];
      }
    }
    for (prop in options) {
      if (order.indexOf(prop) < 0) {
        this[prop] = options[prop];
      }
    }
  }
  function getPath() {
    return this.history[this.history.length - 1];
  }
  function setPath(path) {
    assertNonEmpty(path, "path");
    if (this.path !== path) {
      this.history.push(path);
    }
  }
  function getDirname() {
    return typeof this.path === "string" ? p.dirname(this.path) : void 0;
  }
  function setDirname(dirname) {
    assertPath(this.path, "dirname");
    this.path = p.join(dirname || "", this.basename);
  }
  function getBasename() {
    return typeof this.path === "string" ? p.basename(this.path) : void 0;
  }
  function setBasename(basename) {
    assertNonEmpty(basename, "basename");
    assertPart(basename, "basename");
    this.path = p.join(this.dirname || "", basename);
  }
  function getExtname() {
    return typeof this.path === "string" ? p.extname(this.path) : void 0;
  }
  function setExtname(extname) {
    assertPart(extname, "extname");
    assertPath(this.path, "extname");
    if (extname) {
      if (extname.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname.indexOf(".", 1) > -1) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = p.join(this.dirname, this.stem + (extname || ""));
  }
  function getStem() {
    return typeof this.path === "string" ? p.basename(this.path, this.extname) : void 0;
  }
  function setStem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = p.join(this.dirname || "", stem + (this.extname || ""));
  }
  function toString(encoding) {
    return (this.contents || "").toString(encoding);
  }
  function assertPart(part, name) {
    if (part && part.indexOf(p.sep) > -1) {
      throw new Error("`" + name + "` cannot be a path: did not expect `" + p.sep + "`");
    }
  }
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error("`" + name + "` cannot be empty");
    }
  }
  function assertPath(path, name) {
    if (!path) {
      throw new Error("Setting `" + name + "` requires `path` to be set too");
    }
  }
});

// node_modules/vfile/lib/index.js
var require_lib = __commonJS((exports2, module2) => {
  "use strict";
  var VMessage = require_vfile_message();
  var VFile = require_core();
  module2.exports = VFile;
  VFile.prototype.message = message;
  VFile.prototype.info = info;
  VFile.prototype.fail = fail;
  function message(reason, position, origin) {
    var message2 = new VMessage(reason, position, origin);
    if (this.path) {
      message2.name = this.path + ":" + message2.name;
      message2.file = this.path;
    }
    message2.fatal = false;
    this.messages.push(message2);
    return message2;
  }
  function fail() {
    var message2 = this.message.apply(this, arguments);
    message2.fatal = true;
    throw message2;
  }
  function info() {
    var message2 = this.message.apply(this, arguments);
    message2.fatal = null;
    return message2;
  }
});

// node_modules/vfile/index.js
var require_vfile = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = require_lib();
});

// node_modules/unified/index.js
var require_unified = __commonJS((exports2, module2) => {
  "use strict";
  var bail = require_bail();
  var buffer = require_is_buffer();
  var extend = require_extend();
  var plain = require_is_plain_obj();
  var trough = require_trough();
  var vfile = require_vfile();
  module2.exports = unified().freeze();
  var slice = [].slice;
  var own = {}.hasOwnProperty;
  var pipeline = trough().use(pipelineParse).use(pipelineRun).use(pipelineStringify);
  function pipelineParse(p, ctx) {
    ctx.tree = p.parse(ctx.file);
  }
  function pipelineRun(p, ctx, next) {
    p.run(ctx.tree, ctx.file, done);
    function done(error, tree, file) {
      if (error) {
        next(error);
      } else {
        ctx.tree = tree;
        ctx.file = file;
        next();
      }
    }
  }
  function pipelineStringify(p, ctx) {
    var result = p.stringify(ctx.tree, ctx.file);
    if (result === void 0 || result === null) {
    } else if (typeof result === "string" || buffer(result)) {
      if ("value" in ctx.file) {
        ctx.file.value = result;
      }
      ctx.file.contents = result;
    } else {
      ctx.file.result = result;
    }
  }
  function unified() {
    var attachers = [];
    var transformers = trough();
    var namespace = {};
    var freezeIndex = -1;
    var frozen;
    processor.data = data;
    processor.freeze = freeze;
    processor.attachers = attachers;
    processor.use = use;
    processor.parse = parse;
    processor.stringify = stringify;
    processor.run = run;
    processor.runSync = runSync;
    processor.process = process2;
    processor.processSync = processSync;
    return processor;
    function processor() {
      var destination = unified();
      var index = -1;
      while (++index < attachers.length) {
        destination.use.apply(null, attachers[index]);
      }
      destination.data(extend(true, {}, namespace));
      return destination;
    }
    function freeze() {
      var values;
      var transformer;
      if (frozen) {
        return processor;
      }
      while (++freezeIndex < attachers.length) {
        values = attachers[freezeIndex];
        if (values[1] === false) {
          continue;
        }
        if (values[1] === true) {
          values[1] = void 0;
        }
        transformer = values[0].apply(processor, values.slice(1));
        if (typeof transformer === "function") {
          transformers.use(transformer);
        }
      }
      frozen = true;
      freezeIndex = Infinity;
      return processor;
    }
    function data(key, value) {
      if (typeof key === "string") {
        if (arguments.length === 2) {
          assertUnfrozen("data", frozen);
          namespace[key] = value;
          return processor;
        }
        return own.call(namespace, key) && namespace[key] || null;
      }
      if (key) {
        assertUnfrozen("data", frozen);
        namespace = key;
        return processor;
      }
      return namespace;
    }
    function use(value) {
      var settings;
      assertUnfrozen("use", frozen);
      if (value === null || value === void 0) {
      } else if (typeof value === "function") {
        addPlugin.apply(null, arguments);
      } else if (typeof value === "object") {
        if ("length" in value) {
          addList(value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error("Expected usable value, not `" + value + "`");
      }
      if (settings) {
        namespace.settings = extend(namespace.settings || {}, settings);
      }
      return processor;
      function addPreset(result) {
        addList(result.plugins);
        if (result.settings) {
          settings = extend(settings || {}, result.settings);
        }
      }
      function add(value2) {
        if (typeof value2 === "function") {
          addPlugin(value2);
        } else if (typeof value2 === "object") {
          if ("length" in value2) {
            addPlugin.apply(null, value2);
          } else {
            addPreset(value2);
          }
        } else {
          throw new Error("Expected usable value, not `" + value2 + "`");
        }
      }
      function addList(plugins) {
        var index = -1;
        if (plugins === null || plugins === void 0) {
        } else if (typeof plugins === "object" && "length" in plugins) {
          while (++index < plugins.length) {
            add(plugins[index]);
          }
        } else {
          throw new Error("Expected a list of plugins, not `" + plugins + "`");
        }
      }
      function addPlugin(plugin, value2) {
        var entry = find(plugin);
        if (entry) {
          if (plain(entry[1]) && plain(value2)) {
            value2 = extend(true, entry[1], value2);
          }
          entry[1] = value2;
        } else {
          attachers.push(slice.call(arguments));
        }
      }
    }
    function find(plugin) {
      var index = -1;
      while (++index < attachers.length) {
        if (attachers[index][0] === plugin) {
          return attachers[index];
        }
      }
    }
    function parse(doc) {
      var file = vfile(doc);
      var Parser;
      freeze();
      Parser = processor.Parser;
      assertParser("parse", Parser);
      if (newable(Parser, "parse")) {
        return new Parser(String(file), file).parse();
      }
      return Parser(String(file), file);
    }
    function run(node, file, cb) {
      assertNode(node);
      freeze();
      if (!cb && typeof file === "function") {
        cb = file;
        file = null;
      }
      if (!cb) {
        return new Promise(executor);
      }
      executor(null, cb);
      function executor(resolve, reject) {
        transformers.run(node, vfile(file), done);
        function done(error, tree, file2) {
          tree = tree || node;
          if (error) {
            reject(error);
          } else if (resolve) {
            resolve(tree);
          } else {
            cb(null, tree, file2);
          }
        }
      }
    }
    function runSync(node, file) {
      var result;
      var complete;
      run(node, file, done);
      assertDone("runSync", "run", complete);
      return result;
      function done(error, tree) {
        complete = true;
        result = tree;
        bail(error);
      }
    }
    function stringify(node, doc) {
      var file = vfile(doc);
      var Compiler;
      freeze();
      Compiler = processor.Compiler;
      assertCompiler("stringify", Compiler);
      assertNode(node);
      if (newable(Compiler, "compile")) {
        return new Compiler(node, file).compile();
      }
      return Compiler(node, file);
    }
    function process2(doc, cb) {
      freeze();
      assertParser("process", processor.Parser);
      assertCompiler("process", processor.Compiler);
      if (!cb) {
        return new Promise(executor);
      }
      executor(null, cb);
      function executor(resolve, reject) {
        var file = vfile(doc);
        pipeline.run(processor, {file}, done);
        function done(error) {
          if (error) {
            reject(error);
          } else if (resolve) {
            resolve(file);
          } else {
            cb(null, file);
          }
        }
      }
    }
    function processSync(doc) {
      var file;
      var complete;
      freeze();
      assertParser("processSync", processor.Parser);
      assertCompiler("processSync", processor.Compiler);
      file = vfile(doc);
      process2(file, done);
      assertDone("processSync", "process", complete);
      return file;
      function done(error) {
        complete = true;
        bail(error);
      }
    }
  }
  function newable(value, name) {
    return typeof value === "function" && value.prototype && (keys(value.prototype) || name in value.prototype);
  }
  function keys(value) {
    var key;
    for (key in value) {
      return true;
    }
    return false;
  }
  function assertParser(name, Parser) {
    if (typeof Parser !== "function") {
      throw new Error("Cannot `" + name + "` without `Parser`");
    }
  }
  function assertCompiler(name, Compiler) {
    if (typeof Compiler !== "function") {
      throw new Error("Cannot `" + name + "` without `Compiler`");
    }
  }
  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error("Cannot invoke `" + name + "` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.");
    }
  }
  function assertNode(node) {
    if (!node || typeof node.type !== "string") {
      throw new Error("Expected node, got `" + node + "`");
    }
  }
  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
    }
  }
});

// node_modules/mdast-util-to-string/index.js
var require_mdast_util_to_string = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = toString;
  function toString(node) {
    return node && (node.value || node.alt || node.title || "children" in node && all(node.children) || "length" in node && all(node)) || "";
  }
  function all(values) {
    var result = [];
    var index = -1;
    while (++index < values.length) {
      result[index] = toString(values[index]);
    }
    return result.join("");
  }
});

// node_modules/micromark/dist/constant/assign.js
var require_assign = __commonJS((exports2, module2) => {
  "use strict";
  var assign = Object.assign;
  module2.exports = assign;
});

// node_modules/micromark/dist/constant/has-own-property.js
var require_has_own_property = __commonJS((exports2, module2) => {
  "use strict";
  var own = {}.hasOwnProperty;
  module2.exports = own;
});

// node_modules/micromark/dist/util/normalize-identifier.js
var require_normalize_identifier = __commonJS((exports2, module2) => {
  "use strict";
  function normalizeIdentifier(value) {
    return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  module2.exports = normalizeIdentifier;
});

// node_modules/micromark/dist/constant/from-char-code.js
var require_from_char_code = __commonJS((exports2, module2) => {
  "use strict";
  var fromCharCode = String.fromCharCode;
  module2.exports = fromCharCode;
});

// node_modules/micromark/dist/util/safe-from-int.js
var require_safe_from_int = __commonJS((exports2, module2) => {
  "use strict";
  var fromCharCode = require_from_char_code();
  function safeFromInt(value, base) {
    var code = parseInt(value, base);
    if (code < 9 || code === 11 || code > 13 && code < 32 || code > 126 && code < 160 || code > 55295 && code < 57344 || code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || code > 1114111) {
      return "\uFFFD";
    }
    return fromCharCode(code);
  }
  module2.exports = safeFromInt;
});

// node_modules/micromark/dist/character/markdown-line-ending.js
var require_markdown_line_ending = __commonJS((exports2, module2) => {
  "use strict";
  function markdownLineEnding(code) {
    return code < -2;
  }
  module2.exports = markdownLineEnding;
});

// node_modules/micromark/dist/character/markdown-space.js
var require_markdown_space = __commonJS((exports2, module2) => {
  "use strict";
  function markdownSpace(code) {
    return code === -2 || code === -1 || code === 32;
  }
  module2.exports = markdownSpace;
});

// node_modules/micromark/dist/tokenize/factory-space.js
var require_factory_space = __commonJS((exports2, module2) => {
  "use strict";
  var markdownSpace = require_markdown_space();
  function spaceFactory(effects, ok, type, max) {
    var limit = max ? max - 1 : Infinity;
    var size = 0;
    return start;
    function start(code) {
      if (markdownSpace(code)) {
        effects.enter(type);
        return prefix(code);
      }
      return ok(code);
    }
    function prefix(code) {
      if (markdownSpace(code) && size++ < limit) {
        effects.consume(code);
        return prefix;
      }
      effects.exit(type);
      return ok(code);
    }
  }
  module2.exports = spaceFactory;
});

// node_modules/micromark/dist/initialize/content.js
var require_content = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var markdownLineEnding = require_markdown_line_ending();
  var factorySpace = require_factory_space();
  var tokenize = initializeContent;
  function initializeContent(effects) {
    var contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    var previous;
    return contentStart;
    function afterContentStartConstruct(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, contentStart, "linePrefix");
    }
    function paragraphInitial(code) {
      effects.enter("paragraph");
      return lineStart(code);
    }
    function lineStart(code) {
      var token = effects.enter("chunkText", {
        contentType: "text",
        previous
      });
      if (previous) {
        previous.next = token;
      }
      previous = token;
      return data(code);
    }
    function data(code) {
      if (code === null) {
        effects.exit("chunkText");
        effects.exit("paragraph");
        effects.consume(code);
        return;
      }
      if (markdownLineEnding(code)) {
        effects.consume(code);
        effects.exit("chunkText");
        return lineStart;
      }
      effects.consume(code);
      return data;
    }
  }
  exports2.tokenize = tokenize;
});

// node_modules/micromark/dist/tokenize/partial-blank-line.js
var require_partial_blank_line = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var factorySpace = require_factory_space();
  var partialBlankLine = {
    tokenize: tokenizePartialBlankLine,
    partial: true
  };
  function tokenizePartialBlankLine(effects, ok, nok) {
    return factorySpace(effects, afterWhitespace, "linePrefix");
    function afterWhitespace(code) {
      return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
    }
  }
  module2.exports = partialBlankLine;
});

// node_modules/micromark/dist/initialize/document.js
var require_document = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var markdownLineEnding = require_markdown_line_ending();
  var factorySpace = require_factory_space();
  var partialBlankLine = require_partial_blank_line();
  var tokenize = initializeDocument;
  var containerConstruct = {
    tokenize: tokenizeContainer
  };
  var lazyFlowConstruct = {
    tokenize: tokenizeLazyFlow
  };
  function initializeDocument(effects) {
    var self2 = this;
    var stack = [];
    var continued = 0;
    var inspectConstruct = {
      tokenize: tokenizeInspect,
      partial: true
    };
    var inspectResult;
    var childFlow;
    var childToken;
    return start;
    function start(code) {
      if (continued < stack.length) {
        self2.containerState = stack[continued][1];
        return effects.attempt(stack[continued][0].continuation, documentContinue, documentContinued)(code);
      }
      return documentContinued(code);
    }
    function documentContinue(code) {
      continued++;
      return start(code);
    }
    function documentContinued(code) {
      if (inspectResult && inspectResult.flowContinue) {
        return flowStart(code);
      }
      self2.interrupt = childFlow && childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
      self2.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
    }
    function containerContinue(code) {
      stack.push([self2.currentConstruct, self2.containerState]);
      self2.containerState = void 0;
      return documentContinued(code);
    }
    function flowStart(code) {
      if (code === null) {
        exitContainers(0, true);
        effects.consume(code);
        return;
      }
      childFlow = childFlow || self2.parser.flow(self2.now());
      effects.enter("chunkFlow", {
        contentType: "flow",
        previous: childToken,
        _tokenizer: childFlow
      });
      return flowContinue(code);
    }
    function flowContinue(code) {
      if (code === null) {
        continueFlow(effects.exit("chunkFlow"));
        return flowStart(code);
      }
      if (markdownLineEnding(code)) {
        effects.consume(code);
        continueFlow(effects.exit("chunkFlow"));
        return effects.check(inspectConstruct, documentAfterPeek);
      }
      effects.consume(code);
      return flowContinue;
    }
    function documentAfterPeek(code) {
      exitContainers(inspectResult.continued, inspectResult && inspectResult.flowEnd);
      continued = 0;
      return start(code);
    }
    function continueFlow(token) {
      if (childToken)
        childToken.next = token;
      childToken = token;
      childFlow.lazy = inspectResult && inspectResult.lazy;
      childFlow.defineSkip(token.start);
      childFlow.write(self2.sliceStream(token));
    }
    function exitContainers(size, end) {
      var index = stack.length;
      if (childFlow && end) {
        childFlow.write([null]);
        childToken = childFlow = void 0;
      }
      while (index-- > size) {
        self2.containerState = stack[index][1];
        stack[index][0].exit.call(self2, effects);
      }
      stack.length = size;
    }
    function tokenizeInspect(effects2, ok) {
      var subcontinued = 0;
      inspectResult = {};
      return inspectStart;
      function inspectStart(code) {
        if (subcontinued < stack.length) {
          self2.containerState = stack[subcontinued][1];
          return effects2.attempt(stack[subcontinued][0].continuation, inspectContinue, inspectLess)(code);
        }
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          inspectResult.flowContinue = true;
          return inspectDone(code);
        }
        self2.interrupt = childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
        self2.containerState = {};
        return effects2.attempt(containerConstruct, inspectFlowEnd, inspectDone)(code);
      }
      function inspectContinue(code) {
        subcontinued++;
        return self2.containerState._closeFlow ? inspectFlowEnd(code) : inspectStart(code);
      }
      function inspectLess(code) {
        if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
          self2.containerState = {};
          return effects2.attempt(containerConstruct, inspectFlowEnd, effects2.attempt(lazyFlowConstruct, inspectFlowEnd, effects2.check(partialBlankLine, inspectFlowEnd, inspectLazy)))(code);
        }
        return inspectFlowEnd(code);
      }
      function inspectLazy(code) {
        subcontinued = stack.length;
        inspectResult.lazy = true;
        inspectResult.flowContinue = true;
        return inspectDone(code);
      }
      function inspectFlowEnd(code) {
        inspectResult.flowEnd = true;
        return inspectDone(code);
      }
      function inspectDone(code) {
        inspectResult.continued = subcontinued;
        self2.interrupt = self2.containerState = void 0;
        return ok(code);
      }
    }
  }
  function tokenizeContainer(effects, ok, nok) {
    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
  }
  function tokenizeLazyFlow(effects, ok, nok) {
    return factorySpace(effects, effects.lazy(this.parser.constructs.flow, ok, nok), "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
  }
  exports2.tokenize = tokenize;
});

// node_modules/micromark/dist/util/size-chunks.js
var require_size_chunks = __commonJS((exports2, module2) => {
  "use strict";
  function sizeChunks(chunks) {
    var index = -1;
    var size = 0;
    while (++index < chunks.length) {
      size += typeof chunks[index] === "string" ? chunks[index].length : 1;
    }
    return size;
  }
  module2.exports = sizeChunks;
});

// node_modules/micromark/dist/util/prefix-size.js
var require_prefix_size = __commonJS((exports2, module2) => {
  "use strict";
  var sizeChunks = require_size_chunks();
  function prefixSize(events, type) {
    var tail = events[events.length - 1];
    if (!tail || tail[1].type !== type)
      return 0;
    return sizeChunks(tail[2].sliceStream(tail[1]));
  }
  module2.exports = prefixSize;
});

// node_modules/micromark/dist/constant/splice.js
var require_splice = __commonJS((exports2, module2) => {
  "use strict";
  var splice = [].splice;
  module2.exports = splice;
});

// node_modules/micromark/dist/util/chunked-splice.js
var require_chunked_splice = __commonJS((exports2, module2) => {
  "use strict";
  var splice = require_splice();
  function chunkedSplice(list, start, remove, items) {
    var end = list.length;
    var chunkStart = 0;
    var parameters;
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    if (items.length < 1e4) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      splice.apply(list, parameters);
    } else {
      if (remove)
        splice.apply(list, [start, remove]);
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + 1e4);
        parameters.unshift(start, 0);
        splice.apply(list, parameters);
        chunkStart += 1e4;
        start += 1e4;
      }
    }
  }
  module2.exports = chunkedSplice;
});

// node_modules/micromark/dist/util/shallow.js
var require_shallow = __commonJS((exports2, module2) => {
  "use strict";
  var assign = require_assign();
  function shallow(object) {
    return assign({}, object);
  }
  module2.exports = shallow;
});

// node_modules/micromark/dist/util/subtokenize.js
var require_subtokenize = __commonJS((exports2, module2) => {
  "use strict";
  var assign = require_assign();
  var chunkedSplice = require_chunked_splice();
  var shallow = require_shallow();
  function subtokenize(events) {
    var jumps = {};
    var index = -1;
    var event;
    var lineIndex;
    var otherIndex;
    var otherEvent;
    var parameters;
    var subevents;
    var more;
    while (++index < events.length) {
      while (index in jumps) {
        index = jumps[index];
      }
      event = events[index];
      if (index && event[1].type === "chunkFlow" && events[index - 1][1].type === "listItemPrefix") {
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === "content") {
              break;
            }
            if (subevents[otherIndex][1].type === "chunkText") {
              subevents[otherIndex][1].isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }
      if (event[0] === "enter") {
        if (event[1].contentType) {
          assign(jumps, subcontent(events, index));
          index = jumps[index];
          more = true;
        }
      } else if (event[1]._container || event[1]._movePreviousLineEndings) {
        otherIndex = index;
        lineIndex = void 0;
        while (otherIndex--) {
          otherEvent = events[otherIndex];
          if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
            if (otherEvent[0] === "enter") {
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
              }
              otherEvent[1].type = "lineEnding";
              lineIndex = otherIndex;
            }
          } else {
            break;
          }
        }
        if (lineIndex) {
          event[1].end = shallow(events[lineIndex][1].start);
          parameters = events.slice(lineIndex, index);
          parameters.unshift(event);
          chunkedSplice(events, lineIndex, index - lineIndex + 1, parameters);
        }
      }
    }
    return !more;
  }
  function subcontent(events, eventIndex) {
    var token = events[eventIndex][1];
    var context = events[eventIndex][2];
    var startPosition = eventIndex - 1;
    var startPositions = [];
    var tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
    var childEvents = tokenizer.events;
    var jumps = [];
    var gaps = {};
    var stream;
    var previous;
    var index;
    var entered;
    var end;
    var adjust;
    while (token) {
      while (events[++startPosition][1] !== token) {
      }
      startPositions.push(startPosition);
      if (!token._tokenizer) {
        stream = context.sliceStream(token);
        if (!token.next) {
          stream.push(null);
        }
        if (previous) {
          tokenizer.defineSkip(token.start);
        }
        if (token.isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (token.isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = void 0;
        }
      }
      previous = token;
      token = token.next;
    }
    token = previous;
    index = childEvents.length;
    while (index--) {
      if (childEvents[index][0] === "enter") {
        entered = true;
      } else if (entered && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
        add(childEvents.slice(index + 1, end));
        token._tokenizer = token.next = void 0;
        token = token.previous;
        end = index + 1;
      }
    }
    tokenizer.events = token._tokenizer = token.next = void 0;
    add(childEvents.slice(0, end));
    index = -1;
    adjust = 0;
    while (++index < jumps.length) {
      gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
      adjust += jumps[index][1] - jumps[index][0] - 1;
    }
    return gaps;
    function add(slice) {
      var start = startPositions.pop();
      jumps.unshift([start, start + slice.length - 1]);
      chunkedSplice(events, start, 2, slice);
    }
  }
  module2.exports = subtokenize;
});

// node_modules/micromark/dist/tokenize/content.js
var require_content2 = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var prefixSize = require_prefix_size();
  var subtokenize = require_subtokenize();
  var factorySpace = require_factory_space();
  var content = {
    tokenize: tokenizeContent,
    resolve: resolveContent,
    interruptible: true,
    lazy: true
  };
  var continuationConstruct = {
    tokenize: tokenizeContinuation,
    partial: true
  };
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }
  function tokenizeContent(effects, ok) {
    var previous;
    return start;
    function start(code) {
      effects.enter("content");
      previous = effects.enter("chunkContent", {
        contentType: "content"
      });
      return data(code);
    }
    function data(code) {
      if (code === null) {
        return contentEnd(code);
      }
      if (markdownLineEnding(code)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
      }
      effects.consume(code);
      return data;
    }
    function contentEnd(code) {
      effects.exit("chunkContent");
      effects.exit("content");
      return ok(code);
    }
    function contentContinue(code) {
      effects.consume(code);
      effects.exit("chunkContent");
      previous = previous.next = effects.enter("chunkContent", {
        contentType: "content",
        previous
      });
      return data;
    }
  }
  function tokenizeContinuation(effects, ok, nok) {
    var self2 = this;
    return startLookahead;
    function startLookahead(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, prefixed, "linePrefix");
    }
    function prefixed(code) {
      if (code === null || markdownLineEnding(code)) {
        return nok(code);
      }
      if (self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 || prefixSize(self2.events, "linePrefix") < 4) {
        return effects.interrupt(self2.parser.constructs.flow, nok, ok)(code);
      }
      return ok(code);
    }
  }
  module2.exports = content;
});

// node_modules/micromark/dist/initialize/flow.js
var require_flow = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var content = require_content2();
  var factorySpace = require_factory_space();
  var partialBlankLine = require_partial_blank_line();
  var tokenize = initializeFlow;
  function initializeFlow(effects) {
    var self2 = this;
    var initial = effects.attempt(partialBlankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
    return initial;
    function atBlankEnding(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("lineEndingBlank");
      effects.consume(code);
      effects.exit("lineEndingBlank");
      self2.currentConstruct = void 0;
      return initial;
    }
    function afterConstruct(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      self2.currentConstruct = void 0;
      return initial;
    }
  }
  exports2.tokenize = tokenize;
});

// node_modules/micromark/dist/initialize/text.js
var require_text = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var assign = require_assign();
  var shallow = require_shallow();
  var text = initializeFactory("text");
  var string = initializeFactory("string");
  var resolver = {
    resolveAll: createResolver()
  };
  function initializeFactory(field) {
    return {
      tokenize: initializeText,
      resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
    };
    function initializeText(effects) {
      var self2 = this;
      var constructs = this.parser.constructs[field];
      var text2 = effects.attempt(constructs, start, notText);
      return start;
      function start(code) {
        return atBreak(code) ? text2(code) : notText(code);
      }
      function notText(code) {
        if (code === null) {
          effects.consume(code);
          return;
        }
        effects.enter("data");
        effects.consume(code);
        return data;
      }
      function data(code) {
        if (atBreak(code)) {
          effects.exit("data");
          return text2(code);
        }
        effects.consume(code);
        return data;
      }
      function atBreak(code) {
        var list = constructs[code];
        var index = -1;
        if (code === null) {
          return true;
        }
        if (list) {
          while (++index < list.length) {
            if (!list[index].previous || list[index].previous.call(self2, self2.previous)) {
              return true;
            }
          }
        }
      }
    }
  }
  function createResolver(extraResolver) {
    return resolveAllText;
    function resolveAllText(events, context) {
      var index = -1;
      var enter;
      while (++index <= events.length) {
        if (enter === void 0) {
          if (events[index] && events[index][1].type === "data") {
            enter = index;
            index++;
          }
        } else if (!events[index] || events[index][1].type !== "data") {
          if (index !== enter + 2) {
            events[enter][1].end = events[index - 1][1].end;
            events.splice(enter + 2, index - enter - 2);
            index = enter + 2;
          }
          enter = void 0;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }
  function resolveAllLineSuffixes(events, context) {
    var eventIndex = -1;
    var chunks;
    var data;
    var chunk;
    var index;
    var bufferIndex;
    var size;
    var tabs;
    var token;
    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
        data = events[eventIndex - 1][1];
        chunks = context.sliceStream(data);
        index = chunks.length;
        bufferIndex = -1;
        size = 0;
        tabs = void 0;
        while (index--) {
          chunk = chunks[index];
          if (typeof chunk === "string") {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === 32) {
              size++;
              bufferIndex--;
            }
            if (bufferIndex)
              break;
            bufferIndex = -1;
          } else if (chunk === -2) {
            tabs = true;
            size++;
          } else if (chunk === -1)
            ;
          else {
            index++;
            break;
          }
        }
        if (size) {
          token = {
            type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              line: data.end.line,
              column: data.end.column - size,
              offset: data.end.offset - size,
              _index: data.start._index + index,
              _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex
            },
            end: shallow(data.end)
          };
          data.end = shallow(token.start);
          if (data.start.offset === data.end.offset) {
            assign(data, token);
          } else {
            events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
            eventIndex += 2;
          }
        }
        eventIndex++;
      }
    }
    return events;
  }
  exports2.resolver = resolver;
  exports2.string = string;
  exports2.text = text;
});

// node_modules/micromark/dist/util/miniflat.js
var require_miniflat = __commonJS((exports2, module2) => {
  "use strict";
  function miniflat(value) {
    return value === null || value === void 0 ? [] : "length" in value ? value : [value];
  }
  module2.exports = miniflat;
});

// node_modules/micromark/dist/util/combine-extensions.js
var require_combine_extensions = __commonJS((exports2, module2) => {
  "use strict";
  var hasOwnProperty = require_has_own_property();
  var chunkedSplice = require_chunked_splice();
  var miniflat = require_miniflat();
  function combineExtensions(extensions) {
    var all = {};
    var index = -1;
    while (++index < extensions.length) {
      extension(all, extensions[index]);
    }
    return all;
  }
  function extension(all, extension2) {
    var hook;
    var left;
    var right;
    var code;
    for (hook in extension2) {
      left = hasOwnProperty.call(all, hook) ? all[hook] : all[hook] = {};
      right = extension2[hook];
      for (code in right) {
        left[code] = constructs(miniflat(right[code]), hasOwnProperty.call(left, code) ? left[code] : []);
      }
    }
  }
  function constructs(list, existing) {
    var index = -1;
    var before = [];
    while (++index < list.length) {
      ;
      (list[index].add === "after" ? existing : before).push(list[index]);
    }
    chunkedSplice(existing, 0, 0, before);
    return existing;
  }
  module2.exports = combineExtensions;
});

// node_modules/micromark/dist/util/chunked-push.js
var require_chunked_push = __commonJS((exports2, module2) => {
  "use strict";
  var chunkedSplice = require_chunked_splice();
  function chunkedPush(list, items) {
    if (list.length) {
      chunkedSplice(list, list.length, 0, items);
      return list;
    }
    return items;
  }
  module2.exports = chunkedPush;
});

// node_modules/micromark/dist/util/resolve-all.js
var require_resolve_all = __commonJS((exports2, module2) => {
  "use strict";
  function resolveAll(constructs, events, context) {
    var called = [];
    var index = -1;
    var resolve;
    while (++index < constructs.length) {
      resolve = constructs[index].resolveAll;
      if (resolve && called.indexOf(resolve) < 0) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }
    return events;
  }
  module2.exports = resolveAll;
});

// node_modules/micromark/dist/util/serialize-chunks.js
var require_serialize_chunks = __commonJS((exports2, module2) => {
  "use strict";
  var fromCharCode = require_from_char_code();
  function serializeChunks(chunks) {
    var index = -1;
    var result = [];
    var chunk;
    var value;
    var atTab;
    while (++index < chunks.length) {
      chunk = chunks[index];
      if (typeof chunk === "string") {
        value = chunk;
      } else if (chunk === -5) {
        value = "\r";
      } else if (chunk === -4) {
        value = "\n";
      } else if (chunk === -3) {
        value = "\r\n";
      } else if (chunk === -2) {
        value = "	";
      } else if (chunk === -1) {
        if (atTab)
          continue;
        value = " ";
      } else {
        value = fromCharCode(chunk);
      }
      atTab = chunk === -2;
      result.push(value);
    }
    return result.join("");
  }
  module2.exports = serializeChunks;
});

// node_modules/micromark/dist/util/slice-chunks.js
var require_slice_chunks = __commonJS((exports2, module2) => {
  "use strict";
  function sliceChunks(chunks, token) {
    var startIndex = token.start._index;
    var startBufferIndex = token.start._bufferIndex;
    var endIndex = token.end._index;
    var endBufferIndex = token.end._bufferIndex;
    var view;
    if (startIndex === endIndex) {
      view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        view[0] = view[0].slice(startBufferIndex);
      }
      if (endBufferIndex > 0) {
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }
  module2.exports = sliceChunks;
});

// node_modules/micromark/dist/util/create-tokenizer.js
var require_create_tokenizer = __commonJS((exports2, module2) => {
  "use strict";
  var assign = require_assign();
  var markdownLineEnding = require_markdown_line_ending();
  var chunkedPush = require_chunked_push();
  var chunkedSplice = require_chunked_splice();
  var miniflat = require_miniflat();
  var resolveAll = require_resolve_all();
  var serializeChunks = require_serialize_chunks();
  var shallow = require_shallow();
  var sliceChunks = require_slice_chunks();
  function createTokenizer(parser, initialize, from) {
    var point = from ? shallow(from) : {
      line: 1,
      column: 1,
      offset: 0
    };
    var columnStart = {};
    var resolveAllConstructs = [];
    var chunks = [];
    var stack = [];
    var effects = {
      consume,
      enter,
      exit,
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      interrupt: constructFactory(onsuccessfulcheck, {
        interrupt: true
      }),
      lazy: constructFactory(onsuccessfulcheck, {
        lazy: true
      })
    };
    var context = {
      previous: null,
      events: [],
      parser,
      sliceStream,
      sliceSerialize,
      now,
      defineSkip: skip,
      write
    };
    var state = initialize.tokenize.call(context, effects);
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    point._index = 0;
    point._bufferIndex = -1;
    return context;
    function write(slice) {
      chunks = chunkedPush(chunks, slice);
      main();
      if (chunks[chunks.length - 1] !== null) {
        return [];
      }
      addResult(initialize, 0);
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }
    function sliceSerialize(token) {
      return serializeChunks(sliceStream(token));
    }
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }
    function now() {
      return shallow(point);
    }
    function skip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
    }
    function main() {
      var chunkIndex;
      var chunk;
      while (point._index < chunks.length) {
        chunk = chunks[point._index];
        if (typeof chunk === "string") {
          chunkIndex = point._index;
          if (point._bufferIndex < 0) {
            point._bufferIndex = 0;
          }
          while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }
    function go(code) {
      state = state(code);
    }
    function consume(code) {
      if (markdownLineEnding(code)) {
        point.line++;
        point.column = 1;
        point.offset += code === -3 ? 2 : 1;
        accountForPotentialSkip();
      } else if (code !== -1) {
        point.column++;
        point.offset++;
      }
      if (point._bufferIndex < 0) {
        point._index++;
      } else {
        point._bufferIndex++;
        if (point._bufferIndex === chunks[point._index].length) {
          point._bufferIndex = -1;
          point._index++;
        }
      }
      context.previous = code;
    }
    function enter(type, fields) {
      var token = fields || {};
      token.type = type;
      token.start = now();
      context.events.push(["enter", token, context]);
      stack.push(token);
      return token;
    }
    function exit(type) {
      var token = stack.pop();
      token.end = now();
      context.events.push(["exit", token, context]);
      return token;
    }
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }
    function onsuccessfulcheck(construct, info) {
      info.restore();
    }
    function constructFactory(onreturn, fields) {
      return hook;
      function hook(constructs, returnState, bogusState) {
        var listOfConstructs;
        var constructIndex;
        var currentConstruct;
        var info;
        return constructs.tokenize || "length" in constructs ? handleListOfConstructs(miniflat(constructs)) : handleMapOfConstructs;
        function handleMapOfConstructs(code) {
          if (code in constructs || null in constructs) {
            return handleListOfConstructs(constructs.null ? miniflat(constructs[code]).concat(miniflat(constructs.null)) : constructs[code])(code);
          }
          return bogusState(code);
        }
        function handleListOfConstructs(list) {
          listOfConstructs = list;
          constructIndex = 0;
          return handleConstruct(list[constructIndex]);
        }
        function handleConstruct(construct) {
          return start;
          function start(code) {
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }
            if (construct.name && context.parser.constructs.disable.null.indexOf(construct.name) > -1) {
              return nok();
            }
            return construct.tokenize.call(fields ? assign({}, context, fields) : context, effects, ok, nok)(code);
          }
        }
        function ok(code) {
          onreturn(currentConstruct, info);
          return returnState;
        }
        function nok(code) {
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }
    function addResult(construct, from2) {
      if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        chunkedSplice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
    }
    function store() {
      var startPoint = now();
      var startPrevious = context.previous;
      var startCurrentConstruct = context.currentConstruct;
      var startEventsIndex = context.events.length;
      var startStack = Array.from(stack);
      return {
        restore,
        from: startEventsIndex
      };
      function restore() {
        point = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
      }
    }
    function accountForPotentialSkip() {
      if (point.line in columnStart && point.column < 2) {
        point.column = columnStart[point.line];
        point.offset += columnStart[point.line] - 1;
      }
    }
  }
  module2.exports = createTokenizer;
});

// node_modules/micromark/dist/character/markdown-line-ending-or-space.js
var require_markdown_line_ending_or_space = __commonJS((exports2, module2) => {
  "use strict";
  function markdownLineEndingOrSpace(code) {
    return code < 0 || code === 32;
  }
  module2.exports = markdownLineEndingOrSpace;
});

// node_modules/micromark/dist/constant/unicode-punctuation-regex.js
var require_unicode_punctuation_regex = __commonJS((exports2, module2) => {
  "use strict";
  var unicodePunctuation = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
  module2.exports = unicodePunctuation;
});

// node_modules/micromark/dist/util/regex-check.js
var require_regex_check = __commonJS((exports2, module2) => {
  "use strict";
  var fromCharCode = require_from_char_code();
  function regexCheck(regex) {
    return check;
    function check(code) {
      return regex.test(fromCharCode(code));
    }
  }
  module2.exports = regexCheck;
});

// node_modules/micromark/dist/character/unicode-punctuation.js
var require_unicode_punctuation = __commonJS((exports2, module2) => {
  "use strict";
  var unicodePunctuationRegex = require_unicode_punctuation_regex();
  var regexCheck = require_regex_check();
  var unicodePunctuation = regexCheck(unicodePunctuationRegex);
  module2.exports = unicodePunctuation;
});

// node_modules/micromark/dist/character/unicode-whitespace.js
var require_unicode_whitespace = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var unicodeWhitespace = regexCheck(/\s/);
  module2.exports = unicodeWhitespace;
});

// node_modules/micromark/dist/util/classify-character.js
var require_classify_character = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var unicodePunctuation = require_unicode_punctuation();
  var unicodeWhitespace = require_unicode_whitespace();
  function classifyCharacter(code) {
    if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      return 1;
    }
    if (unicodePunctuation(code)) {
      return 2;
    }
  }
  module2.exports = classifyCharacter;
});

// node_modules/micromark/dist/util/move-point.js
var require_move_point = __commonJS((exports2, module2) => {
  "use strict";
  function movePoint(point, offset) {
    point.column += offset;
    point.offset += offset;
    point._bufferIndex += offset;
    return point;
  }
  module2.exports = movePoint;
});

// node_modules/micromark/dist/tokenize/attention.js
var require_attention = __commonJS((exports2, module2) => {
  "use strict";
  var chunkedPush = require_chunked_push();
  var chunkedSplice = require_chunked_splice();
  var classifyCharacter = require_classify_character();
  var movePoint = require_move_point();
  var resolveAll = require_resolve_all();
  var shallow = require_shallow();
  var attention = {
    name: "attention",
    tokenize: tokenizeAttention,
    resolveAll: resolveAllAttention
  };
  function resolveAllAttention(events, context) {
    var index = -1;
    var open;
    var group;
    var text;
    var openingSequence;
    var closingSequence;
    var use;
    var nextEvents;
    var offset;
    while (++index < events.length) {
      if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
        open = index;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
            if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
              continue;
            }
            use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
            openingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: movePoint(shallow(events[open][1].end), -use),
              end: shallow(events[open][1].end)
            };
            closingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: shallow(events[index][1].start),
              end: movePoint(shallow(events[index][1].start), use)
            };
            text = {
              type: use > 1 ? "strongText" : "emphasisText",
              start: shallow(events[open][1].end),
              end: shallow(events[index][1].start)
            };
            group = {
              type: use > 1 ? "strong" : "emphasis",
              start: shallow(openingSequence.start),
              end: shallow(closingSequence.end)
            };
            events[open][1].end = shallow(openingSequence.start);
            events[index][1].start = shallow(closingSequence.end);
            nextEvents = [];
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = chunkedPush(nextEvents, [
                ["enter", events[open][1], context],
                ["exit", events[open][1], context]
              ]);
            }
            nextEvents = chunkedPush(nextEvents, [
              ["enter", group, context],
              ["enter", openingSequence, context],
              ["exit", openingSequence, context],
              ["enter", text, context]
            ]);
            nextEvents = chunkedPush(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
            nextEvents = chunkedPush(nextEvents, [
              ["exit", text, context],
              ["enter", closingSequence, context],
              ["exit", closingSequence, context],
              ["exit", group, context]
            ]);
            if (events[index][1].end.offset - events[index][1].start.offset) {
              offset = 2;
              nextEvents = chunkedPush(nextEvents, [
                ["enter", events[index][1], context],
                ["exit", events[index][1], context]
              ]);
            } else {
              offset = 0;
            }
            chunkedSplice(events, open - 1, index - open + 3, nextEvents);
            index = open + nextEvents.length - offset - 2;
            break;
          }
        }
      }
    }
    index = -1;
    while (++index < events.length) {
      if (events[index][1].type === "attentionSequence") {
        events[index][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeAttention(effects, ok) {
    var before = classifyCharacter(this.previous);
    var marker;
    return start;
    function start(code) {
      effects.enter("attentionSequence");
      marker = code;
      return sequence(code);
    }
    function sequence(code) {
      var token;
      var after;
      var open;
      var close;
      if (code === marker) {
        effects.consume(code);
        return sequence;
      }
      token = effects.exit("attentionSequence");
      after = classifyCharacter(code);
      open = !after || after === 2 && before;
      close = !before || before === 2 && after;
      token._open = marker === 42 ? open : open && (before || !close);
      token._close = marker === 42 ? close : close && (after || !open);
      return ok(code);
    }
  }
  module2.exports = attention;
});

// node_modules/micromark/dist/character/ascii-alpha.js
var require_ascii_alpha = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var asciiAlpha = regexCheck(/[A-Za-z]/);
  module2.exports = asciiAlpha;
});

// node_modules/micromark/dist/character/ascii-alphanumeric.js
var require_ascii_alphanumeric = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
  module2.exports = asciiAlphanumeric;
});

// node_modules/micromark/dist/character/ascii-atext.js
var require_ascii_atext = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
  module2.exports = asciiAtext;
});

// node_modules/micromark/dist/character/ascii-control.js
var require_ascii_control = __commonJS((exports2, module2) => {
  "use strict";
  function asciiControl(code) {
    return code < 32 || code === 127;
  }
  module2.exports = asciiControl;
});

// node_modules/micromark/dist/tokenize/autolink.js
var require_autolink = __commonJS((exports2, module2) => {
  "use strict";
  var asciiAlpha = require_ascii_alpha();
  var asciiAlphanumeric = require_ascii_alphanumeric();
  var asciiAtext = require_ascii_atext();
  var asciiControl = require_ascii_control();
  var autolink = {
    name: "autolink",
    tokenize: tokenizeAutolink
  };
  function tokenizeAutolink(effects, ok, nok) {
    var size = 1;
    return start;
    function start(code) {
      effects.enter("autolink");
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.enter("autolinkProtocol");
      return open;
    }
    function open(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        return schemeOrEmailAtext;
      }
      return asciiAtext(code) ? emailAtext(code) : nok(code);
    }
    function schemeOrEmailAtext(code) {
      return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code) ? schemeInsideOrEmailAtext(code) : emailAtext(code);
    }
    function schemeInsideOrEmailAtext(code) {
      if (code === 58) {
        effects.consume(code);
        return urlInside;
      }
      if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
        effects.consume(code);
        return schemeInsideOrEmailAtext;
      }
      return emailAtext(code);
    }
    function urlInside(code) {
      if (code === 62) {
        effects.exit("autolinkProtocol");
        return end(code);
      }
      if (code === 32 || code === 60 || asciiControl(code)) {
        return nok(code);
      }
      effects.consume(code);
      return urlInside;
    }
    function emailAtext(code) {
      if (code === 64) {
        effects.consume(code);
        size = 0;
        return emailAtSignOrDot;
      }
      if (asciiAtext(code)) {
        effects.consume(code);
        return emailAtext;
      }
      return nok(code);
    }
    function emailAtSignOrDot(code) {
      return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
    }
    function emailLabel(code) {
      if (code === 46) {
        effects.consume(code);
        size = 0;
        return emailAtSignOrDot;
      }
      if (code === 62) {
        effects.exit("autolinkProtocol").type = "autolinkEmail";
        return end(code);
      }
      return emailValue(code);
    }
    function emailValue(code) {
      if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
        effects.consume(code);
        return code === 45 ? emailValue : emailLabel;
      }
      return nok(code);
    }
    function end(code) {
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok;
    }
  }
  module2.exports = autolink;
});

// node_modules/micromark/dist/tokenize/block-quote.js
var require_block_quote = __commonJS((exports2, module2) => {
  "use strict";
  var markdownSpace = require_markdown_space();
  var factorySpace = require_factory_space();
  var blockQuote = {
    name: "blockQuote",
    tokenize: tokenizeBlockQuoteStart,
    continuation: {
      tokenize: tokenizeBlockQuoteContinuation
    },
    exit
  };
  function tokenizeBlockQuoteStart(effects, ok, nok) {
    var self2 = this;
    return start;
    function start(code) {
      if (code === 62) {
        if (!self2.containerState.open) {
          effects.enter("blockQuote", {
            _container: true
          });
          self2.containerState.open = true;
        }
        effects.enter("blockQuotePrefix");
        effects.enter("blockQuoteMarker");
        effects.consume(code);
        effects.exit("blockQuoteMarker");
        return after;
      }
      return nok(code);
    }
    function after(code) {
      if (markdownSpace(code)) {
        effects.enter("blockQuotePrefixWhitespace");
        effects.consume(code);
        effects.exit("blockQuotePrefixWhitespace");
        effects.exit("blockQuotePrefix");
        return ok;
      }
      effects.exit("blockQuotePrefix");
      return ok(code);
    }
  }
  function tokenizeBlockQuoteContinuation(effects, ok, nok) {
    return factorySpace(effects, effects.attempt(blockQuote, ok, nok), "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
  }
  function exit(effects) {
    effects.exit("blockQuote");
  }
  module2.exports = blockQuote;
});

// node_modules/micromark/dist/character/ascii-punctuation.js
var require_ascii_punctuation = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
  module2.exports = asciiPunctuation;
});

// node_modules/micromark/dist/tokenize/character-escape.js
var require_character_escape = __commonJS((exports2, module2) => {
  "use strict";
  var asciiPunctuation = require_ascii_punctuation();
  var characterEscape = {
    name: "characterEscape",
    tokenize: tokenizeCharacterEscape
  };
  function tokenizeCharacterEscape(effects, ok, nok) {
    return start;
    function start(code) {
      effects.enter("characterEscape");
      effects.enter("escapeMarker");
      effects.consume(code);
      effects.exit("escapeMarker");
      return open;
    }
    function open(code) {
      if (asciiPunctuation(code)) {
        effects.enter("characterEscapeValue");
        effects.consume(code);
        effects.exit("characterEscapeValue");
        effects.exit("characterEscape");
        return ok;
      }
      return nok(code);
    }
  }
  module2.exports = characterEscape;
});

// node_modules/character-entities/index.json
var require_character_entities = __commonJS((exports2, module2) => {
  module2.exports = {
    AEli: "\xC6",
    AElig: "\xC6",
    AM: "&",
    AMP: "&",
    Aacut: "\xC1",
    Aacute: "\xC1",
    Abreve: "\u0102",
    Acir: "\xC2",
    Acirc: "\xC2",
    Acy: "\u0410",
    Afr: "\u{1D504}",
    Agrav: "\xC0",
    Agrave: "\xC0",
    Alpha: "\u0391",
    Amacr: "\u0100",
    And: "\u2A53",
    Aogon: "\u0104",
    Aopf: "\u{1D538}",
    ApplyFunction: "\u2061",
    Arin: "\xC5",
    Aring: "\xC5",
    Ascr: "\u{1D49C}",
    Assign: "\u2254",
    Atild: "\xC3",
    Atilde: "\xC3",
    Aum: "\xC4",
    Auml: "\xC4",
    Backslash: "\u2216",
    Barv: "\u2AE7",
    Barwed: "\u2306",
    Bcy: "\u0411",
    Because: "\u2235",
    Bernoullis: "\u212C",
    Beta: "\u0392",
    Bfr: "\u{1D505}",
    Bopf: "\u{1D539}",
    Breve: "\u02D8",
    Bscr: "\u212C",
    Bumpeq: "\u224E",
    CHcy: "\u0427",
    COP: "\xA9",
    COPY: "\xA9",
    Cacute: "\u0106",
    Cap: "\u22D2",
    CapitalDifferentialD: "\u2145",
    Cayleys: "\u212D",
    Ccaron: "\u010C",
    Ccedi: "\xC7",
    Ccedil: "\xC7",
    Ccirc: "\u0108",
    Cconint: "\u2230",
    Cdot: "\u010A",
    Cedilla: "\xB8",
    CenterDot: "\xB7",
    Cfr: "\u212D",
    Chi: "\u03A7",
    CircleDot: "\u2299",
    CircleMinus: "\u2296",
    CirclePlus: "\u2295",
    CircleTimes: "\u2297",
    ClockwiseContourIntegral: "\u2232",
    CloseCurlyDoubleQuote: "\u201D",
    CloseCurlyQuote: "\u2019",
    Colon: "\u2237",
    Colone: "\u2A74",
    Congruent: "\u2261",
    Conint: "\u222F",
    ContourIntegral: "\u222E",
    Copf: "\u2102",
    Coproduct: "\u2210",
    CounterClockwiseContourIntegral: "\u2233",
    Cross: "\u2A2F",
    Cscr: "\u{1D49E}",
    Cup: "\u22D3",
    CupCap: "\u224D",
    DD: "\u2145",
    DDotrahd: "\u2911",
    DJcy: "\u0402",
    DScy: "\u0405",
    DZcy: "\u040F",
    Dagger: "\u2021",
    Darr: "\u21A1",
    Dashv: "\u2AE4",
    Dcaron: "\u010E",
    Dcy: "\u0414",
    Del: "\u2207",
    Delta: "\u0394",
    Dfr: "\u{1D507}",
    DiacriticalAcute: "\xB4",
    DiacriticalDot: "\u02D9",
    DiacriticalDoubleAcute: "\u02DD",
    DiacriticalGrave: "`",
    DiacriticalTilde: "\u02DC",
    Diamond: "\u22C4",
    DifferentialD: "\u2146",
    Dopf: "\u{1D53B}",
    Dot: "\xA8",
    DotDot: "\u20DC",
    DotEqual: "\u2250",
    DoubleContourIntegral: "\u222F",
    DoubleDot: "\xA8",
    DoubleDownArrow: "\u21D3",
    DoubleLeftArrow: "\u21D0",
    DoubleLeftRightArrow: "\u21D4",
    DoubleLeftTee: "\u2AE4",
    DoubleLongLeftArrow: "\u27F8",
    DoubleLongLeftRightArrow: "\u27FA",
    DoubleLongRightArrow: "\u27F9",
    DoubleRightArrow: "\u21D2",
    DoubleRightTee: "\u22A8",
    DoubleUpArrow: "\u21D1",
    DoubleUpDownArrow: "\u21D5",
    DoubleVerticalBar: "\u2225",
    DownArrow: "\u2193",
    DownArrowBar: "\u2913",
    DownArrowUpArrow: "\u21F5",
    DownBreve: "\u0311",
    DownLeftRightVector: "\u2950",
    DownLeftTeeVector: "\u295E",
    DownLeftVector: "\u21BD",
    DownLeftVectorBar: "\u2956",
    DownRightTeeVector: "\u295F",
    DownRightVector: "\u21C1",
    DownRightVectorBar: "\u2957",
    DownTee: "\u22A4",
    DownTeeArrow: "\u21A7",
    Downarrow: "\u21D3",
    Dscr: "\u{1D49F}",
    Dstrok: "\u0110",
    ENG: "\u014A",
    ET: "\xD0",
    ETH: "\xD0",
    Eacut: "\xC9",
    Eacute: "\xC9",
    Ecaron: "\u011A",
    Ecir: "\xCA",
    Ecirc: "\xCA",
    Ecy: "\u042D",
    Edot: "\u0116",
    Efr: "\u{1D508}",
    Egrav: "\xC8",
    Egrave: "\xC8",
    Element: "\u2208",
    Emacr: "\u0112",
    EmptySmallSquare: "\u25FB",
    EmptyVerySmallSquare: "\u25AB",
    Eogon: "\u0118",
    Eopf: "\u{1D53C}",
    Epsilon: "\u0395",
    Equal: "\u2A75",
    EqualTilde: "\u2242",
    Equilibrium: "\u21CC",
    Escr: "\u2130",
    Esim: "\u2A73",
    Eta: "\u0397",
    Eum: "\xCB",
    Euml: "\xCB",
    Exists: "\u2203",
    ExponentialE: "\u2147",
    Fcy: "\u0424",
    Ffr: "\u{1D509}",
    FilledSmallSquare: "\u25FC",
    FilledVerySmallSquare: "\u25AA",
    Fopf: "\u{1D53D}",
    ForAll: "\u2200",
    Fouriertrf: "\u2131",
    Fscr: "\u2131",
    GJcy: "\u0403",
    G: ">",
    GT: ">",
    Gamma: "\u0393",
    Gammad: "\u03DC",
    Gbreve: "\u011E",
    Gcedil: "\u0122",
    Gcirc: "\u011C",
    Gcy: "\u0413",
    Gdot: "\u0120",
    Gfr: "\u{1D50A}",
    Gg: "\u22D9",
    Gopf: "\u{1D53E}",
    GreaterEqual: "\u2265",
    GreaterEqualLess: "\u22DB",
    GreaterFullEqual: "\u2267",
    GreaterGreater: "\u2AA2",
    GreaterLess: "\u2277",
    GreaterSlantEqual: "\u2A7E",
    GreaterTilde: "\u2273",
    Gscr: "\u{1D4A2}",
    Gt: "\u226B",
    HARDcy: "\u042A",
    Hacek: "\u02C7",
    Hat: "^",
    Hcirc: "\u0124",
    Hfr: "\u210C",
    HilbertSpace: "\u210B",
    Hopf: "\u210D",
    HorizontalLine: "\u2500",
    Hscr: "\u210B",
    Hstrok: "\u0126",
    HumpDownHump: "\u224E",
    HumpEqual: "\u224F",
    IEcy: "\u0415",
    IJlig: "\u0132",
    IOcy: "\u0401",
    Iacut: "\xCD",
    Iacute: "\xCD",
    Icir: "\xCE",
    Icirc: "\xCE",
    Icy: "\u0418",
    Idot: "\u0130",
    Ifr: "\u2111",
    Igrav: "\xCC",
    Igrave: "\xCC",
    Im: "\u2111",
    Imacr: "\u012A",
    ImaginaryI: "\u2148",
    Implies: "\u21D2",
    Int: "\u222C",
    Integral: "\u222B",
    Intersection: "\u22C2",
    InvisibleComma: "\u2063",
    InvisibleTimes: "\u2062",
    Iogon: "\u012E",
    Iopf: "\u{1D540}",
    Iota: "\u0399",
    Iscr: "\u2110",
    Itilde: "\u0128",
    Iukcy: "\u0406",
    Ium: "\xCF",
    Iuml: "\xCF",
    Jcirc: "\u0134",
    Jcy: "\u0419",
    Jfr: "\u{1D50D}",
    Jopf: "\u{1D541}",
    Jscr: "\u{1D4A5}",
    Jsercy: "\u0408",
    Jukcy: "\u0404",
    KHcy: "\u0425",
    KJcy: "\u040C",
    Kappa: "\u039A",
    Kcedil: "\u0136",
    Kcy: "\u041A",
    Kfr: "\u{1D50E}",
    Kopf: "\u{1D542}",
    Kscr: "\u{1D4A6}",
    LJcy: "\u0409",
    L: "<",
    LT: "<",
    Lacute: "\u0139",
    Lambda: "\u039B",
    Lang: "\u27EA",
    Laplacetrf: "\u2112",
    Larr: "\u219E",
    Lcaron: "\u013D",
    Lcedil: "\u013B",
    Lcy: "\u041B",
    LeftAngleBracket: "\u27E8",
    LeftArrow: "\u2190",
    LeftArrowBar: "\u21E4",
    LeftArrowRightArrow: "\u21C6",
    LeftCeiling: "\u2308",
    LeftDoubleBracket: "\u27E6",
    LeftDownTeeVector: "\u2961",
    LeftDownVector: "\u21C3",
    LeftDownVectorBar: "\u2959",
    LeftFloor: "\u230A",
    LeftRightArrow: "\u2194",
    LeftRightVector: "\u294E",
    LeftTee: "\u22A3",
    LeftTeeArrow: "\u21A4",
    LeftTeeVector: "\u295A",
    LeftTriangle: "\u22B2",
    LeftTriangleBar: "\u29CF",
    LeftTriangleEqual: "\u22B4",
    LeftUpDownVector: "\u2951",
    LeftUpTeeVector: "\u2960",
    LeftUpVector: "\u21BF",
    LeftUpVectorBar: "\u2958",
    LeftVector: "\u21BC",
    LeftVectorBar: "\u2952",
    Leftarrow: "\u21D0",
    Leftrightarrow: "\u21D4",
    LessEqualGreater: "\u22DA",
    LessFullEqual: "\u2266",
    LessGreater: "\u2276",
    LessLess: "\u2AA1",
    LessSlantEqual: "\u2A7D",
    LessTilde: "\u2272",
    Lfr: "\u{1D50F}",
    Ll: "\u22D8",
    Lleftarrow: "\u21DA",
    Lmidot: "\u013F",
    LongLeftArrow: "\u27F5",
    LongLeftRightArrow: "\u27F7",
    LongRightArrow: "\u27F6",
    Longleftarrow: "\u27F8",
    Longleftrightarrow: "\u27FA",
    Longrightarrow: "\u27F9",
    Lopf: "\u{1D543}",
    LowerLeftArrow: "\u2199",
    LowerRightArrow: "\u2198",
    Lscr: "\u2112",
    Lsh: "\u21B0",
    Lstrok: "\u0141",
    Lt: "\u226A",
    Map: "\u2905",
    Mcy: "\u041C",
    MediumSpace: "\u205F",
    Mellintrf: "\u2133",
    Mfr: "\u{1D510}",
    MinusPlus: "\u2213",
    Mopf: "\u{1D544}",
    Mscr: "\u2133",
    Mu: "\u039C",
    NJcy: "\u040A",
    Nacute: "\u0143",
    Ncaron: "\u0147",
    Ncedil: "\u0145",
    Ncy: "\u041D",
    NegativeMediumSpace: "\u200B",
    NegativeThickSpace: "\u200B",
    NegativeThinSpace: "\u200B",
    NegativeVeryThinSpace: "\u200B",
    NestedGreaterGreater: "\u226B",
    NestedLessLess: "\u226A",
    NewLine: "\n",
    Nfr: "\u{1D511}",
    NoBreak: "\u2060",
    NonBreakingSpace: "\xA0",
    Nopf: "\u2115",
    Not: "\u2AEC",
    NotCongruent: "\u2262",
    NotCupCap: "\u226D",
    NotDoubleVerticalBar: "\u2226",
    NotElement: "\u2209",
    NotEqual: "\u2260",
    NotEqualTilde: "\u2242\u0338",
    NotExists: "\u2204",
    NotGreater: "\u226F",
    NotGreaterEqual: "\u2271",
    NotGreaterFullEqual: "\u2267\u0338",
    NotGreaterGreater: "\u226B\u0338",
    NotGreaterLess: "\u2279",
    NotGreaterSlantEqual: "\u2A7E\u0338",
    NotGreaterTilde: "\u2275",
    NotHumpDownHump: "\u224E\u0338",
    NotHumpEqual: "\u224F\u0338",
    NotLeftTriangle: "\u22EA",
    NotLeftTriangleBar: "\u29CF\u0338",
    NotLeftTriangleEqual: "\u22EC",
    NotLess: "\u226E",
    NotLessEqual: "\u2270",
    NotLessGreater: "\u2278",
    NotLessLess: "\u226A\u0338",
    NotLessSlantEqual: "\u2A7D\u0338",
    NotLessTilde: "\u2274",
    NotNestedGreaterGreater: "\u2AA2\u0338",
    NotNestedLessLess: "\u2AA1\u0338",
    NotPrecedes: "\u2280",
    NotPrecedesEqual: "\u2AAF\u0338",
    NotPrecedesSlantEqual: "\u22E0",
    NotReverseElement: "\u220C",
    NotRightTriangle: "\u22EB",
    NotRightTriangleBar: "\u29D0\u0338",
    NotRightTriangleEqual: "\u22ED",
    NotSquareSubset: "\u228F\u0338",
    NotSquareSubsetEqual: "\u22E2",
    NotSquareSuperset: "\u2290\u0338",
    NotSquareSupersetEqual: "\u22E3",
    NotSubset: "\u2282\u20D2",
    NotSubsetEqual: "\u2288",
    NotSucceeds: "\u2281",
    NotSucceedsEqual: "\u2AB0\u0338",
    NotSucceedsSlantEqual: "\u22E1",
    NotSucceedsTilde: "\u227F\u0338",
    NotSuperset: "\u2283\u20D2",
    NotSupersetEqual: "\u2289",
    NotTilde: "\u2241",
    NotTildeEqual: "\u2244",
    NotTildeFullEqual: "\u2247",
    NotTildeTilde: "\u2249",
    NotVerticalBar: "\u2224",
    Nscr: "\u{1D4A9}",
    Ntild: "\xD1",
    Ntilde: "\xD1",
    Nu: "\u039D",
    OElig: "\u0152",
    Oacut: "\xD3",
    Oacute: "\xD3",
    Ocir: "\xD4",
    Ocirc: "\xD4",
    Ocy: "\u041E",
    Odblac: "\u0150",
    Ofr: "\u{1D512}",
    Ograv: "\xD2",
    Ograve: "\xD2",
    Omacr: "\u014C",
    Omega: "\u03A9",
    Omicron: "\u039F",
    Oopf: "\u{1D546}",
    OpenCurlyDoubleQuote: "\u201C",
    OpenCurlyQuote: "\u2018",
    Or: "\u2A54",
    Oscr: "\u{1D4AA}",
    Oslas: "\xD8",
    Oslash: "\xD8",
    Otild: "\xD5",
    Otilde: "\xD5",
    Otimes: "\u2A37",
    Oum: "\xD6",
    Ouml: "\xD6",
    OverBar: "\u203E",
    OverBrace: "\u23DE",
    OverBracket: "\u23B4",
    OverParenthesis: "\u23DC",
    PartialD: "\u2202",
    Pcy: "\u041F",
    Pfr: "\u{1D513}",
    Phi: "\u03A6",
    Pi: "\u03A0",
    PlusMinus: "\xB1",
    Poincareplane: "\u210C",
    Popf: "\u2119",
    Pr: "\u2ABB",
    Precedes: "\u227A",
    PrecedesEqual: "\u2AAF",
    PrecedesSlantEqual: "\u227C",
    PrecedesTilde: "\u227E",
    Prime: "\u2033",
    Product: "\u220F",
    Proportion: "\u2237",
    Proportional: "\u221D",
    Pscr: "\u{1D4AB}",
    Psi: "\u03A8",
    QUO: '"',
    QUOT: '"',
    Qfr: "\u{1D514}",
    Qopf: "\u211A",
    Qscr: "\u{1D4AC}",
    RBarr: "\u2910",
    RE: "\xAE",
    REG: "\xAE",
    Racute: "\u0154",
    Rang: "\u27EB",
    Rarr: "\u21A0",
    Rarrtl: "\u2916",
    Rcaron: "\u0158",
    Rcedil: "\u0156",
    Rcy: "\u0420",
    Re: "\u211C",
    ReverseElement: "\u220B",
    ReverseEquilibrium: "\u21CB",
    ReverseUpEquilibrium: "\u296F",
    Rfr: "\u211C",
    Rho: "\u03A1",
    RightAngleBracket: "\u27E9",
    RightArrow: "\u2192",
    RightArrowBar: "\u21E5",
    RightArrowLeftArrow: "\u21C4",
    RightCeiling: "\u2309",
    RightDoubleBracket: "\u27E7",
    RightDownTeeVector: "\u295D",
    RightDownVector: "\u21C2",
    RightDownVectorBar: "\u2955",
    RightFloor: "\u230B",
    RightTee: "\u22A2",
    RightTeeArrow: "\u21A6",
    RightTeeVector: "\u295B",
    RightTriangle: "\u22B3",
    RightTriangleBar: "\u29D0",
    RightTriangleEqual: "\u22B5",
    RightUpDownVector: "\u294F",
    RightUpTeeVector: "\u295C",
    RightUpVector: "\u21BE",
    RightUpVectorBar: "\u2954",
    RightVector: "\u21C0",
    RightVectorBar: "\u2953",
    Rightarrow: "\u21D2",
    Ropf: "\u211D",
    RoundImplies: "\u2970",
    Rrightarrow: "\u21DB",
    Rscr: "\u211B",
    Rsh: "\u21B1",
    RuleDelayed: "\u29F4",
    SHCHcy: "\u0429",
    SHcy: "\u0428",
    SOFTcy: "\u042C",
    Sacute: "\u015A",
    Sc: "\u2ABC",
    Scaron: "\u0160",
    Scedil: "\u015E",
    Scirc: "\u015C",
    Scy: "\u0421",
    Sfr: "\u{1D516}",
    ShortDownArrow: "\u2193",
    ShortLeftArrow: "\u2190",
    ShortRightArrow: "\u2192",
    ShortUpArrow: "\u2191",
    Sigma: "\u03A3",
    SmallCircle: "\u2218",
    Sopf: "\u{1D54A}",
    Sqrt: "\u221A",
    Square: "\u25A1",
    SquareIntersection: "\u2293",
    SquareSubset: "\u228F",
    SquareSubsetEqual: "\u2291",
    SquareSuperset: "\u2290",
    SquareSupersetEqual: "\u2292",
    SquareUnion: "\u2294",
    Sscr: "\u{1D4AE}",
    Star: "\u22C6",
    Sub: "\u22D0",
    Subset: "\u22D0",
    SubsetEqual: "\u2286",
    Succeeds: "\u227B",
    SucceedsEqual: "\u2AB0",
    SucceedsSlantEqual: "\u227D",
    SucceedsTilde: "\u227F",
    SuchThat: "\u220B",
    Sum: "\u2211",
    Sup: "\u22D1",
    Superset: "\u2283",
    SupersetEqual: "\u2287",
    Supset: "\u22D1",
    THOR: "\xDE",
    THORN: "\xDE",
    TRADE: "\u2122",
    TSHcy: "\u040B",
    TScy: "\u0426",
    Tab: "	",
    Tau: "\u03A4",
    Tcaron: "\u0164",
    Tcedil: "\u0162",
    Tcy: "\u0422",
    Tfr: "\u{1D517}",
    Therefore: "\u2234",
    Theta: "\u0398",
    ThickSpace: "\u205F\u200A",
    ThinSpace: "\u2009",
    Tilde: "\u223C",
    TildeEqual: "\u2243",
    TildeFullEqual: "\u2245",
    TildeTilde: "\u2248",
    Topf: "\u{1D54B}",
    TripleDot: "\u20DB",
    Tscr: "\u{1D4AF}",
    Tstrok: "\u0166",
    Uacut: "\xDA",
    Uacute: "\xDA",
    Uarr: "\u219F",
    Uarrocir: "\u2949",
    Ubrcy: "\u040E",
    Ubreve: "\u016C",
    Ucir: "\xDB",
    Ucirc: "\xDB",
    Ucy: "\u0423",
    Udblac: "\u0170",
    Ufr: "\u{1D518}",
    Ugrav: "\xD9",
    Ugrave: "\xD9",
    Umacr: "\u016A",
    UnderBar: "_",
    UnderBrace: "\u23DF",
    UnderBracket: "\u23B5",
    UnderParenthesis: "\u23DD",
    Union: "\u22C3",
    UnionPlus: "\u228E",
    Uogon: "\u0172",
    Uopf: "\u{1D54C}",
    UpArrow: "\u2191",
    UpArrowBar: "\u2912",
    UpArrowDownArrow: "\u21C5",
    UpDownArrow: "\u2195",
    UpEquilibrium: "\u296E",
    UpTee: "\u22A5",
    UpTeeArrow: "\u21A5",
    Uparrow: "\u21D1",
    Updownarrow: "\u21D5",
    UpperLeftArrow: "\u2196",
    UpperRightArrow: "\u2197",
    Upsi: "\u03D2",
    Upsilon: "\u03A5",
    Uring: "\u016E",
    Uscr: "\u{1D4B0}",
    Utilde: "\u0168",
    Uum: "\xDC",
    Uuml: "\xDC",
    VDash: "\u22AB",
    Vbar: "\u2AEB",
    Vcy: "\u0412",
    Vdash: "\u22A9",
    Vdashl: "\u2AE6",
    Vee: "\u22C1",
    Verbar: "\u2016",
    Vert: "\u2016",
    VerticalBar: "\u2223",
    VerticalLine: "|",
    VerticalSeparator: "\u2758",
    VerticalTilde: "\u2240",
    VeryThinSpace: "\u200A",
    Vfr: "\u{1D519}",
    Vopf: "\u{1D54D}",
    Vscr: "\u{1D4B1}",
    Vvdash: "\u22AA",
    Wcirc: "\u0174",
    Wedge: "\u22C0",
    Wfr: "\u{1D51A}",
    Wopf: "\u{1D54E}",
    Wscr: "\u{1D4B2}",
    Xfr: "\u{1D51B}",
    Xi: "\u039E",
    Xopf: "\u{1D54F}",
    Xscr: "\u{1D4B3}",
    YAcy: "\u042F",
    YIcy: "\u0407",
    YUcy: "\u042E",
    Yacut: "\xDD",
    Yacute: "\xDD",
    Ycirc: "\u0176",
    Ycy: "\u042B",
    Yfr: "\u{1D51C}",
    Yopf: "\u{1D550}",
    Yscr: "\u{1D4B4}",
    Yuml: "\u0178",
    ZHcy: "\u0416",
    Zacute: "\u0179",
    Zcaron: "\u017D",
    Zcy: "\u0417",
    Zdot: "\u017B",
    ZeroWidthSpace: "\u200B",
    Zeta: "\u0396",
    Zfr: "\u2128",
    Zopf: "\u2124",
    Zscr: "\u{1D4B5}",
    aacut: "\xE1",
    aacute: "\xE1",
    abreve: "\u0103",
    ac: "\u223E",
    acE: "\u223E\u0333",
    acd: "\u223F",
    acir: "\xE2",
    acirc: "\xE2",
    acut: "\xB4",
    acute: "\xB4",
    acy: "\u0430",
    aeli: "\xE6",
    aelig: "\xE6",
    af: "\u2061",
    afr: "\u{1D51E}",
    agrav: "\xE0",
    agrave: "\xE0",
    alefsym: "\u2135",
    aleph: "\u2135",
    alpha: "\u03B1",
    amacr: "\u0101",
    amalg: "\u2A3F",
    am: "&",
    amp: "&",
    and: "\u2227",
    andand: "\u2A55",
    andd: "\u2A5C",
    andslope: "\u2A58",
    andv: "\u2A5A",
    ang: "\u2220",
    ange: "\u29A4",
    angle: "\u2220",
    angmsd: "\u2221",
    angmsdaa: "\u29A8",
    angmsdab: "\u29A9",
    angmsdac: "\u29AA",
    angmsdad: "\u29AB",
    angmsdae: "\u29AC",
    angmsdaf: "\u29AD",
    angmsdag: "\u29AE",
    angmsdah: "\u29AF",
    angrt: "\u221F",
    angrtvb: "\u22BE",
    angrtvbd: "\u299D",
    angsph: "\u2222",
    angst: "\xC5",
    angzarr: "\u237C",
    aogon: "\u0105",
    aopf: "\u{1D552}",
    ap: "\u2248",
    apE: "\u2A70",
    apacir: "\u2A6F",
    ape: "\u224A",
    apid: "\u224B",
    apos: "'",
    approx: "\u2248",
    approxeq: "\u224A",
    arin: "\xE5",
    aring: "\xE5",
    ascr: "\u{1D4B6}",
    ast: "*",
    asymp: "\u2248",
    asympeq: "\u224D",
    atild: "\xE3",
    atilde: "\xE3",
    aum: "\xE4",
    auml: "\xE4",
    awconint: "\u2233",
    awint: "\u2A11",
    bNot: "\u2AED",
    backcong: "\u224C",
    backepsilon: "\u03F6",
    backprime: "\u2035",
    backsim: "\u223D",
    backsimeq: "\u22CD",
    barvee: "\u22BD",
    barwed: "\u2305",
    barwedge: "\u2305",
    bbrk: "\u23B5",
    bbrktbrk: "\u23B6",
    bcong: "\u224C",
    bcy: "\u0431",
    bdquo: "\u201E",
    becaus: "\u2235",
    because: "\u2235",
    bemptyv: "\u29B0",
    bepsi: "\u03F6",
    bernou: "\u212C",
    beta: "\u03B2",
    beth: "\u2136",
    between: "\u226C",
    bfr: "\u{1D51F}",
    bigcap: "\u22C2",
    bigcirc: "\u25EF",
    bigcup: "\u22C3",
    bigodot: "\u2A00",
    bigoplus: "\u2A01",
    bigotimes: "\u2A02",
    bigsqcup: "\u2A06",
    bigstar: "\u2605",
    bigtriangledown: "\u25BD",
    bigtriangleup: "\u25B3",
    biguplus: "\u2A04",
    bigvee: "\u22C1",
    bigwedge: "\u22C0",
    bkarow: "\u290D",
    blacklozenge: "\u29EB",
    blacksquare: "\u25AA",
    blacktriangle: "\u25B4",
    blacktriangledown: "\u25BE",
    blacktriangleleft: "\u25C2",
    blacktriangleright: "\u25B8",
    blank: "\u2423",
    blk12: "\u2592",
    blk14: "\u2591",
    blk34: "\u2593",
    block: "\u2588",
    bne: "=\u20E5",
    bnequiv: "\u2261\u20E5",
    bnot: "\u2310",
    bopf: "\u{1D553}",
    bot: "\u22A5",
    bottom: "\u22A5",
    bowtie: "\u22C8",
    boxDL: "\u2557",
    boxDR: "\u2554",
    boxDl: "\u2556",
    boxDr: "\u2553",
    boxH: "\u2550",
    boxHD: "\u2566",
    boxHU: "\u2569",
    boxHd: "\u2564",
    boxHu: "\u2567",
    boxUL: "\u255D",
    boxUR: "\u255A",
    boxUl: "\u255C",
    boxUr: "\u2559",
    boxV: "\u2551",
    boxVH: "\u256C",
    boxVL: "\u2563",
    boxVR: "\u2560",
    boxVh: "\u256B",
    boxVl: "\u2562",
    boxVr: "\u255F",
    boxbox: "\u29C9",
    boxdL: "\u2555",
    boxdR: "\u2552",
    boxdl: "\u2510",
    boxdr: "\u250C",
    boxh: "\u2500",
    boxhD: "\u2565",
    boxhU: "\u2568",
    boxhd: "\u252C",
    boxhu: "\u2534",
    boxminus: "\u229F",
    boxplus: "\u229E",
    boxtimes: "\u22A0",
    boxuL: "\u255B",
    boxuR: "\u2558",
    boxul: "\u2518",
    boxur: "\u2514",
    boxv: "\u2502",
    boxvH: "\u256A",
    boxvL: "\u2561",
    boxvR: "\u255E",
    boxvh: "\u253C",
    boxvl: "\u2524",
    boxvr: "\u251C",
    bprime: "\u2035",
    breve: "\u02D8",
    brvba: "\xA6",
    brvbar: "\xA6",
    bscr: "\u{1D4B7}",
    bsemi: "\u204F",
    bsim: "\u223D",
    bsime: "\u22CD",
    bsol: "\\",
    bsolb: "\u29C5",
    bsolhsub: "\u27C8",
    bull: "\u2022",
    bullet: "\u2022",
    bump: "\u224E",
    bumpE: "\u2AAE",
    bumpe: "\u224F",
    bumpeq: "\u224F",
    cacute: "\u0107",
    cap: "\u2229",
    capand: "\u2A44",
    capbrcup: "\u2A49",
    capcap: "\u2A4B",
    capcup: "\u2A47",
    capdot: "\u2A40",
    caps: "\u2229\uFE00",
    caret: "\u2041",
    caron: "\u02C7",
    ccaps: "\u2A4D",
    ccaron: "\u010D",
    ccedi: "\xE7",
    ccedil: "\xE7",
    ccirc: "\u0109",
    ccups: "\u2A4C",
    ccupssm: "\u2A50",
    cdot: "\u010B",
    cedi: "\xB8",
    cedil: "\xB8",
    cemptyv: "\u29B2",
    cen: "\xA2",
    cent: "\xA2",
    centerdot: "\xB7",
    cfr: "\u{1D520}",
    chcy: "\u0447",
    check: "\u2713",
    checkmark: "\u2713",
    chi: "\u03C7",
    cir: "\u25CB",
    cirE: "\u29C3",
    circ: "\u02C6",
    circeq: "\u2257",
    circlearrowleft: "\u21BA",
    circlearrowright: "\u21BB",
    circledR: "\xAE",
    circledS: "\u24C8",
    circledast: "\u229B",
    circledcirc: "\u229A",
    circleddash: "\u229D",
    cire: "\u2257",
    cirfnint: "\u2A10",
    cirmid: "\u2AEF",
    cirscir: "\u29C2",
    clubs: "\u2663",
    clubsuit: "\u2663",
    colon: ":",
    colone: "\u2254",
    coloneq: "\u2254",
    comma: ",",
    commat: "@",
    comp: "\u2201",
    compfn: "\u2218",
    complement: "\u2201",
    complexes: "\u2102",
    cong: "\u2245",
    congdot: "\u2A6D",
    conint: "\u222E",
    copf: "\u{1D554}",
    coprod: "\u2210",
    cop: "\xA9",
    copy: "\xA9",
    copysr: "\u2117",
    crarr: "\u21B5",
    cross: "\u2717",
    cscr: "\u{1D4B8}",
    csub: "\u2ACF",
    csube: "\u2AD1",
    csup: "\u2AD0",
    csupe: "\u2AD2",
    ctdot: "\u22EF",
    cudarrl: "\u2938",
    cudarrr: "\u2935",
    cuepr: "\u22DE",
    cuesc: "\u22DF",
    cularr: "\u21B6",
    cularrp: "\u293D",
    cup: "\u222A",
    cupbrcap: "\u2A48",
    cupcap: "\u2A46",
    cupcup: "\u2A4A",
    cupdot: "\u228D",
    cupor: "\u2A45",
    cups: "\u222A\uFE00",
    curarr: "\u21B7",
    curarrm: "\u293C",
    curlyeqprec: "\u22DE",
    curlyeqsucc: "\u22DF",
    curlyvee: "\u22CE",
    curlywedge: "\u22CF",
    curre: "\xA4",
    curren: "\xA4",
    curvearrowleft: "\u21B6",
    curvearrowright: "\u21B7",
    cuvee: "\u22CE",
    cuwed: "\u22CF",
    cwconint: "\u2232",
    cwint: "\u2231",
    cylcty: "\u232D",
    dArr: "\u21D3",
    dHar: "\u2965",
    dagger: "\u2020",
    daleth: "\u2138",
    darr: "\u2193",
    dash: "\u2010",
    dashv: "\u22A3",
    dbkarow: "\u290F",
    dblac: "\u02DD",
    dcaron: "\u010F",
    dcy: "\u0434",
    dd: "\u2146",
    ddagger: "\u2021",
    ddarr: "\u21CA",
    ddotseq: "\u2A77",
    de: "\xB0",
    deg: "\xB0",
    delta: "\u03B4",
    demptyv: "\u29B1",
    dfisht: "\u297F",
    dfr: "\u{1D521}",
    dharl: "\u21C3",
    dharr: "\u21C2",
    diam: "\u22C4",
    diamond: "\u22C4",
    diamondsuit: "\u2666",
    diams: "\u2666",
    die: "\xA8",
    digamma: "\u03DD",
    disin: "\u22F2",
    div: "\xF7",
    divid: "\xF7",
    divide: "\xF7",
    divideontimes: "\u22C7",
    divonx: "\u22C7",
    djcy: "\u0452",
    dlcorn: "\u231E",
    dlcrop: "\u230D",
    dollar: "$",
    dopf: "\u{1D555}",
    dot: "\u02D9",
    doteq: "\u2250",
    doteqdot: "\u2251",
    dotminus: "\u2238",
    dotplus: "\u2214",
    dotsquare: "\u22A1",
    doublebarwedge: "\u2306",
    downarrow: "\u2193",
    downdownarrows: "\u21CA",
    downharpoonleft: "\u21C3",
    downharpoonright: "\u21C2",
    drbkarow: "\u2910",
    drcorn: "\u231F",
    drcrop: "\u230C",
    dscr: "\u{1D4B9}",
    dscy: "\u0455",
    dsol: "\u29F6",
    dstrok: "\u0111",
    dtdot: "\u22F1",
    dtri: "\u25BF",
    dtrif: "\u25BE",
    duarr: "\u21F5",
    duhar: "\u296F",
    dwangle: "\u29A6",
    dzcy: "\u045F",
    dzigrarr: "\u27FF",
    eDDot: "\u2A77",
    eDot: "\u2251",
    eacut: "\xE9",
    eacute: "\xE9",
    easter: "\u2A6E",
    ecaron: "\u011B",
    ecir: "\xEA",
    ecirc: "\xEA",
    ecolon: "\u2255",
    ecy: "\u044D",
    edot: "\u0117",
    ee: "\u2147",
    efDot: "\u2252",
    efr: "\u{1D522}",
    eg: "\u2A9A",
    egrav: "\xE8",
    egrave: "\xE8",
    egs: "\u2A96",
    egsdot: "\u2A98",
    el: "\u2A99",
    elinters: "\u23E7",
    ell: "\u2113",
    els: "\u2A95",
    elsdot: "\u2A97",
    emacr: "\u0113",
    empty: "\u2205",
    emptyset: "\u2205",
    emptyv: "\u2205",
    emsp13: "\u2004",
    emsp14: "\u2005",
    emsp: "\u2003",
    eng: "\u014B",
    ensp: "\u2002",
    eogon: "\u0119",
    eopf: "\u{1D556}",
    epar: "\u22D5",
    eparsl: "\u29E3",
    eplus: "\u2A71",
    epsi: "\u03B5",
    epsilon: "\u03B5",
    epsiv: "\u03F5",
    eqcirc: "\u2256",
    eqcolon: "\u2255",
    eqsim: "\u2242",
    eqslantgtr: "\u2A96",
    eqslantless: "\u2A95",
    equals: "=",
    equest: "\u225F",
    equiv: "\u2261",
    equivDD: "\u2A78",
    eqvparsl: "\u29E5",
    erDot: "\u2253",
    erarr: "\u2971",
    escr: "\u212F",
    esdot: "\u2250",
    esim: "\u2242",
    eta: "\u03B7",
    et: "\xF0",
    eth: "\xF0",
    eum: "\xEB",
    euml: "\xEB",
    euro: "\u20AC",
    excl: "!",
    exist: "\u2203",
    expectation: "\u2130",
    exponentiale: "\u2147",
    fallingdotseq: "\u2252",
    fcy: "\u0444",
    female: "\u2640",
    ffilig: "\uFB03",
    fflig: "\uFB00",
    ffllig: "\uFB04",
    ffr: "\u{1D523}",
    filig: "\uFB01",
    fjlig: "fj",
    flat: "\u266D",
    fllig: "\uFB02",
    fltns: "\u25B1",
    fnof: "\u0192",
    fopf: "\u{1D557}",
    forall: "\u2200",
    fork: "\u22D4",
    forkv: "\u2AD9",
    fpartint: "\u2A0D",
    frac1: "\xBC",
    frac12: "\xBD",
    frac13: "\u2153",
    frac14: "\xBC",
    frac15: "\u2155",
    frac16: "\u2159",
    frac18: "\u215B",
    frac23: "\u2154",
    frac25: "\u2156",
    frac3: "\xBE",
    frac34: "\xBE",
    frac35: "\u2157",
    frac38: "\u215C",
    frac45: "\u2158",
    frac56: "\u215A",
    frac58: "\u215D",
    frac78: "\u215E",
    frasl: "\u2044",
    frown: "\u2322",
    fscr: "\u{1D4BB}",
    gE: "\u2267",
    gEl: "\u2A8C",
    gacute: "\u01F5",
    gamma: "\u03B3",
    gammad: "\u03DD",
    gap: "\u2A86",
    gbreve: "\u011F",
    gcirc: "\u011D",
    gcy: "\u0433",
    gdot: "\u0121",
    ge: "\u2265",
    gel: "\u22DB",
    geq: "\u2265",
    geqq: "\u2267",
    geqslant: "\u2A7E",
    ges: "\u2A7E",
    gescc: "\u2AA9",
    gesdot: "\u2A80",
    gesdoto: "\u2A82",
    gesdotol: "\u2A84",
    gesl: "\u22DB\uFE00",
    gesles: "\u2A94",
    gfr: "\u{1D524}",
    gg: "\u226B",
    ggg: "\u22D9",
    gimel: "\u2137",
    gjcy: "\u0453",
    gl: "\u2277",
    glE: "\u2A92",
    gla: "\u2AA5",
    glj: "\u2AA4",
    gnE: "\u2269",
    gnap: "\u2A8A",
    gnapprox: "\u2A8A",
    gne: "\u2A88",
    gneq: "\u2A88",
    gneqq: "\u2269",
    gnsim: "\u22E7",
    gopf: "\u{1D558}",
    grave: "`",
    gscr: "\u210A",
    gsim: "\u2273",
    gsime: "\u2A8E",
    gsiml: "\u2A90",
    g: ">",
    gt: ">",
    gtcc: "\u2AA7",
    gtcir: "\u2A7A",
    gtdot: "\u22D7",
    gtlPar: "\u2995",
    gtquest: "\u2A7C",
    gtrapprox: "\u2A86",
    gtrarr: "\u2978",
    gtrdot: "\u22D7",
    gtreqless: "\u22DB",
    gtreqqless: "\u2A8C",
    gtrless: "\u2277",
    gtrsim: "\u2273",
    gvertneqq: "\u2269\uFE00",
    gvnE: "\u2269\uFE00",
    hArr: "\u21D4",
    hairsp: "\u200A",
    half: "\xBD",
    hamilt: "\u210B",
    hardcy: "\u044A",
    harr: "\u2194",
    harrcir: "\u2948",
    harrw: "\u21AD",
    hbar: "\u210F",
    hcirc: "\u0125",
    hearts: "\u2665",
    heartsuit: "\u2665",
    hellip: "\u2026",
    hercon: "\u22B9",
    hfr: "\u{1D525}",
    hksearow: "\u2925",
    hkswarow: "\u2926",
    hoarr: "\u21FF",
    homtht: "\u223B",
    hookleftarrow: "\u21A9",
    hookrightarrow: "\u21AA",
    hopf: "\u{1D559}",
    horbar: "\u2015",
    hscr: "\u{1D4BD}",
    hslash: "\u210F",
    hstrok: "\u0127",
    hybull: "\u2043",
    hyphen: "\u2010",
    iacut: "\xED",
    iacute: "\xED",
    ic: "\u2063",
    icir: "\xEE",
    icirc: "\xEE",
    icy: "\u0438",
    iecy: "\u0435",
    iexc: "\xA1",
    iexcl: "\xA1",
    iff: "\u21D4",
    ifr: "\u{1D526}",
    igrav: "\xEC",
    igrave: "\xEC",
    ii: "\u2148",
    iiiint: "\u2A0C",
    iiint: "\u222D",
    iinfin: "\u29DC",
    iiota: "\u2129",
    ijlig: "\u0133",
    imacr: "\u012B",
    image: "\u2111",
    imagline: "\u2110",
    imagpart: "\u2111",
    imath: "\u0131",
    imof: "\u22B7",
    imped: "\u01B5",
    in: "\u2208",
    incare: "\u2105",
    infin: "\u221E",
    infintie: "\u29DD",
    inodot: "\u0131",
    int: "\u222B",
    intcal: "\u22BA",
    integers: "\u2124",
    intercal: "\u22BA",
    intlarhk: "\u2A17",
    intprod: "\u2A3C",
    iocy: "\u0451",
    iogon: "\u012F",
    iopf: "\u{1D55A}",
    iota: "\u03B9",
    iprod: "\u2A3C",
    iques: "\xBF",
    iquest: "\xBF",
    iscr: "\u{1D4BE}",
    isin: "\u2208",
    isinE: "\u22F9",
    isindot: "\u22F5",
    isins: "\u22F4",
    isinsv: "\u22F3",
    isinv: "\u2208",
    it: "\u2062",
    itilde: "\u0129",
    iukcy: "\u0456",
    ium: "\xEF",
    iuml: "\xEF",
    jcirc: "\u0135",
    jcy: "\u0439",
    jfr: "\u{1D527}",
    jmath: "\u0237",
    jopf: "\u{1D55B}",
    jscr: "\u{1D4BF}",
    jsercy: "\u0458",
    jukcy: "\u0454",
    kappa: "\u03BA",
    kappav: "\u03F0",
    kcedil: "\u0137",
    kcy: "\u043A",
    kfr: "\u{1D528}",
    kgreen: "\u0138",
    khcy: "\u0445",
    kjcy: "\u045C",
    kopf: "\u{1D55C}",
    kscr: "\u{1D4C0}",
    lAarr: "\u21DA",
    lArr: "\u21D0",
    lAtail: "\u291B",
    lBarr: "\u290E",
    lE: "\u2266",
    lEg: "\u2A8B",
    lHar: "\u2962",
    lacute: "\u013A",
    laemptyv: "\u29B4",
    lagran: "\u2112",
    lambda: "\u03BB",
    lang: "\u27E8",
    langd: "\u2991",
    langle: "\u27E8",
    lap: "\u2A85",
    laqu: "\xAB",
    laquo: "\xAB",
    larr: "\u2190",
    larrb: "\u21E4",
    larrbfs: "\u291F",
    larrfs: "\u291D",
    larrhk: "\u21A9",
    larrlp: "\u21AB",
    larrpl: "\u2939",
    larrsim: "\u2973",
    larrtl: "\u21A2",
    lat: "\u2AAB",
    latail: "\u2919",
    late: "\u2AAD",
    lates: "\u2AAD\uFE00",
    lbarr: "\u290C",
    lbbrk: "\u2772",
    lbrace: "{",
    lbrack: "[",
    lbrke: "\u298B",
    lbrksld: "\u298F",
    lbrkslu: "\u298D",
    lcaron: "\u013E",
    lcedil: "\u013C",
    lceil: "\u2308",
    lcub: "{",
    lcy: "\u043B",
    ldca: "\u2936",
    ldquo: "\u201C",
    ldquor: "\u201E",
    ldrdhar: "\u2967",
    ldrushar: "\u294B",
    ldsh: "\u21B2",
    le: "\u2264",
    leftarrow: "\u2190",
    leftarrowtail: "\u21A2",
    leftharpoondown: "\u21BD",
    leftharpoonup: "\u21BC",
    leftleftarrows: "\u21C7",
    leftrightarrow: "\u2194",
    leftrightarrows: "\u21C6",
    leftrightharpoons: "\u21CB",
    leftrightsquigarrow: "\u21AD",
    leftthreetimes: "\u22CB",
    leg: "\u22DA",
    leq: "\u2264",
    leqq: "\u2266",
    leqslant: "\u2A7D",
    les: "\u2A7D",
    lescc: "\u2AA8",
    lesdot: "\u2A7F",
    lesdoto: "\u2A81",
    lesdotor: "\u2A83",
    lesg: "\u22DA\uFE00",
    lesges: "\u2A93",
    lessapprox: "\u2A85",
    lessdot: "\u22D6",
    lesseqgtr: "\u22DA",
    lesseqqgtr: "\u2A8B",
    lessgtr: "\u2276",
    lesssim: "\u2272",
    lfisht: "\u297C",
    lfloor: "\u230A",
    lfr: "\u{1D529}",
    lg: "\u2276",
    lgE: "\u2A91",
    lhard: "\u21BD",
    lharu: "\u21BC",
    lharul: "\u296A",
    lhblk: "\u2584",
    ljcy: "\u0459",
    ll: "\u226A",
    llarr: "\u21C7",
    llcorner: "\u231E",
    llhard: "\u296B",
    lltri: "\u25FA",
    lmidot: "\u0140",
    lmoust: "\u23B0",
    lmoustache: "\u23B0",
    lnE: "\u2268",
    lnap: "\u2A89",
    lnapprox: "\u2A89",
    lne: "\u2A87",
    lneq: "\u2A87",
    lneqq: "\u2268",
    lnsim: "\u22E6",
    loang: "\u27EC",
    loarr: "\u21FD",
    lobrk: "\u27E6",
    longleftarrow: "\u27F5",
    longleftrightarrow: "\u27F7",
    longmapsto: "\u27FC",
    longrightarrow: "\u27F6",
    looparrowleft: "\u21AB",
    looparrowright: "\u21AC",
    lopar: "\u2985",
    lopf: "\u{1D55D}",
    loplus: "\u2A2D",
    lotimes: "\u2A34",
    lowast: "\u2217",
    lowbar: "_",
    loz: "\u25CA",
    lozenge: "\u25CA",
    lozf: "\u29EB",
    lpar: "(",
    lparlt: "\u2993",
    lrarr: "\u21C6",
    lrcorner: "\u231F",
    lrhar: "\u21CB",
    lrhard: "\u296D",
    lrm: "\u200E",
    lrtri: "\u22BF",
    lsaquo: "\u2039",
    lscr: "\u{1D4C1}",
    lsh: "\u21B0",
    lsim: "\u2272",
    lsime: "\u2A8D",
    lsimg: "\u2A8F",
    lsqb: "[",
    lsquo: "\u2018",
    lsquor: "\u201A",
    lstrok: "\u0142",
    l: "<",
    lt: "<",
    ltcc: "\u2AA6",
    ltcir: "\u2A79",
    ltdot: "\u22D6",
    lthree: "\u22CB",
    ltimes: "\u22C9",
    ltlarr: "\u2976",
    ltquest: "\u2A7B",
    ltrPar: "\u2996",
    ltri: "\u25C3",
    ltrie: "\u22B4",
    ltrif: "\u25C2",
    lurdshar: "\u294A",
    luruhar: "\u2966",
    lvertneqq: "\u2268\uFE00",
    lvnE: "\u2268\uFE00",
    mDDot: "\u223A",
    mac: "\xAF",
    macr: "\xAF",
    male: "\u2642",
    malt: "\u2720",
    maltese: "\u2720",
    map: "\u21A6",
    mapsto: "\u21A6",
    mapstodown: "\u21A7",
    mapstoleft: "\u21A4",
    mapstoup: "\u21A5",
    marker: "\u25AE",
    mcomma: "\u2A29",
    mcy: "\u043C",
    mdash: "\u2014",
    measuredangle: "\u2221",
    mfr: "\u{1D52A}",
    mho: "\u2127",
    micr: "\xB5",
    micro: "\xB5",
    mid: "\u2223",
    midast: "*",
    midcir: "\u2AF0",
    middo: "\xB7",
    middot: "\xB7",
    minus: "\u2212",
    minusb: "\u229F",
    minusd: "\u2238",
    minusdu: "\u2A2A",
    mlcp: "\u2ADB",
    mldr: "\u2026",
    mnplus: "\u2213",
    models: "\u22A7",
    mopf: "\u{1D55E}",
    mp: "\u2213",
    mscr: "\u{1D4C2}",
    mstpos: "\u223E",
    mu: "\u03BC",
    multimap: "\u22B8",
    mumap: "\u22B8",
    nGg: "\u22D9\u0338",
    nGt: "\u226B\u20D2",
    nGtv: "\u226B\u0338",
    nLeftarrow: "\u21CD",
    nLeftrightarrow: "\u21CE",
    nLl: "\u22D8\u0338",
    nLt: "\u226A\u20D2",
    nLtv: "\u226A\u0338",
    nRightarrow: "\u21CF",
    nVDash: "\u22AF",
    nVdash: "\u22AE",
    nabla: "\u2207",
    nacute: "\u0144",
    nang: "\u2220\u20D2",
    nap: "\u2249",
    napE: "\u2A70\u0338",
    napid: "\u224B\u0338",
    napos: "\u0149",
    napprox: "\u2249",
    natur: "\u266E",
    natural: "\u266E",
    naturals: "\u2115",
    nbs: "\xA0",
    nbsp: "\xA0",
    nbump: "\u224E\u0338",
    nbumpe: "\u224F\u0338",
    ncap: "\u2A43",
    ncaron: "\u0148",
    ncedil: "\u0146",
    ncong: "\u2247",
    ncongdot: "\u2A6D\u0338",
    ncup: "\u2A42",
    ncy: "\u043D",
    ndash: "\u2013",
    ne: "\u2260",
    neArr: "\u21D7",
    nearhk: "\u2924",
    nearr: "\u2197",
    nearrow: "\u2197",
    nedot: "\u2250\u0338",
    nequiv: "\u2262",
    nesear: "\u2928",
    nesim: "\u2242\u0338",
    nexist: "\u2204",
    nexists: "\u2204",
    nfr: "\u{1D52B}",
    ngE: "\u2267\u0338",
    nge: "\u2271",
    ngeq: "\u2271",
    ngeqq: "\u2267\u0338",
    ngeqslant: "\u2A7E\u0338",
    nges: "\u2A7E\u0338",
    ngsim: "\u2275",
    ngt: "\u226F",
    ngtr: "\u226F",
    nhArr: "\u21CE",
    nharr: "\u21AE",
    nhpar: "\u2AF2",
    ni: "\u220B",
    nis: "\u22FC",
    nisd: "\u22FA",
    niv: "\u220B",
    njcy: "\u045A",
    nlArr: "\u21CD",
    nlE: "\u2266\u0338",
    nlarr: "\u219A",
    nldr: "\u2025",
    nle: "\u2270",
    nleftarrow: "\u219A",
    nleftrightarrow: "\u21AE",
    nleq: "\u2270",
    nleqq: "\u2266\u0338",
    nleqslant: "\u2A7D\u0338",
    nles: "\u2A7D\u0338",
    nless: "\u226E",
    nlsim: "\u2274",
    nlt: "\u226E",
    nltri: "\u22EA",
    nltrie: "\u22EC",
    nmid: "\u2224",
    nopf: "\u{1D55F}",
    no: "\xAC",
    not: "\xAC",
    notin: "\u2209",
    notinE: "\u22F9\u0338",
    notindot: "\u22F5\u0338",
    notinva: "\u2209",
    notinvb: "\u22F7",
    notinvc: "\u22F6",
    notni: "\u220C",
    notniva: "\u220C",
    notnivb: "\u22FE",
    notnivc: "\u22FD",
    npar: "\u2226",
    nparallel: "\u2226",
    nparsl: "\u2AFD\u20E5",
    npart: "\u2202\u0338",
    npolint: "\u2A14",
    npr: "\u2280",
    nprcue: "\u22E0",
    npre: "\u2AAF\u0338",
    nprec: "\u2280",
    npreceq: "\u2AAF\u0338",
    nrArr: "\u21CF",
    nrarr: "\u219B",
    nrarrc: "\u2933\u0338",
    nrarrw: "\u219D\u0338",
    nrightarrow: "\u219B",
    nrtri: "\u22EB",
    nrtrie: "\u22ED",
    nsc: "\u2281",
    nsccue: "\u22E1",
    nsce: "\u2AB0\u0338",
    nscr: "\u{1D4C3}",
    nshortmid: "\u2224",
    nshortparallel: "\u2226",
    nsim: "\u2241",
    nsime: "\u2244",
    nsimeq: "\u2244",
    nsmid: "\u2224",
    nspar: "\u2226",
    nsqsube: "\u22E2",
    nsqsupe: "\u22E3",
    nsub: "\u2284",
    nsubE: "\u2AC5\u0338",
    nsube: "\u2288",
    nsubset: "\u2282\u20D2",
    nsubseteq: "\u2288",
    nsubseteqq: "\u2AC5\u0338",
    nsucc: "\u2281",
    nsucceq: "\u2AB0\u0338",
    nsup: "\u2285",
    nsupE: "\u2AC6\u0338",
    nsupe: "\u2289",
    nsupset: "\u2283\u20D2",
    nsupseteq: "\u2289",
    nsupseteqq: "\u2AC6\u0338",
    ntgl: "\u2279",
    ntild: "\xF1",
    ntilde: "\xF1",
    ntlg: "\u2278",
    ntriangleleft: "\u22EA",
    ntrianglelefteq: "\u22EC",
    ntriangleright: "\u22EB",
    ntrianglerighteq: "\u22ED",
    nu: "\u03BD",
    num: "#",
    numero: "\u2116",
    numsp: "\u2007",
    nvDash: "\u22AD",
    nvHarr: "\u2904",
    nvap: "\u224D\u20D2",
    nvdash: "\u22AC",
    nvge: "\u2265\u20D2",
    nvgt: ">\u20D2",
    nvinfin: "\u29DE",
    nvlArr: "\u2902",
    nvle: "\u2264\u20D2",
    nvlt: "<\u20D2",
    nvltrie: "\u22B4\u20D2",
    nvrArr: "\u2903",
    nvrtrie: "\u22B5\u20D2",
    nvsim: "\u223C\u20D2",
    nwArr: "\u21D6",
    nwarhk: "\u2923",
    nwarr: "\u2196",
    nwarrow: "\u2196",
    nwnear: "\u2927",
    oS: "\u24C8",
    oacut: "\xF3",
    oacute: "\xF3",
    oast: "\u229B",
    ocir: "\xF4",
    ocirc: "\xF4",
    ocy: "\u043E",
    odash: "\u229D",
    odblac: "\u0151",
    odiv: "\u2A38",
    odot: "\u2299",
    odsold: "\u29BC",
    oelig: "\u0153",
    ofcir: "\u29BF",
    ofr: "\u{1D52C}",
    ogon: "\u02DB",
    ograv: "\xF2",
    ograve: "\xF2",
    ogt: "\u29C1",
    ohbar: "\u29B5",
    ohm: "\u03A9",
    oint: "\u222E",
    olarr: "\u21BA",
    olcir: "\u29BE",
    olcross: "\u29BB",
    oline: "\u203E",
    olt: "\u29C0",
    omacr: "\u014D",
    omega: "\u03C9",
    omicron: "\u03BF",
    omid: "\u29B6",
    ominus: "\u2296",
    oopf: "\u{1D560}",
    opar: "\u29B7",
    operp: "\u29B9",
    oplus: "\u2295",
    or: "\u2228",
    orarr: "\u21BB",
    ord: "\xBA",
    order: "\u2134",
    orderof: "\u2134",
    ordf: "\xAA",
    ordm: "\xBA",
    origof: "\u22B6",
    oror: "\u2A56",
    orslope: "\u2A57",
    orv: "\u2A5B",
    oscr: "\u2134",
    oslas: "\xF8",
    oslash: "\xF8",
    osol: "\u2298",
    otild: "\xF5",
    otilde: "\xF5",
    otimes: "\u2297",
    otimesas: "\u2A36",
    oum: "\xF6",
    ouml: "\xF6",
    ovbar: "\u233D",
    par: "\xB6",
    para: "\xB6",
    parallel: "\u2225",
    parsim: "\u2AF3",
    parsl: "\u2AFD",
    part: "\u2202",
    pcy: "\u043F",
    percnt: "%",
    period: ".",
    permil: "\u2030",
    perp: "\u22A5",
    pertenk: "\u2031",
    pfr: "\u{1D52D}",
    phi: "\u03C6",
    phiv: "\u03D5",
    phmmat: "\u2133",
    phone: "\u260E",
    pi: "\u03C0",
    pitchfork: "\u22D4",
    piv: "\u03D6",
    planck: "\u210F",
    planckh: "\u210E",
    plankv: "\u210F",
    plus: "+",
    plusacir: "\u2A23",
    plusb: "\u229E",
    pluscir: "\u2A22",
    plusdo: "\u2214",
    plusdu: "\u2A25",
    pluse: "\u2A72",
    plusm: "\xB1",
    plusmn: "\xB1",
    plussim: "\u2A26",
    plustwo: "\u2A27",
    pm: "\xB1",
    pointint: "\u2A15",
    popf: "\u{1D561}",
    poun: "\xA3",
    pound: "\xA3",
    pr: "\u227A",
    prE: "\u2AB3",
    prap: "\u2AB7",
    prcue: "\u227C",
    pre: "\u2AAF",
    prec: "\u227A",
    precapprox: "\u2AB7",
    preccurlyeq: "\u227C",
    preceq: "\u2AAF",
    precnapprox: "\u2AB9",
    precneqq: "\u2AB5",
    precnsim: "\u22E8",
    precsim: "\u227E",
    prime: "\u2032",
    primes: "\u2119",
    prnE: "\u2AB5",
    prnap: "\u2AB9",
    prnsim: "\u22E8",
    prod: "\u220F",
    profalar: "\u232E",
    profline: "\u2312",
    profsurf: "\u2313",
    prop: "\u221D",
    propto: "\u221D",
    prsim: "\u227E",
    prurel: "\u22B0",
    pscr: "\u{1D4C5}",
    psi: "\u03C8",
    puncsp: "\u2008",
    qfr: "\u{1D52E}",
    qint: "\u2A0C",
    qopf: "\u{1D562}",
    qprime: "\u2057",
    qscr: "\u{1D4C6}",
    quaternions: "\u210D",
    quatint: "\u2A16",
    quest: "?",
    questeq: "\u225F",
    quo: '"',
    quot: '"',
    rAarr: "\u21DB",
    rArr: "\u21D2",
    rAtail: "\u291C",
    rBarr: "\u290F",
    rHar: "\u2964",
    race: "\u223D\u0331",
    racute: "\u0155",
    radic: "\u221A",
    raemptyv: "\u29B3",
    rang: "\u27E9",
    rangd: "\u2992",
    range: "\u29A5",
    rangle: "\u27E9",
    raqu: "\xBB",
    raquo: "\xBB",
    rarr: "\u2192",
    rarrap: "\u2975",
    rarrb: "\u21E5",
    rarrbfs: "\u2920",
    rarrc: "\u2933",
    rarrfs: "\u291E",
    rarrhk: "\u21AA",
    rarrlp: "\u21AC",
    rarrpl: "\u2945",
    rarrsim: "\u2974",
    rarrtl: "\u21A3",
    rarrw: "\u219D",
    ratail: "\u291A",
    ratio: "\u2236",
    rationals: "\u211A",
    rbarr: "\u290D",
    rbbrk: "\u2773",
    rbrace: "}",
    rbrack: "]",
    rbrke: "\u298C",
    rbrksld: "\u298E",
    rbrkslu: "\u2990",
    rcaron: "\u0159",
    rcedil: "\u0157",
    rceil: "\u2309",
    rcub: "}",
    rcy: "\u0440",
    rdca: "\u2937",
    rdldhar: "\u2969",
    rdquo: "\u201D",
    rdquor: "\u201D",
    rdsh: "\u21B3",
    real: "\u211C",
    realine: "\u211B",
    realpart: "\u211C",
    reals: "\u211D",
    rect: "\u25AD",
    re: "\xAE",
    reg: "\xAE",
    rfisht: "\u297D",
    rfloor: "\u230B",
    rfr: "\u{1D52F}",
    rhard: "\u21C1",
    rharu: "\u21C0",
    rharul: "\u296C",
    rho: "\u03C1",
    rhov: "\u03F1",
    rightarrow: "\u2192",
    rightarrowtail: "\u21A3",
    rightharpoondown: "\u21C1",
    rightharpoonup: "\u21C0",
    rightleftarrows: "\u21C4",
    rightleftharpoons: "\u21CC",
    rightrightarrows: "\u21C9",
    rightsquigarrow: "\u219D",
    rightthreetimes: "\u22CC",
    ring: "\u02DA",
    risingdotseq: "\u2253",
    rlarr: "\u21C4",
    rlhar: "\u21CC",
    rlm: "\u200F",
    rmoust: "\u23B1",
    rmoustache: "\u23B1",
    rnmid: "\u2AEE",
    roang: "\u27ED",
    roarr: "\u21FE",
    robrk: "\u27E7",
    ropar: "\u2986",
    ropf: "\u{1D563}",
    roplus: "\u2A2E",
    rotimes: "\u2A35",
    rpar: ")",
    rpargt: "\u2994",
    rppolint: "\u2A12",
    rrarr: "\u21C9",
    rsaquo: "\u203A",
    rscr: "\u{1D4C7}",
    rsh: "\u21B1",
    rsqb: "]",
    rsquo: "\u2019",
    rsquor: "\u2019",
    rthree: "\u22CC",
    rtimes: "\u22CA",
    rtri: "\u25B9",
    rtrie: "\u22B5",
    rtrif: "\u25B8",
    rtriltri: "\u29CE",
    ruluhar: "\u2968",
    rx: "\u211E",
    sacute: "\u015B",
    sbquo: "\u201A",
    sc: "\u227B",
    scE: "\u2AB4",
    scap: "\u2AB8",
    scaron: "\u0161",
    sccue: "\u227D",
    sce: "\u2AB0",
    scedil: "\u015F",
    scirc: "\u015D",
    scnE: "\u2AB6",
    scnap: "\u2ABA",
    scnsim: "\u22E9",
    scpolint: "\u2A13",
    scsim: "\u227F",
    scy: "\u0441",
    sdot: "\u22C5",
    sdotb: "\u22A1",
    sdote: "\u2A66",
    seArr: "\u21D8",
    searhk: "\u2925",
    searr: "\u2198",
    searrow: "\u2198",
    sec: "\xA7",
    sect: "\xA7",
    semi: ";",
    seswar: "\u2929",
    setminus: "\u2216",
    setmn: "\u2216",
    sext: "\u2736",
    sfr: "\u{1D530}",
    sfrown: "\u2322",
    sharp: "\u266F",
    shchcy: "\u0449",
    shcy: "\u0448",
    shortmid: "\u2223",
    shortparallel: "\u2225",
    sh: "\xAD",
    shy: "\xAD",
    sigma: "\u03C3",
    sigmaf: "\u03C2",
    sigmav: "\u03C2",
    sim: "\u223C",
    simdot: "\u2A6A",
    sime: "\u2243",
    simeq: "\u2243",
    simg: "\u2A9E",
    simgE: "\u2AA0",
    siml: "\u2A9D",
    simlE: "\u2A9F",
    simne: "\u2246",
    simplus: "\u2A24",
    simrarr: "\u2972",
    slarr: "\u2190",
    smallsetminus: "\u2216",
    smashp: "\u2A33",
    smeparsl: "\u29E4",
    smid: "\u2223",
    smile: "\u2323",
    smt: "\u2AAA",
    smte: "\u2AAC",
    smtes: "\u2AAC\uFE00",
    softcy: "\u044C",
    sol: "/",
    solb: "\u29C4",
    solbar: "\u233F",
    sopf: "\u{1D564}",
    spades: "\u2660",
    spadesuit: "\u2660",
    spar: "\u2225",
    sqcap: "\u2293",
    sqcaps: "\u2293\uFE00",
    sqcup: "\u2294",
    sqcups: "\u2294\uFE00",
    sqsub: "\u228F",
    sqsube: "\u2291",
    sqsubset: "\u228F",
    sqsubseteq: "\u2291",
    sqsup: "\u2290",
    sqsupe: "\u2292",
    sqsupset: "\u2290",
    sqsupseteq: "\u2292",
    squ: "\u25A1",
    square: "\u25A1",
    squarf: "\u25AA",
    squf: "\u25AA",
    srarr: "\u2192",
    sscr: "\u{1D4C8}",
    ssetmn: "\u2216",
    ssmile: "\u2323",
    sstarf: "\u22C6",
    star: "\u2606",
    starf: "\u2605",
    straightepsilon: "\u03F5",
    straightphi: "\u03D5",
    strns: "\xAF",
    sub: "\u2282",
    subE: "\u2AC5",
    subdot: "\u2ABD",
    sube: "\u2286",
    subedot: "\u2AC3",
    submult: "\u2AC1",
    subnE: "\u2ACB",
    subne: "\u228A",
    subplus: "\u2ABF",
    subrarr: "\u2979",
    subset: "\u2282",
    subseteq: "\u2286",
    subseteqq: "\u2AC5",
    subsetneq: "\u228A",
    subsetneqq: "\u2ACB",
    subsim: "\u2AC7",
    subsub: "\u2AD5",
    subsup: "\u2AD3",
    succ: "\u227B",
    succapprox: "\u2AB8",
    succcurlyeq: "\u227D",
    succeq: "\u2AB0",
    succnapprox: "\u2ABA",
    succneqq: "\u2AB6",
    succnsim: "\u22E9",
    succsim: "\u227F",
    sum: "\u2211",
    sung: "\u266A",
    sup: "\u2283",
    sup1: "\xB9",
    sup2: "\xB2",
    sup3: "\xB3",
    supE: "\u2AC6",
    supdot: "\u2ABE",
    supdsub: "\u2AD8",
    supe: "\u2287",
    supedot: "\u2AC4",
    suphsol: "\u27C9",
    suphsub: "\u2AD7",
    suplarr: "\u297B",
    supmult: "\u2AC2",
    supnE: "\u2ACC",
    supne: "\u228B",
    supplus: "\u2AC0",
    supset: "\u2283",
    supseteq: "\u2287",
    supseteqq: "\u2AC6",
    supsetneq: "\u228B",
    supsetneqq: "\u2ACC",
    supsim: "\u2AC8",
    supsub: "\u2AD4",
    supsup: "\u2AD6",
    swArr: "\u21D9",
    swarhk: "\u2926",
    swarr: "\u2199",
    swarrow: "\u2199",
    swnwar: "\u292A",
    szli: "\xDF",
    szlig: "\xDF",
    target: "\u2316",
    tau: "\u03C4",
    tbrk: "\u23B4",
    tcaron: "\u0165",
    tcedil: "\u0163",
    tcy: "\u0442",
    tdot: "\u20DB",
    telrec: "\u2315",
    tfr: "\u{1D531}",
    there4: "\u2234",
    therefore: "\u2234",
    theta: "\u03B8",
    thetasym: "\u03D1",
    thetav: "\u03D1",
    thickapprox: "\u2248",
    thicksim: "\u223C",
    thinsp: "\u2009",
    thkap: "\u2248",
    thksim: "\u223C",
    thor: "\xFE",
    thorn: "\xFE",
    tilde: "\u02DC",
    time: "\xD7",
    times: "\xD7",
    timesb: "\u22A0",
    timesbar: "\u2A31",
    timesd: "\u2A30",
    tint: "\u222D",
    toea: "\u2928",
    top: "\u22A4",
    topbot: "\u2336",
    topcir: "\u2AF1",
    topf: "\u{1D565}",
    topfork: "\u2ADA",
    tosa: "\u2929",
    tprime: "\u2034",
    trade: "\u2122",
    triangle: "\u25B5",
    triangledown: "\u25BF",
    triangleleft: "\u25C3",
    trianglelefteq: "\u22B4",
    triangleq: "\u225C",
    triangleright: "\u25B9",
    trianglerighteq: "\u22B5",
    tridot: "\u25EC",
    trie: "\u225C",
    triminus: "\u2A3A",
    triplus: "\u2A39",
    trisb: "\u29CD",
    tritime: "\u2A3B",
    trpezium: "\u23E2",
    tscr: "\u{1D4C9}",
    tscy: "\u0446",
    tshcy: "\u045B",
    tstrok: "\u0167",
    twixt: "\u226C",
    twoheadleftarrow: "\u219E",
    twoheadrightarrow: "\u21A0",
    uArr: "\u21D1",
    uHar: "\u2963",
    uacut: "\xFA",
    uacute: "\xFA",
    uarr: "\u2191",
    ubrcy: "\u045E",
    ubreve: "\u016D",
    ucir: "\xFB",
    ucirc: "\xFB",
    ucy: "\u0443",
    udarr: "\u21C5",
    udblac: "\u0171",
    udhar: "\u296E",
    ufisht: "\u297E",
    ufr: "\u{1D532}",
    ugrav: "\xF9",
    ugrave: "\xF9",
    uharl: "\u21BF",
    uharr: "\u21BE",
    uhblk: "\u2580",
    ulcorn: "\u231C",
    ulcorner: "\u231C",
    ulcrop: "\u230F",
    ultri: "\u25F8",
    umacr: "\u016B",
    um: "\xA8",
    uml: "\xA8",
    uogon: "\u0173",
    uopf: "\u{1D566}",
    uparrow: "\u2191",
    updownarrow: "\u2195",
    upharpoonleft: "\u21BF",
    upharpoonright: "\u21BE",
    uplus: "\u228E",
    upsi: "\u03C5",
    upsih: "\u03D2",
    upsilon: "\u03C5",
    upuparrows: "\u21C8",
    urcorn: "\u231D",
    urcorner: "\u231D",
    urcrop: "\u230E",
    uring: "\u016F",
    urtri: "\u25F9",
    uscr: "\u{1D4CA}",
    utdot: "\u22F0",
    utilde: "\u0169",
    utri: "\u25B5",
    utrif: "\u25B4",
    uuarr: "\u21C8",
    uum: "\xFC",
    uuml: "\xFC",
    uwangle: "\u29A7",
    vArr: "\u21D5",
    vBar: "\u2AE8",
    vBarv: "\u2AE9",
    vDash: "\u22A8",
    vangrt: "\u299C",
    varepsilon: "\u03F5",
    varkappa: "\u03F0",
    varnothing: "\u2205",
    varphi: "\u03D5",
    varpi: "\u03D6",
    varpropto: "\u221D",
    varr: "\u2195",
    varrho: "\u03F1",
    varsigma: "\u03C2",
    varsubsetneq: "\u228A\uFE00",
    varsubsetneqq: "\u2ACB\uFE00",
    varsupsetneq: "\u228B\uFE00",
    varsupsetneqq: "\u2ACC\uFE00",
    vartheta: "\u03D1",
    vartriangleleft: "\u22B2",
    vartriangleright: "\u22B3",
    vcy: "\u0432",
    vdash: "\u22A2",
    vee: "\u2228",
    veebar: "\u22BB",
    veeeq: "\u225A",
    vellip: "\u22EE",
    verbar: "|",
    vert: "|",
    vfr: "\u{1D533}",
    vltri: "\u22B2",
    vnsub: "\u2282\u20D2",
    vnsup: "\u2283\u20D2",
    vopf: "\u{1D567}",
    vprop: "\u221D",
    vrtri: "\u22B3",
    vscr: "\u{1D4CB}",
    vsubnE: "\u2ACB\uFE00",
    vsubne: "\u228A\uFE00",
    vsupnE: "\u2ACC\uFE00",
    vsupne: "\u228B\uFE00",
    vzigzag: "\u299A",
    wcirc: "\u0175",
    wedbar: "\u2A5F",
    wedge: "\u2227",
    wedgeq: "\u2259",
    weierp: "\u2118",
    wfr: "\u{1D534}",
    wopf: "\u{1D568}",
    wp: "\u2118",
    wr: "\u2240",
    wreath: "\u2240",
    wscr: "\u{1D4CC}",
    xcap: "\u22C2",
    xcirc: "\u25EF",
    xcup: "\u22C3",
    xdtri: "\u25BD",
    xfr: "\u{1D535}",
    xhArr: "\u27FA",
    xharr: "\u27F7",
    xi: "\u03BE",
    xlArr: "\u27F8",
    xlarr: "\u27F5",
    xmap: "\u27FC",
    xnis: "\u22FB",
    xodot: "\u2A00",
    xopf: "\u{1D569}",
    xoplus: "\u2A01",
    xotime: "\u2A02",
    xrArr: "\u27F9",
    xrarr: "\u27F6",
    xscr: "\u{1D4CD}",
    xsqcup: "\u2A06",
    xuplus: "\u2A04",
    xutri: "\u25B3",
    xvee: "\u22C1",
    xwedge: "\u22C0",
    yacut: "\xFD",
    yacute: "\xFD",
    yacy: "\u044F",
    ycirc: "\u0177",
    ycy: "\u044B",
    ye: "\xA5",
    yen: "\xA5",
    yfr: "\u{1D536}",
    yicy: "\u0457",
    yopf: "\u{1D56A}",
    yscr: "\u{1D4CE}",
    yucy: "\u044E",
    yum: "\xFF",
    yuml: "\xFF",
    zacute: "\u017A",
    zcaron: "\u017E",
    zcy: "\u0437",
    zdot: "\u017C",
    zeetrf: "\u2128",
    zeta: "\u03B6",
    zfr: "\u{1D537}",
    zhcy: "\u0436",
    zigrarr: "\u21DD",
    zopf: "\u{1D56B}",
    zscr: "\u{1D4CF}",
    zwj: "\u200D",
    zwnj: "\u200C"
  };
});

// node_modules/parse-entities/decode-entity.js
var require_decode_entity = __commonJS((exports2, module2) => {
  "use strict";
  var characterEntities = require_character_entities();
  module2.exports = decodeEntity;
  var own = {}.hasOwnProperty;
  function decodeEntity(characters) {
    return own.call(characterEntities, characters) ? characterEntities[characters] : false;
  }
});

// node_modules/micromark/dist/character/ascii-digit.js
var require_ascii_digit = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var asciiDigit = regexCheck(/\d/);
  module2.exports = asciiDigit;
});

// node_modules/micromark/dist/character/ascii-hex-digit.js
var require_ascii_hex_digit = __commonJS((exports2, module2) => {
  "use strict";
  var regexCheck = require_regex_check();
  var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
  module2.exports = asciiHexDigit;
});

// node_modules/micromark/dist/tokenize/character-reference.js
var require_character_reference = __commonJS((exports2, module2) => {
  "use strict";
  var decodeEntity = require_decode_entity();
  var asciiAlphanumeric = require_ascii_alphanumeric();
  var asciiDigit = require_ascii_digit();
  var asciiHexDigit = require_ascii_hex_digit();
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var decodeEntity__default = /* @__PURE__ */ _interopDefaultLegacy(decodeEntity);
  var characterReference = {
    name: "characterReference",
    tokenize: tokenizeCharacterReference
  };
  function tokenizeCharacterReference(effects, ok, nok) {
    var self2 = this;
    var size = 0;
    var max;
    var test;
    return start;
    function start(code) {
      effects.enter("characterReference");
      effects.enter("characterReferenceMarker");
      effects.consume(code);
      effects.exit("characterReferenceMarker");
      return open;
    }
    function open(code) {
      if (code === 35) {
        effects.enter("characterReferenceMarkerNumeric");
        effects.consume(code);
        effects.exit("characterReferenceMarkerNumeric");
        return numeric;
      }
      effects.enter("characterReferenceValue");
      max = 31;
      test = asciiAlphanumeric;
      return value(code);
    }
    function numeric(code) {
      if (code === 88 || code === 120) {
        effects.enter("characterReferenceMarkerHexadecimal");
        effects.consume(code);
        effects.exit("characterReferenceMarkerHexadecimal");
        effects.enter("characterReferenceValue");
        max = 6;
        test = asciiHexDigit;
        return value;
      }
      effects.enter("characterReferenceValue");
      max = 7;
      test = asciiDigit;
      return value(code);
    }
    function value(code) {
      var token;
      if (code === 59 && size) {
        token = effects.exit("characterReferenceValue");
        if (test === asciiAlphanumeric && !decodeEntity__default["default"](self2.sliceSerialize(token))) {
          return nok(code);
        }
        effects.enter("characterReferenceMarker");
        effects.consume(code);
        effects.exit("characterReferenceMarker");
        effects.exit("characterReference");
        return ok;
      }
      if (test(code) && size++ < max) {
        effects.consume(code);
        return value;
      }
      return nok(code);
    }
  }
  module2.exports = characterReference;
});

// node_modules/micromark/dist/tokenize/code-fenced.js
var require_code_fenced = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var prefixSize = require_prefix_size();
  var factorySpace = require_factory_space();
  var codeFenced = {
    name: "codeFenced",
    tokenize: tokenizeCodeFenced,
    concrete: true
  };
  function tokenizeCodeFenced(effects, ok, nok) {
    var self2 = this;
    var closingFenceConstruct = {
      tokenize: tokenizeClosingFence,
      partial: true
    };
    var initialPrefix = prefixSize(this.events, "linePrefix");
    var sizeOpen = 0;
    var marker;
    return start;
    function start(code) {
      effects.enter("codeFenced");
      effects.enter("codeFencedFence");
      effects.enter("codeFencedFenceSequence");
      marker = code;
      return sequenceOpen(code);
    }
    function sequenceOpen(code) {
      if (code === marker) {
        effects.consume(code);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit("codeFencedFenceSequence");
      return sizeOpen < 3 ? nok(code) : factorySpace(effects, infoOpen, "whitespace")(code);
    }
    function infoOpen(code) {
      if (code === null || markdownLineEnding(code)) {
        return openAfter(code);
      }
      effects.enter("codeFencedFenceInfo");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return info(code);
    }
    function info(code) {
      if (code === null || markdownLineEndingOrSpace(code)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return factorySpace(effects, infoAfter, "whitespace")(code);
      }
      if (code === 96 && code === marker)
        return nok(code);
      effects.consume(code);
      return info;
    }
    function infoAfter(code) {
      if (code === null || markdownLineEnding(code)) {
        return openAfter(code);
      }
      effects.enter("codeFencedFenceMeta");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return meta(code);
    }
    function meta(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceMeta");
        return openAfter(code);
      }
      if (code === 96 && code === marker)
        return nok(code);
      effects.consume(code);
      return meta;
    }
    function openAfter(code) {
      effects.exit("codeFencedFence");
      return self2.interrupt ? ok(code) : content(code);
    }
    function content(code) {
      if (code === null) {
        return after(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return effects.attempt(closingFenceConstruct, after, initialPrefix ? factorySpace(effects, content, "linePrefix", initialPrefix + 1) : content);
      }
      effects.enter("codeFlowValue");
      return contentContinue(code);
    }
    function contentContinue(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("codeFlowValue");
        return content(code);
      }
      effects.consume(code);
      return contentContinue;
    }
    function after(code) {
      effects.exit("codeFenced");
      return ok(code);
    }
    function tokenizeClosingFence(effects2, ok2, nok2) {
      var size = 0;
      return factorySpace(effects2, closingSequenceStart, "linePrefix", this.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
      function closingSequenceStart(code) {
        effects2.enter("codeFencedFence");
        effects2.enter("codeFencedFenceSequence");
        return closingSequence(code);
      }
      function closingSequence(code) {
        if (code === marker) {
          effects2.consume(code);
          size++;
          return closingSequence;
        }
        if (size < sizeOpen)
          return nok2(code);
        effects2.exit("codeFencedFenceSequence");
        return factorySpace(effects2, closingSequenceEnd, "whitespace")(code);
      }
      function closingSequenceEnd(code) {
        if (code === null || markdownLineEnding(code)) {
          effects2.exit("codeFencedFence");
          return ok2(code);
        }
        return nok2(code);
      }
    }
  }
  module2.exports = codeFenced;
});

// node_modules/micromark/dist/tokenize/code-indented.js
var require_code_indented = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var chunkedSplice = require_chunked_splice();
  var prefixSize = require_prefix_size();
  var factorySpace = require_factory_space();
  var codeIndented = {
    name: "codeIndented",
    tokenize: tokenizeCodeIndented,
    resolve: resolveCodeIndented
  };
  var indentedContentConstruct = {
    tokenize: tokenizeIndentedContent,
    partial: true
  };
  function resolveCodeIndented(events, context) {
    var code = {
      type: "codeIndented",
      start: events[0][1].start,
      end: events[events.length - 1][1].end
    };
    chunkedSplice(events, 0, 0, [["enter", code, context]]);
    chunkedSplice(events, events.length, 0, [["exit", code, context]]);
    return events;
  }
  function tokenizeCodeIndented(effects, ok, nok) {
    return effects.attempt(indentedContentConstruct, afterPrefix, nok);
    function afterPrefix(code) {
      if (code === null) {
        return ok(code);
      }
      if (markdownLineEnding(code)) {
        return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code);
      }
      effects.enter("codeFlowValue");
      return content(code);
    }
    function content(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("codeFlowValue");
        return afterPrefix(code);
      }
      effects.consume(code);
      return content;
    }
  }
  function tokenizeIndentedContent(effects, ok, nok) {
    var self2 = this;
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1);
    function afterPrefix(code) {
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1);
      }
      return prefixSize(self2.events, "linePrefix") < 4 ? nok(code) : ok(code);
    }
  }
  module2.exports = codeIndented;
});

// node_modules/micromark/dist/tokenize/code-text.js
var require_code_text = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var codeText = {
    name: "codeText",
    tokenize: tokenizeCodeText,
    resolve: resolveCodeText,
    previous
  };
  function resolveCodeText(events) {
    var tailExitIndex = events.length - 4;
    var headEnterIndex = 3;
    var index;
    var enter;
    if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
      index = headEnterIndex;
      while (++index < tailExitIndex) {
        if (events[index][1].type === "codeTextData") {
          events[tailExitIndex][1].type = events[headEnterIndex][1].type = "codeTextPadding";
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }
    index = headEnterIndex - 1;
    tailExitIndex++;
    while (++index <= tailExitIndex) {
      if (enter === void 0) {
        if (index !== tailExitIndex && events[index][1].type !== "lineEnding") {
          enter = index;
        }
      } else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
        events[enter][1].type = "codeTextData";
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          tailExitIndex -= index - enter - 2;
          index = enter + 2;
        }
        enter = void 0;
      }
    }
    return events;
  }
  function previous(code) {
    return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function tokenizeCodeText(effects, ok, nok) {
    var sizeOpen = 0;
    var size;
    var token;
    return start;
    function start(code) {
      effects.enter("codeText");
      effects.enter("codeTextSequence");
      return openingSequence(code);
    }
    function openingSequence(code) {
      if (code === 96) {
        effects.consume(code);
        sizeOpen++;
        return openingSequence;
      }
      effects.exit("codeTextSequence");
      return gap(code);
    }
    function gap(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 96) {
        token = effects.enter("codeTextSequence");
        size = 0;
        return closingSequence(code);
      }
      if (code === 32) {
        effects.enter("space");
        effects.consume(code);
        effects.exit("space");
        return gap;
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return gap;
      }
      effects.enter("codeTextData");
      return data(code);
    }
    function data(code) {
      if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
        effects.exit("codeTextData");
        return gap(code);
      }
      effects.consume(code);
      return data;
    }
    function closingSequence(code) {
      if (code === 96) {
        effects.consume(code);
        size++;
        return closingSequence;
      }
      if (size === sizeOpen) {
        effects.exit("codeTextSequence");
        effects.exit("codeText");
        return ok(code);
      }
      token.type = "codeTextData";
      return data(code);
    }
  }
  module2.exports = codeText;
});

// node_modules/micromark/dist/tokenize/factory-destination.js
var require_factory_destination = __commonJS((exports2, module2) => {
  "use strict";
  var asciiControl = require_ascii_control();
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var markdownLineEnding = require_markdown_line_ending();
  function destinationFactory(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    var limit = max || Infinity;
    var balance = 0;
    return start;
    function start(code) {
      if (code === 60) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code);
        effects.exit(literalMarkerType);
        return destinationEnclosedBefore;
      }
      if (asciiControl(code) || code === 41) {
        return nok(code);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return destinationRaw(code);
    }
    function destinationEnclosedBefore(code) {
      if (code === 62) {
        effects.enter(literalMarkerType);
        effects.consume(code);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok;
      }
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return destinationEnclosed(code);
    }
    function destinationEnclosed(code) {
      if (code === 62) {
        effects.exit("chunkString");
        effects.exit(stringType);
        return destinationEnclosedBefore(code);
      }
      if (code === null || code === 60 || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return code === 92 ? destinationEnclosedEscape : destinationEnclosed;
    }
    function destinationEnclosedEscape(code) {
      if (code === 60 || code === 62 || code === 92) {
        effects.consume(code);
        return destinationEnclosed;
      }
      return destinationEnclosed(code);
    }
    function destinationRaw(code) {
      if (code === 40) {
        if (++balance > limit)
          return nok(code);
        effects.consume(code);
        return destinationRaw;
      }
      if (code === 41) {
        if (!balance--) {
          effects.exit("chunkString");
          effects.exit(stringType);
          effects.exit(rawType);
          effects.exit(type);
          return ok(code);
        }
        effects.consume(code);
        return destinationRaw;
      }
      if (code === null || markdownLineEndingOrSpace(code)) {
        if (balance)
          return nok(code);
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok(code);
      }
      if (asciiControl(code))
        return nok(code);
      effects.consume(code);
      return code === 92 ? destinationRawEscape : destinationRaw;
    }
    function destinationRawEscape(code) {
      if (code === 40 || code === 41 || code === 92) {
        effects.consume(code);
        return destinationRaw;
      }
      return destinationRaw(code);
    }
  }
  module2.exports = destinationFactory;
});

// node_modules/micromark/dist/tokenize/factory-label.js
var require_factory_label = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var markdownSpace = require_markdown_space();
  function labelFactory(effects, ok, nok, type, markerType, stringType) {
    var self2 = this;
    var size = 0;
    var data;
    return start;
    function start(code) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }
    function atBreak(code) {
      if (code === null || code === 91 || code === 93 && !data || code === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs || size > 999) {
        return nok(code);
      }
      if (code === 93) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.exit(type);
        return ok;
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return atBreak;
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return label(code);
    }
    function label(code) {
      if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
        effects.exit("chunkString");
        return atBreak(code);
      }
      effects.consume(code);
      data = data || !markdownSpace(code);
      return code === 92 ? labelEscape : label;
    }
    function labelEscape(code) {
      if (code === 91 || code === 92 || code === 93) {
        effects.consume(code);
        size++;
        return label;
      }
      return label(code);
    }
  }
  module2.exports = labelFactory;
});

// node_modules/micromark/dist/tokenize/factory-whitespace.js
var require_factory_whitespace = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var markdownSpace = require_markdown_space();
  var factorySpace = require_factory_space();
  function whitespaceFactory(effects, ok) {
    var seen;
    return start;
    function start(code) {
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        seen = true;
        return start;
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
      }
      return ok(code);
    }
  }
  module2.exports = whitespaceFactory;
});

// node_modules/micromark/dist/tokenize/factory-title.js
var require_factory_title = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var factorySpace = require_factory_space();
  function titleFactory(effects, ok, nok, type, markerType, stringType) {
    var marker;
    return start;
    function start(code) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      marker = code === 40 ? 41 : code;
      return atFirstTitleBreak;
    }
    function atFirstTitleBreak(code) {
      if (code === marker) {
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.exit(type);
        return ok;
      }
      effects.enter(stringType);
      return atTitleBreak(code);
    }
    function atTitleBreak(code) {
      if (code === marker) {
        effects.exit(stringType);
        return atFirstTitleBreak(marker);
      }
      if (code === null) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return factorySpace(effects, atTitleBreak, "linePrefix");
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return title(code);
    }
    function title(code) {
      if (code === marker || code === null || markdownLineEnding(code)) {
        effects.exit("chunkString");
        return atTitleBreak(code);
      }
      effects.consume(code);
      return code === 92 ? titleEscape : title;
    }
    function titleEscape(code) {
      if (code === marker || code === 92) {
        effects.consume(code);
        return title;
      }
      return title(code);
    }
  }
  module2.exports = titleFactory;
});

// node_modules/micromark/dist/tokenize/definition.js
var require_definition = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var normalizeIdentifier = require_normalize_identifier();
  var factoryDestination = require_factory_destination();
  var factoryLabel = require_factory_label();
  var factorySpace = require_factory_space();
  var factoryWhitespace = require_factory_whitespace();
  var factoryTitle = require_factory_title();
  var definition = {
    name: "definition",
    tokenize: tokenizeDefinition
  };
  var titleConstruct = {
    tokenize: tokenizeTitle,
    partial: true
  };
  function tokenizeDefinition(effects, ok, nok) {
    var self2 = this;
    var identifier;
    return start;
    function start(code) {
      effects.enter("definition");
      return factoryLabel.call(self2, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
    }
    function labelAfter(code) {
      identifier = normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1));
      if (code === 58) {
        effects.enter("definitionMarker");
        effects.consume(code);
        effects.exit("definitionMarker");
        return factoryWhitespace(effects, factoryDestination(effects, effects.attempt(titleConstruct, factorySpace(effects, after, "whitespace"), factorySpace(effects, after, "whitespace")), nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString"));
      }
      return nok(code);
    }
    function after(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("definition");
        if (self2.parser.defined.indexOf(identifier) < 0) {
          self2.parser.defined.push(identifier);
        }
        return ok(code);
      }
      return nok(code);
    }
  }
  function tokenizeTitle(effects, ok, nok) {
    return start;
    function start(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, before)(code) : nok(code);
    }
    function before(code) {
      if (code === 34 || code === 39 || code === 40) {
        return factoryTitle(effects, factorySpace(effects, after, "whitespace"), nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
      }
      return nok(code);
    }
    function after(code) {
      return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
    }
  }
  module2.exports = definition;
});

// node_modules/micromark/dist/tokenize/hard-break-escape.js
var require_hard_break_escape = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var hardBreakEscape = {
    name: "hardBreakEscape",
    tokenize: tokenizeHardBreakEscape
  };
  function tokenizeHardBreakEscape(effects, ok, nok) {
    return start;
    function start(code) {
      effects.enter("hardBreakEscape");
      effects.enter("escapeMarker");
      effects.consume(code);
      return open;
    }
    function open(code) {
      if (markdownLineEnding(code)) {
        effects.exit("escapeMarker");
        effects.exit("hardBreakEscape");
        return ok(code);
      }
      return nok(code);
    }
  }
  module2.exports = hardBreakEscape;
});

// node_modules/micromark/dist/tokenize/heading-atx.js
var require_heading_atx = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var markdownSpace = require_markdown_space();
  var chunkedSplice = require_chunked_splice();
  var factorySpace = require_factory_space();
  var headingAtx = {
    name: "headingAtx",
    tokenize: tokenizeHeadingAtx,
    resolve: resolveHeadingAtx
  };
  function resolveHeadingAtx(events, context) {
    var contentEnd = events.length - 2;
    var contentStart = 3;
    var content;
    var text;
    if (events[contentStart][1].type === "whitespace") {
      contentStart += 2;
    }
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      content = {
        type: "atxHeadingText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      text = {
        type: "chunkText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: "text"
      };
      chunkedSplice(events, contentStart, contentEnd - contentStart + 1, [
        ["enter", content, context],
        ["enter", text, context],
        ["exit", text, context],
        ["exit", content, context]
      ]);
    }
    return events;
  }
  function tokenizeHeadingAtx(effects, ok, nok) {
    var self2 = this;
    var size = 0;
    return start;
    function start(code) {
      effects.enter("atxHeading");
      effects.enter("atxHeadingSequence");
      return fenceOpenInside(code);
    }
    function fenceOpenInside(code) {
      if (code === 35 && size++ < 6) {
        effects.consume(code);
        return fenceOpenInside;
      }
      if (code === null || markdownLineEndingOrSpace(code)) {
        effects.exit("atxHeadingSequence");
        return self2.interrupt ? ok(code) : headingBreak(code);
      }
      return nok(code);
    }
    function headingBreak(code) {
      if (code === 35) {
        effects.enter("atxHeadingSequence");
        return sequence(code);
      }
      if (code === null || markdownLineEnding(code)) {
        effects.exit("atxHeading");
        return ok(code);
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, headingBreak, "whitespace")(code);
      }
      effects.enter("atxHeadingText");
      return data(code);
    }
    function sequence(code) {
      if (code === 35) {
        effects.consume(code);
        return sequence;
      }
      effects.exit("atxHeadingSequence");
      return headingBreak(code);
    }
    function data(code) {
      if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
        effects.exit("atxHeadingText");
        return headingBreak(code);
      }
      effects.consume(code);
      return data;
    }
  }
  module2.exports = headingAtx;
});

// node_modules/micromark/dist/constant/html-block-names.js
var require_html_block_names = __commonJS((exports2, module2) => {
  "use strict";
  var basics = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "source",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ];
  module2.exports = basics;
});

// node_modules/micromark/dist/constant/html-raw-names.js
var require_html_raw_names = __commonJS((exports2, module2) => {
  "use strict";
  var raws = ["pre", "script", "style", "textarea"];
  module2.exports = raws;
});

// node_modules/micromark/dist/tokenize/html-flow.js
var require_html_flow = __commonJS((exports2, module2) => {
  "use strict";
  var asciiAlpha = require_ascii_alpha();
  var asciiAlphanumeric = require_ascii_alphanumeric();
  var markdownLineEnding = require_markdown_line_ending();
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var markdownSpace = require_markdown_space();
  var fromCharCode = require_from_char_code();
  var htmlBlockNames = require_html_block_names();
  var htmlRawNames = require_html_raw_names();
  var partialBlankLine = require_partial_blank_line();
  var htmlFlow = {
    name: "htmlFlow",
    tokenize: tokenizeHtmlFlow,
    resolveTo: resolveToHtmlFlow,
    concrete: true
  };
  var nextBlankConstruct = {
    tokenize: tokenizeNextBlank,
    partial: true
  };
  function resolveToHtmlFlow(events) {
    var index = events.length;
    while (index--) {
      if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") {
        break;
      }
    }
    if (index > 1 && events[index - 2][1].type === "linePrefix") {
      events[index][1].start = events[index - 2][1].start;
      events[index + 1][1].start = events[index - 2][1].start;
      events.splice(index - 2, 2);
    }
    return events;
  }
  function tokenizeHtmlFlow(effects, ok, nok) {
    var self2 = this;
    var kind;
    var startTag;
    var buffer;
    var index;
    var marker;
    return start;
    function start(code) {
      effects.enter("htmlFlow");
      effects.enter("htmlFlowData");
      effects.consume(code);
      return open;
    }
    function open(code) {
      if (code === 33) {
        effects.consume(code);
        return declarationStart;
      }
      if (code === 47) {
        effects.consume(code);
        return tagCloseStart;
      }
      if (code === 63) {
        effects.consume(code);
        kind = 3;
        return self2.interrupt ? ok : continuationDeclarationInside;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        buffer = fromCharCode(code);
        startTag = true;
        return tagName;
      }
      return nok(code);
    }
    function declarationStart(code) {
      if (code === 45) {
        effects.consume(code);
        kind = 2;
        return commentOpenInside;
      }
      if (code === 91) {
        effects.consume(code);
        kind = 5;
        buffer = "CDATA[";
        index = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        kind = 4;
        return self2.interrupt ? ok : continuationDeclarationInside;
      }
      return nok(code);
    }
    function commentOpenInside(code) {
      if (code === 45) {
        effects.consume(code);
        return self2.interrupt ? ok : continuationDeclarationInside;
      }
      return nok(code);
    }
    function cdataOpenInside(code) {
      if (code === buffer.charCodeAt(index++)) {
        effects.consume(code);
        return index === buffer.length ? self2.interrupt ? ok : continuation : cdataOpenInside;
      }
      return nok(code);
    }
    function tagCloseStart(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        buffer = fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }
    function tagName(code) {
      if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
        if (code !== 47 && startTag && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
          kind = 1;
          return self2.interrupt ? ok(code) : continuation(code);
        }
        if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
          kind = 6;
          if (code === 47) {
            effects.consume(code);
            return basicSelfClosing;
          }
          return self2.interrupt ? ok(code) : continuation(code);
        }
        kind = 7;
        return self2.interrupt ? nok(code) : startTag ? completeAttributeNameBefore(code) : completeClosingTagAfter(code);
      }
      if (code === 45 || asciiAlphanumeric(code)) {
        effects.consume(code);
        buffer += fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }
    function basicSelfClosing(code) {
      if (code === 62) {
        effects.consume(code);
        return self2.interrupt ? ok : continuation;
      }
      return nok(code);
    }
    function completeClosingTagAfter(code) {
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeClosingTagAfter;
      }
      return completeEnd(code);
    }
    function completeAttributeNameBefore(code) {
      if (code === 47) {
        effects.consume(code);
        return completeEnd;
      }
      if (code === 58 || code === 95 || asciiAlpha(code)) {
        effects.consume(code);
        return completeAttributeName;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeNameBefore;
      }
      return completeEnd(code);
    }
    function completeAttributeName(code) {
      if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code);
    }
    function completeAttributeNameAfter(code) {
      if (code === 61) {
        effects.consume(code);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code);
    }
    function completeAttributeValueBefore(code) {
      if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
        return nok(code);
      }
      if (code === 34 || code === 39) {
        effects.consume(code);
        marker = code;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeValueBefore;
      }
      marker = void 0;
      return completeAttributeValueUnquoted(code);
    }
    function completeAttributeValueQuoted(code) {
      if (code === marker) {
        effects.consume(code);
        return completeAttributeValueQuotedAfter;
      }
      if (code === null || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return completeAttributeValueQuoted;
    }
    function completeAttributeValueUnquoted(code) {
      if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
        return completeAttributeNameAfter(code);
      }
      effects.consume(code);
      return completeAttributeValueUnquoted;
    }
    function completeAttributeValueQuotedAfter(code) {
      if (code === 47 || code === 62 || markdownSpace(code)) {
        return completeAttributeNameBefore(code);
      }
      return nok(code);
    }
    function completeEnd(code) {
      if (code === 62) {
        effects.consume(code);
        return completeAfter;
      }
      return nok(code);
    }
    function completeAfter(code) {
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAfter;
      }
      return code === null || markdownLineEnding(code) ? continuation(code) : nok(code);
    }
    function continuation(code) {
      if (code === 45 && kind === 2) {
        effects.consume(code);
        return continuationCommentInside;
      }
      if (code === 60 && kind === 1) {
        effects.consume(code);
        return continuationRawTagOpen;
      }
      if (code === 62 && kind === 4) {
        effects.consume(code);
        return continuationClose;
      }
      if (code === 63 && kind === 3) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      if (code === 93 && kind === 5) {
        effects.consume(code);
        return continuationCharacterDataInside;
      }
      if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
        return effects.check(nextBlankConstruct, continuationClose, continuationAtLineEnding)(code);
      }
      if (code === null || markdownLineEnding(code)) {
        return continuationAtLineEnding(code);
      }
      effects.consume(code);
      return continuation;
    }
    function continuationAtLineEnding(code) {
      effects.exit("htmlFlowData");
      return htmlContinueStart(code);
    }
    function htmlContinueStart(code) {
      if (code === null) {
        return done(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter("lineEnding");
        effects.consume(code);
        effects.exit("lineEnding");
        return htmlContinueStart;
      }
      effects.enter("htmlFlowData");
      return continuation(code);
    }
    function continuationCommentInside(code) {
      if (code === 45) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }
    function continuationRawTagOpen(code) {
      if (code === 47) {
        effects.consume(code);
        buffer = "";
        return continuationRawEndTag;
      }
      return continuation(code);
    }
    function continuationRawEndTag(code) {
      if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
        effects.consume(code);
        return continuationClose;
      }
      if (asciiAlpha(code) && buffer.length < 8) {
        effects.consume(code);
        buffer += fromCharCode(code);
        return continuationRawEndTag;
      }
      return continuation(code);
    }
    function continuationCharacterDataInside(code) {
      if (code === 93) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }
    function continuationDeclarationInside(code) {
      if (code === 62) {
        effects.consume(code);
        return continuationClose;
      }
      return continuation(code);
    }
    function continuationClose(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("htmlFlowData");
        return done(code);
      }
      effects.consume(code);
      return continuationClose;
    }
    function done(code) {
      effects.exit("htmlFlow");
      return ok(code);
    }
  }
  function tokenizeNextBlank(effects, ok, nok) {
    return start;
    function start(code) {
      effects.exit("htmlFlowData");
      effects.enter("lineEndingBlank");
      effects.consume(code);
      effects.exit("lineEndingBlank");
      return effects.attempt(partialBlankLine, ok, nok);
    }
  }
  module2.exports = htmlFlow;
});

// node_modules/micromark/dist/tokenize/html-text.js
var require_html_text = __commonJS((exports2, module2) => {
  "use strict";
  var asciiAlpha = require_ascii_alpha();
  var asciiAlphanumeric = require_ascii_alphanumeric();
  var markdownLineEnding = require_markdown_line_ending();
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var markdownSpace = require_markdown_space();
  var factorySpace = require_factory_space();
  var htmlText = {
    name: "htmlText",
    tokenize: tokenizeHtmlText
  };
  function tokenizeHtmlText(effects, ok, nok) {
    var self2 = this;
    var marker;
    var buffer;
    var index;
    var returnState;
    return start;
    function start(code) {
      effects.enter("htmlText");
      effects.enter("htmlTextData");
      effects.consume(code);
      return open;
    }
    function open(code) {
      if (code === 33) {
        effects.consume(code);
        return declarationOpen;
      }
      if (code === 47) {
        effects.consume(code);
        return tagCloseStart;
      }
      if (code === 63) {
        effects.consume(code);
        return instruction;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        return tagOpen;
      }
      return nok(code);
    }
    function declarationOpen(code) {
      if (code === 45) {
        effects.consume(code);
        return commentOpen;
      }
      if (code === 91) {
        effects.consume(code);
        buffer = "CDATA[";
        index = 0;
        return cdataOpen;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        return declaration;
      }
      return nok(code);
    }
    function commentOpen(code) {
      if (code === 45) {
        effects.consume(code);
        return commentStart;
      }
      return nok(code);
    }
    function commentStart(code) {
      if (code === null || code === 62) {
        return nok(code);
      }
      if (code === 45) {
        effects.consume(code);
        return commentStartDash;
      }
      return comment(code);
    }
    function commentStartDash(code) {
      if (code === null || code === 62) {
        return nok(code);
      }
      return comment(code);
    }
    function comment(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 45) {
        effects.consume(code);
        return commentClose;
      }
      if (markdownLineEnding(code)) {
        returnState = comment;
        return atLineEnding(code);
      }
      effects.consume(code);
      return comment;
    }
    function commentClose(code) {
      if (code === 45) {
        effects.consume(code);
        return end;
      }
      return comment(code);
    }
    function cdataOpen(code) {
      if (code === buffer.charCodeAt(index++)) {
        effects.consume(code);
        return index === buffer.length ? cdata : cdataOpen;
      }
      return nok(code);
    }
    function cdata(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 93) {
        effects.consume(code);
        return cdataClose;
      }
      if (markdownLineEnding(code)) {
        returnState = cdata;
        return atLineEnding(code);
      }
      effects.consume(code);
      return cdata;
    }
    function cdataClose(code) {
      if (code === 93) {
        effects.consume(code);
        return cdataEnd;
      }
      return cdata(code);
    }
    function cdataEnd(code) {
      if (code === 62) {
        return end(code);
      }
      if (code === 93) {
        effects.consume(code);
        return cdataEnd;
      }
      return cdata(code);
    }
    function declaration(code) {
      if (code === null || code === 62) {
        return end(code);
      }
      if (markdownLineEnding(code)) {
        returnState = declaration;
        return atLineEnding(code);
      }
      effects.consume(code);
      return declaration;
    }
    function instruction(code) {
      if (code === null) {
        return nok(code);
      }
      if (code === 63) {
        effects.consume(code);
        return instructionClose;
      }
      if (markdownLineEnding(code)) {
        returnState = instruction;
        return atLineEnding(code);
      }
      effects.consume(code);
      return instruction;
    }
    function instructionClose(code) {
      return code === 62 ? end(code) : instruction(code);
    }
    function tagCloseStart(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        return tagClose;
      }
      return nok(code);
    }
    function tagClose(code) {
      if (code === 45 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagClose;
      }
      return tagCloseBetween(code);
    }
    function tagCloseBetween(code) {
      if (markdownLineEnding(code)) {
        returnState = tagCloseBetween;
        return atLineEnding(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagCloseBetween;
      }
      return end(code);
    }
    function tagOpen(code) {
      if (code === 45 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagOpen;
      }
      if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      return nok(code);
    }
    function tagOpenBetween(code) {
      if (code === 47) {
        effects.consume(code);
        return end;
      }
      if (code === 58 || code === 95 || asciiAlpha(code)) {
        effects.consume(code);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenBetween;
        return atLineEnding(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenBetween;
      }
      return end(code);
    }
    function tagOpenAttributeName(code) {
      if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code);
    }
    function tagOpenAttributeNameAfter(code) {
      if (code === 61) {
        effects.consume(code);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeNameAfter;
        return atLineEnding(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code);
    }
    function tagOpenAttributeValueBefore(code) {
      if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
        return nok(code);
      }
      if (code === 34 || code === 39) {
        effects.consume(code);
        marker = code;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeValueBefore;
        return atLineEnding(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code);
      marker = void 0;
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuoted(code) {
      if (code === marker) {
        effects.consume(code);
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code === null) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeValueQuoted;
        return atLineEnding(code);
      }
      effects.consume(code);
      return tagOpenAttributeValueQuoted;
    }
    function tagOpenAttributeValueQuotedAfter(code) {
      if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      return nok(code);
    }
    function tagOpenAttributeValueUnquoted(code) {
      if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
        return nok(code);
      }
      if (code === 62 || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      effects.consume(code);
      return tagOpenAttributeValueUnquoted;
    }
    function atLineEnding(code) {
      effects.exit("htmlTextData");
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, afterPrefix, "linePrefix", self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4);
    }
    function afterPrefix(code) {
      effects.enter("htmlTextData");
      return returnState(code);
    }
    function end(code) {
      if (code === 62) {
        effects.consume(code);
        effects.exit("htmlTextData");
        effects.exit("htmlText");
        return ok;
      }
      return nok(code);
    }
  }
  module2.exports = htmlText;
});

// node_modules/micromark/dist/tokenize/label-end.js
var require_label_end = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var chunkedPush = require_chunked_push();
  var chunkedSplice = require_chunked_splice();
  var normalizeIdentifier = require_normalize_identifier();
  var resolveAll = require_resolve_all();
  var shallow = require_shallow();
  var factoryDestination = require_factory_destination();
  var factoryLabel = require_factory_label();
  var factoryTitle = require_factory_title();
  var factoryWhitespace = require_factory_whitespace();
  var labelEnd = {
    name: "labelEnd",
    tokenize: tokenizeLabelEnd,
    resolveTo: resolveToLabelEnd,
    resolveAll: resolveAllLabelEnd
  };
  var resourceConstruct = {
    tokenize: tokenizeResource
  };
  var fullReferenceConstruct = {
    tokenize: tokenizeFullReference
  };
  var collapsedReferenceConstruct = {
    tokenize: tokenizeCollapsedReference
  };
  function resolveAllLabelEnd(events) {
    var index = -1;
    var token;
    while (++index < events.length) {
      token = events[index][1];
      if (!token._used && (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd")) {
        events.splice(index + 1, token.type === "labelImage" ? 4 : 2);
        token.type = "data";
        index++;
      }
    }
    return events;
  }
  function resolveToLabelEnd(events, context) {
    var index = events.length;
    var offset = 0;
    var group;
    var label;
    var text;
    var token;
    var open;
    var close;
    var media;
    while (index--) {
      token = events[index][1];
      if (open) {
        if (token.type === "link" || token.type === "labelLink" && token._inactive) {
          break;
        }
        if (events[index][0] === "enter" && token.type === "labelLink") {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
          open = index;
          if (token.type !== "labelLink") {
            offset = 2;
            break;
          }
        }
      } else if (token.type === "labelEnd") {
        close = index;
      }
    }
    group = {
      type: events[open][1].type === "labelLink" ? "link" : "image",
      start: shallow(events[open][1].start),
      end: shallow(events[events.length - 1][1].end)
    };
    label = {
      type: "label",
      start: shallow(events[open][1].start),
      end: shallow(events[close][1].end)
    };
    text = {
      type: "labelText",
      start: shallow(events[open + offset + 2][1].end),
      end: shallow(events[close - 2][1].start)
    };
    media = [
      ["enter", group, context],
      ["enter", label, context]
    ];
    media = chunkedPush(media, events.slice(open + 1, open + offset + 3));
    media = chunkedPush(media, [["enter", text, context]]);
    media = chunkedPush(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
    media = chunkedPush(media, [
      ["exit", text, context],
      events[close - 2],
      events[close - 1],
      ["exit", label, context]
    ]);
    media = chunkedPush(media, events.slice(close + 1));
    media = chunkedPush(media, [["exit", group, context]]);
    chunkedSplice(events, open, events.length, media);
    return events;
  }
  function tokenizeLabelEnd(effects, ok, nok) {
    var self2 = this;
    var index = self2.events.length;
    var labelStart;
    var defined;
    while (index--) {
      if ((self2.events[index][1].type === "labelImage" || self2.events[index][1].type === "labelLink") && !self2.events[index][1]._balanced) {
        labelStart = self2.events[index][1];
        break;
      }
    }
    return start;
    function start(code) {
      if (!labelStart) {
        return nok(code);
      }
      if (labelStart._inactive)
        return balanced(code);
      defined = self2.parser.defined.indexOf(normalizeIdentifier(self2.sliceSerialize({
        start: labelStart.end,
        end: self2.now()
      }))) > -1;
      effects.enter("labelEnd");
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      effects.exit("labelEnd");
      return afterLabelEnd;
    }
    function afterLabelEnd(code) {
      if (code === 40) {
        return effects.attempt(resourceConstruct, ok, defined ? ok : balanced)(code);
      }
      if (code === 91) {
        return effects.attempt(fullReferenceConstruct, ok, defined ? effects.attempt(collapsedReferenceConstruct, ok, balanced) : balanced)(code);
      }
      return defined ? ok(code) : balanced(code);
    }
    function balanced(code) {
      labelStart._balanced = true;
      return nok(code);
    }
  }
  function tokenizeResource(effects, ok, nok) {
    return start;
    function start(code) {
      effects.enter("resource");
      effects.enter("resourceMarker");
      effects.consume(code);
      effects.exit("resourceMarker");
      return factoryWhitespace(effects, open);
    }
    function open(code) {
      if (code === 41) {
        return end(code);
      }
      return factoryDestination(effects, destinationAfter, nok, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 3)(code);
    }
    function destinationAfter(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, between)(code) : end(code);
    }
    function between(code) {
      if (code === 34 || code === 39 || code === 40) {
        return factoryTitle(effects, factoryWhitespace(effects, end), nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
      }
      return end(code);
    }
    function end(code) {
      if (code === 41) {
        effects.enter("resourceMarker");
        effects.consume(code);
        effects.exit("resourceMarker");
        effects.exit("resource");
        return ok;
      }
      return nok(code);
    }
  }
  function tokenizeFullReference(effects, ok, nok) {
    var self2 = this;
    return start;
    function start(code) {
      return factoryLabel.call(self2, effects, afterLabel, nok, "reference", "referenceMarker", "referenceString")(code);
    }
    function afterLabel(code) {
      return self2.parser.defined.indexOf(normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1))) < 0 ? nok(code) : ok(code);
    }
  }
  function tokenizeCollapsedReference(effects, ok, nok) {
    return start;
    function start(code) {
      effects.enter("reference");
      effects.enter("referenceMarker");
      effects.consume(code);
      effects.exit("referenceMarker");
      return open;
    }
    function open(code) {
      if (code === 93) {
        effects.enter("referenceMarker");
        effects.consume(code);
        effects.exit("referenceMarker");
        effects.exit("reference");
        return ok;
      }
      return nok(code);
    }
  }
  module2.exports = labelEnd;
});

// node_modules/micromark/dist/tokenize/label-start-image.js
var require_label_start_image = __commonJS((exports2, module2) => {
  "use strict";
  var labelEnd = require_label_end();
  var labelStartImage = {
    name: "labelStartImage",
    tokenize: tokenizeLabelStartImage,
    resolveAll: labelEnd.resolveAll
  };
  function tokenizeLabelStartImage(effects, ok, nok) {
    var self2 = this;
    return start;
    function start(code) {
      effects.enter("labelImage");
      effects.enter("labelImageMarker");
      effects.consume(code);
      effects.exit("labelImageMarker");
      return open;
    }
    function open(code) {
      if (code === 91) {
        effects.enter("labelMarker");
        effects.consume(code);
        effects.exit("labelMarker");
        effects.exit("labelImage");
        return after;
      }
      return nok(code);
    }
    function after(code) {
      return code === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : ok(code);
    }
  }
  module2.exports = labelStartImage;
});

// node_modules/micromark/dist/tokenize/label-start-link.js
var require_label_start_link = __commonJS((exports2, module2) => {
  "use strict";
  var labelEnd = require_label_end();
  var labelStartLink = {
    name: "labelStartLink",
    tokenize: tokenizeLabelStartLink,
    resolveAll: labelEnd.resolveAll
  };
  function tokenizeLabelStartLink(effects, ok, nok) {
    var self2 = this;
    return start;
    function start(code) {
      effects.enter("labelLink");
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      effects.exit("labelLink");
      return after;
    }
    function after(code) {
      return code === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : ok(code);
    }
  }
  module2.exports = labelStartLink;
});

// node_modules/micromark/dist/tokenize/line-ending.js
var require_line_ending = __commonJS((exports2, module2) => {
  "use strict";
  var factorySpace = require_factory_space();
  var lineEnding = {
    name: "lineEnding",
    tokenize: tokenizeLineEnding
  };
  function tokenizeLineEnding(effects, ok) {
    return start;
    function start(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, ok, "linePrefix");
    }
  }
  module2.exports = lineEnding;
});

// node_modules/micromark/dist/tokenize/thematic-break.js
var require_thematic_break = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var markdownSpace = require_markdown_space();
  var factorySpace = require_factory_space();
  var thematicBreak = {
    name: "thematicBreak",
    tokenize: tokenizeThematicBreak
  };
  function tokenizeThematicBreak(effects, ok, nok) {
    var size = 0;
    var marker;
    return start;
    function start(code) {
      effects.enter("thematicBreak");
      marker = code;
      return atBreak(code);
    }
    function atBreak(code) {
      if (code === marker) {
        effects.enter("thematicBreakSequence");
        return sequence(code);
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, atBreak, "whitespace")(code);
      }
      if (size < 3 || code !== null && !markdownLineEnding(code)) {
        return nok(code);
      }
      effects.exit("thematicBreak");
      return ok(code);
    }
    function sequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return sequence;
      }
      effects.exit("thematicBreakSequence");
      return atBreak(code);
    }
  }
  module2.exports = thematicBreak;
});

// node_modules/micromark/dist/tokenize/list.js
var require_list = __commonJS((exports2, module2) => {
  "use strict";
  var asciiDigit = require_ascii_digit();
  var markdownSpace = require_markdown_space();
  var prefixSize = require_prefix_size();
  var sizeChunks = require_size_chunks();
  var factorySpace = require_factory_space();
  var partialBlankLine = require_partial_blank_line();
  var thematicBreak = require_thematic_break();
  var list = {
    name: "list",
    tokenize: tokenizeListStart,
    continuation: {
      tokenize: tokenizeListContinuation
    },
    exit: tokenizeListEnd
  };
  var listItemPrefixWhitespaceConstruct = {
    tokenize: tokenizeListItemPrefixWhitespace,
    partial: true
  };
  var indentConstruct = {
    tokenize: tokenizeIndent,
    partial: true
  };
  function tokenizeListStart(effects, ok, nok) {
    var self2 = this;
    var initialSize = prefixSize(self2.events, "linePrefix");
    var size = 0;
    return start;
    function start(code) {
      var kind = self2.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
      if (kind === "listUnordered" ? !self2.containerState.marker || code === self2.containerState.marker : asciiDigit(code)) {
        if (!self2.containerState.type) {
          self2.containerState.type = kind;
          effects.enter(kind, {
            _container: true
          });
        }
        if (kind === "listUnordered") {
          effects.enter("listItemPrefix");
          return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
        }
        if (!self2.interrupt || code === 49) {
          effects.enter("listItemPrefix");
          effects.enter("listItemValue");
          return inside(code);
        }
      }
      return nok(code);
    }
    function inside(code) {
      if (asciiDigit(code) && ++size < 10) {
        effects.consume(code);
        return inside;
      }
      if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code === self2.containerState.marker : code === 41 || code === 46)) {
        effects.exit("listItemValue");
        return atMarker(code);
      }
      return nok(code);
    }
    function atMarker(code) {
      effects.enter("listItemMarker");
      effects.consume(code);
      effects.exit("listItemMarker");
      self2.containerState.marker = self2.containerState.marker || code;
      return effects.check(partialBlankLine, self2.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
    }
    function onBlank(code) {
      self2.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code);
    }
    function otherPrefix(code) {
      if (markdownSpace(code)) {
        effects.enter("listItemPrefixWhitespace");
        effects.consume(code);
        effects.exit("listItemPrefixWhitespace");
        return endOfPrefix;
      }
      return nok(code);
    }
    function endOfPrefix(code) {
      self2.containerState.size = initialSize + sizeChunks(self2.sliceStream(effects.exit("listItemPrefix")));
      return ok(code);
    }
  }
  function tokenizeListContinuation(effects, ok, nok) {
    var self2 = this;
    self2.containerState._closeFlow = void 0;
    return effects.check(partialBlankLine, onBlank, notBlank);
    function onBlank(code) {
      self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
      return factorySpace(effects, ok, "listItemIndent", self2.containerState.size + 1)(code);
    }
    function notBlank(code) {
      if (self2.containerState.furtherBlankLines || !markdownSpace(code)) {
        self2.containerState.furtherBlankLines = self2.containerState.initialBlankLine = void 0;
        return notInCurrentItem(code);
      }
      self2.containerState.furtherBlankLines = self2.containerState.initialBlankLine = void 0;
      return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
    }
    function notInCurrentItem(code) {
      self2.containerState._closeFlow = true;
      self2.interrupt = void 0;
      return factorySpace(effects, effects.attempt(list, ok, nok), "linePrefix", self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4)(code);
    }
  }
  function tokenizeIndent(effects, ok, nok) {
    var self2 = this;
    return factorySpace(effects, afterPrefix, "listItemIndent", self2.containerState.size + 1);
    function afterPrefix(code) {
      return prefixSize(self2.events, "listItemIndent") === self2.containerState.size ? ok(code) : nok(code);
    }
  }
  function tokenizeListEnd(effects) {
    effects.exit(this.containerState.type);
  }
  function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
    var self2 = this;
    return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self2.parser.constructs.disable.null.indexOf("codeIndented") > -1 ? void 0 : 4 + 1);
    function afterPrefix(code) {
      return markdownSpace(code) || !prefixSize(self2.events, "listItemPrefixWhitespace") ? nok(code) : ok(code);
    }
  }
  module2.exports = list;
});

// node_modules/micromark/dist/tokenize/setext-underline.js
var require_setext_underline = __commonJS((exports2, module2) => {
  "use strict";
  var markdownLineEnding = require_markdown_line_ending();
  var shallow = require_shallow();
  var factorySpace = require_factory_space();
  var setextUnderline = {
    name: "setextUnderline",
    tokenize: tokenizeSetextUnderline,
    resolveTo: resolveToSetextUnderline
  };
  function resolveToSetextUnderline(events, context) {
    var index = events.length;
    var content;
    var text;
    var definition;
    var heading;
    while (index--) {
      if (events[index][0] === "enter") {
        if (events[index][1].type === "content") {
          content = index;
          break;
        }
        if (events[index][1].type === "paragraph") {
          text = index;
        }
      } else {
        if (events[index][1].type === "content") {
          events.splice(index, 1);
        }
        if (!definition && events[index][1].type === "definition") {
          definition = index;
        }
      }
    }
    heading = {
      type: "setextHeading",
      start: shallow(events[text][1].start),
      end: shallow(events[events.length - 1][1].end)
    };
    events[text][1].type = "setextHeadingText";
    if (definition) {
      events.splice(text, 0, ["enter", heading, context]);
      events.splice(definition + 1, 0, ["exit", events[content][1], context]);
      events[content][1].end = shallow(events[definition][1].end);
    } else {
      events[content][1] = heading;
    }
    events.push(["exit", heading, context]);
    return events;
  }
  function tokenizeSetextUnderline(effects, ok, nok) {
    var self2 = this;
    var index = self2.events.length;
    var marker;
    var paragraph;
    while (index--) {
      if (self2.events[index][1].type !== "lineEnding" && self2.events[index][1].type !== "linePrefix" && self2.events[index][1].type !== "content") {
        paragraph = self2.events[index][1].type === "paragraph";
        break;
      }
    }
    return start;
    function start(code) {
      if (!self2.lazy && (self2.interrupt || paragraph)) {
        effects.enter("setextHeadingLine");
        effects.enter("setextHeadingLineSequence");
        marker = code;
        return closingSequence(code);
      }
      return nok(code);
    }
    function closingSequence(code) {
      if (code === marker) {
        effects.consume(code);
        return closingSequence;
      }
      effects.exit("setextHeadingLineSequence");
      return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code);
    }
    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit("setextHeadingLine");
        return ok(code);
      }
      return nok(code);
    }
  }
  module2.exports = setextUnderline;
});

// node_modules/micromark/dist/constructs.js
var require_constructs = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var text$1 = require_text();
  var attention = require_attention();
  var autolink = require_autolink();
  var blockQuote = require_block_quote();
  var characterEscape = require_character_escape();
  var characterReference = require_character_reference();
  var codeFenced = require_code_fenced();
  var codeIndented = require_code_indented();
  var codeText = require_code_text();
  var definition = require_definition();
  var hardBreakEscape = require_hard_break_escape();
  var headingAtx = require_heading_atx();
  var htmlFlow = require_html_flow();
  var htmlText = require_html_text();
  var labelEnd = require_label_end();
  var labelStartImage = require_label_start_image();
  var labelStartLink = require_label_start_link();
  var lineEnding = require_line_ending();
  var list = require_list();
  var setextUnderline = require_setext_underline();
  var thematicBreak = require_thematic_break();
  var document = {
    42: list,
    43: list,
    45: list,
    48: list,
    49: list,
    50: list,
    51: list,
    52: list,
    53: list,
    54: list,
    55: list,
    56: list,
    57: list,
    62: blockQuote
  };
  var contentInitial = {
    91: definition
  };
  var flowInitial = {
    "-2": codeIndented,
    "-1": codeIndented,
    32: codeIndented
  };
  var flow = {
    35: headingAtx,
    42: thematicBreak,
    45: [setextUnderline, thematicBreak],
    60: htmlFlow,
    61: setextUnderline,
    95: thematicBreak,
    96: codeFenced,
    126: codeFenced
  };
  var string = {
    38: characterReference,
    92: characterEscape
  };
  var text = {
    "-5": lineEnding,
    "-4": lineEnding,
    "-3": lineEnding,
    33: labelStartImage,
    38: characterReference,
    42: attention,
    60: [autolink, htmlText],
    91: labelStartLink,
    92: [hardBreakEscape, characterEscape],
    93: labelEnd,
    95: attention,
    96: codeText
  };
  var insideSpan = {
    null: [attention, text$1.resolver]
  };
  var disable = {
    null: []
  };
  exports2.contentInitial = contentInitial;
  exports2.disable = disable;
  exports2.document = document;
  exports2.flow = flow;
  exports2.flowInitial = flowInitial;
  exports2.insideSpan = insideSpan;
  exports2.string = string;
  exports2.text = text;
});

// node_modules/micromark/dist/parse.js
var require_parse = __commonJS((exports2, module2) => {
  "use strict";
  var content = require_content();
  var document = require_document();
  var flow = require_flow();
  var text = require_text();
  var combineExtensions = require_combine_extensions();
  var createTokenizer = require_create_tokenizer();
  var miniflat = require_miniflat();
  var constructs = require_constructs();
  function parse(options) {
    var settings = options || {};
    var parser = {
      defined: [],
      constructs: combineExtensions([constructs].concat(miniflat(settings.extensions))),
      content: create(content),
      document: create(document),
      flow: create(flow),
      string: create(text.string),
      text: create(text.text)
    };
    return parser;
    function create(initializer) {
      return creator;
      function creator(from) {
        return createTokenizer(parser, initializer, from);
      }
    }
  }
  module2.exports = parse;
});

// node_modules/micromark/dist/preprocess.js
var require_preprocess = __commonJS((exports2, module2) => {
  "use strict";
  var search = /[\0\t\n\r]/g;
  function preprocess() {
    var start = true;
    var column = 1;
    var buffer = "";
    var atCarriageReturn;
    return preprocessor;
    function preprocessor(value, encoding, end) {
      var chunks = [];
      var match;
      var next;
      var startPosition;
      var endPosition;
      var code;
      value = buffer + value.toString(encoding);
      startPosition = 0;
      buffer = "";
      if (start) {
        if (value.charCodeAt(0) === 65279) {
          startPosition++;
        }
        start = void 0;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        match = search.exec(value);
        endPosition = match ? match.index : value.length;
        code = value.charCodeAt(endPosition);
        if (!match) {
          buffer = value.slice(startPosition);
          break;
        }
        if (code === 10 && startPosition === endPosition && atCarriageReturn) {
          chunks.push(-3);
          atCarriageReturn = void 0;
        } else {
          if (atCarriageReturn) {
            chunks.push(-5);
            atCarriageReturn = void 0;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          if (code === 0) {
            chunks.push(65533);
            column++;
          } else if (code === 9) {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next)
              chunks.push(-1);
          } else if (code === 10) {
            chunks.push(-4);
            column = 1;
          } else {
            atCarriageReturn = true;
            column = 1;
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn)
          chunks.push(-5);
        if (buffer)
          chunks.push(buffer);
        chunks.push(null);
      }
      return chunks;
    }
  }
  module2.exports = preprocess;
});

// node_modules/micromark/dist/postprocess.js
var require_postprocess = __commonJS((exports2, module2) => {
  "use strict";
  var subtokenize = require_subtokenize();
  function postprocess(events) {
    while (!subtokenize(events)) {
    }
    return events;
  }
  module2.exports = postprocess;
});

// node_modules/mdast-util-from-markdown/dist/index.js
var require_dist = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = fromMarkdown;
  var toString = require_mdast_util_to_string();
  var assign = require_assign();
  var own = require_has_own_property();
  var normalizeIdentifier = require_normalize_identifier();
  var safeFromInt = require_safe_from_int();
  var parser = require_parse();
  var preprocessor = require_preprocess();
  var postprocess = require_postprocess();
  var decode = require_decode_entity();
  var stringifyPosition = require_unist_util_stringify_position();
  function fromMarkdown(value, encoding, options) {
    if (typeof encoding !== "string") {
      options = encoding;
      encoding = void 0;
    }
    return compiler(options)(postprocess(parser(options).document().write(preprocessor()(value, encoding, true))));
  }
  function compiler(options) {
    var settings = options || {};
    var config = configure({
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list, onenterlistordered),
        listUnordered: opener(list),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    }, settings.mdastExtensions || []);
    var data = {};
    return compile;
    function compile(events) {
      var tree = {type: "root", children: []};
      var stack = [tree];
      var tokenStack = [];
      var listStack = [];
      var index = -1;
      var handler;
      var listStart;
      var context = {
        stack,
        tokenStack,
        config,
        enter,
        exit,
        buffer,
        resume,
        setData,
        getData
      };
      while (++index < events.length) {
        if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") {
          if (events[index][0] === "enter") {
            listStack.push(index);
          } else {
            listStart = listStack.pop(index);
            index = prepareList(events, listStart, index);
          }
        }
      }
      index = -1;
      while (++index < events.length) {
        handler = config[events[index][0]];
        if (own.call(handler, events[index][1].type)) {
          handler[events[index][1].type].call(assign({sliceSerialize: events[index][2].sliceSerialize}, context), events[index][1]);
        }
      }
      if (tokenStack.length) {
        throw new Error("Cannot close document, a token (`" + tokenStack[tokenStack.length - 1].type + "`, " + stringifyPosition({
          start: tokenStack[tokenStack.length - 1].start,
          end: tokenStack[tokenStack.length - 1].end
        }) + ") is still open");
      }
      tree.position = {
        start: point(events.length ? events[0][1].start : {line: 1, column: 1, offset: 0}),
        end: point(events.length ? events[events.length - 2][1].end : {line: 1, column: 1, offset: 0})
      };
      index = -1;
      while (++index < config.transforms.length) {
        tree = config.transforms[index](tree) || tree;
      }
      return tree;
    }
    function prepareList(events, start, length) {
      var index = start - 1;
      var containerBalance = -1;
      var listSpread = false;
      var listItem2;
      var tailIndex;
      var lineIndex;
      var tailEvent;
      var event;
      var firstBlankLineIndex;
      var atMarker;
      while (++index <= length) {
        event = events[index];
        if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
          if (event[0] === "enter") {
            containerBalance++;
          } else {
            containerBalance--;
          }
          atMarker = void 0;
        } else if (event[1].type === "lineEndingBlank") {
          if (event[0] === "enter") {
            if (listItem2 && !atMarker && !containerBalance && !firstBlankLineIndex) {
              firstBlankLineIndex = index;
            }
            atMarker = void 0;
          }
        } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {
        } else {
          atMarker = void 0;
        }
        if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
          if (listItem2) {
            tailIndex = index;
            lineIndex = void 0;
            while (tailIndex--) {
              tailEvent = events[tailIndex];
              if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                if (tailEvent[0] === "exit")
                  continue;
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                  listSpread = true;
                }
                tailEvent[1].type = "lineEnding";
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
              } else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem2._spread = true;
            }
            listItem2.end = point(lineIndex ? events[lineIndex][1].start : event[1].end);
            events.splice(lineIndex || index, 0, ["exit", listItem2, event[2]]);
            index++;
            length++;
          }
          if (event[1].type === "listItemPrefix") {
            listItem2 = {
              type: "listItem",
              _spread: false,
              start: point(event[1].start)
            };
            events.splice(index, 0, ["enter", listItem2, event[2]]);
            index++;
            length++;
            firstBlankLineIndex = void 0;
            atMarker = true;
          }
        }
      }
      events[start][1]._spread = listSpread;
      return length;
    }
    function setData(key, value) {
      data[key] = value;
    }
    function getData(key) {
      return data[key];
    }
    function point(d) {
      return {line: d.line, column: d.column, offset: d.offset};
    }
    function opener(create, and) {
      return open;
      function open(token) {
        enter.call(this, create(token), token);
        if (and)
          and.call(this, token);
      }
    }
    function buffer() {
      this.stack.push({type: "fragment", children: []});
    }
    function enter(node, token) {
      this.stack[this.stack.length - 1].children.push(node);
      this.stack.push(node);
      this.tokenStack.push(token);
      node.position = {start: point(token.start)};
      return node;
    }
    function closer(and) {
      return close;
      function close(token) {
        if (and)
          and.call(this, token);
        exit.call(this, token);
      }
    }
    function exit(token) {
      var node = this.stack.pop();
      var open = this.tokenStack.pop();
      if (!open) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({start: token.start, end: token.end}) + "): it\u2019s not open");
      } else if (open.type !== token.type) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({start: token.start, end: token.end}) + "): a different token (`" + open.type + "`, " + stringifyPosition({start: open.start, end: open.end}) + ") is open");
      }
      node.position.end = point(token.end);
      return node;
    }
    function resume() {
      return toString(this.stack.pop());
    }
    function onenterlistordered() {
      setData("expectingFirstListItemValue", true);
    }
    function onenterlistitemvalue(token) {
      if (getData("expectingFirstListItemValue")) {
        this.stack[this.stack.length - 2].start = parseInt(this.sliceSerialize(token), 10);
        setData("expectingFirstListItemValue");
      }
    }
    function onexitcodefencedfenceinfo() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].lang = data2;
    }
    function onexitcodefencedfencemeta() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].meta = data2;
    }
    function onexitcodefencedfence() {
      if (getData("flowCodeInside"))
        return;
      this.buffer();
      setData("flowCodeInside", true);
    }
    function onexitcodefenced() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
      setData("flowCodeInside");
    }
    function onexitcodeindented() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].value = data2;
    }
    function onexitdefinitionlabelstring(token) {
      var label = this.resume();
      this.stack[this.stack.length - 1].label = label;
      this.stack[this.stack.length - 1].identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].title = data2;
    }
    function onexitdefinitiondestinationstring() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].url = data2;
    }
    function onexitatxheadingsequence(token) {
      if (!this.stack[this.stack.length - 1].depth) {
        this.stack[this.stack.length - 1].depth = this.sliceSerialize(token).length;
      }
    }
    function onexitsetextheadingtext() {
      setData("setextHeadingSlurpLineEnding", true);
    }
    function onexitsetextheadinglinesequence(token) {
      this.stack[this.stack.length - 1].depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
    }
    function onexitsetextheading() {
      setData("setextHeadingSlurpLineEnding");
    }
    function onenterdata(token) {
      var siblings = this.stack[this.stack.length - 1].children;
      var tail = siblings[siblings.length - 1];
      if (!tail || tail.type !== "text") {
        tail = text();
        tail.position = {start: point(token.start)};
        this.stack[this.stack.length - 1].children.push(tail);
      }
      this.stack.push(tail);
    }
    function onexitdata(token) {
      var tail = this.stack.pop();
      tail.value += this.sliceSerialize(token);
      tail.position.end = point(token.end);
    }
    function onexitlineending(token) {
      var context = this.stack[this.stack.length - 1];
      if (getData("atHardBreak")) {
        context.children[context.children.length - 1].position.end = point(token.end);
        setData("atHardBreak");
        return;
      }
      if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.indexOf(context.type) > -1) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }
    function onexithardbreak() {
      setData("atHardBreak", true);
    }
    function onexithtmlflow() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].value = data2;
    }
    function onexithtmltext() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].value = data2;
    }
    function onexitcodetext() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].value = data2;
    }
    function onexitlink() {
      var context = this.stack[this.stack.length - 1];
      if (getData("inReference")) {
        context.type += "Reference";
        context.referenceType = getData("referenceType") || "shortcut";
        delete context.url;
        delete context.title;
      } else {
        delete context.identifier;
        delete context.label;
        delete context.referenceType;
      }
      setData("referenceType");
    }
    function onexitimage() {
      var context = this.stack[this.stack.length - 1];
      if (getData("inReference")) {
        context.type += "Reference";
        context.referenceType = getData("referenceType") || "shortcut";
        delete context.url;
        delete context.title;
      } else {
        delete context.identifier;
        delete context.label;
        delete context.referenceType;
      }
      setData("referenceType");
    }
    function onexitlabeltext(token) {
      this.stack[this.stack.length - 2].identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitlabel() {
      var fragment = this.stack[this.stack.length - 1];
      var value = this.resume();
      this.stack[this.stack.length - 1].label = value;
      setData("inReference", true);
      if (this.stack[this.stack.length - 1].type === "link") {
        this.stack[this.stack.length - 1].children = fragment.children;
      } else {
        this.stack[this.stack.length - 1].alt = value;
      }
    }
    function onexitresourcedestinationstring() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].url = data2;
    }
    function onexitresourcetitlestring() {
      var data2 = this.resume();
      this.stack[this.stack.length - 1].title = data2;
    }
    function onexitresource() {
      setData("inReference");
    }
    function onenterreference() {
      setData("referenceType", "collapsed");
    }
    function onexitreferencestring(token) {
      var label = this.resume();
      this.stack[this.stack.length - 1].label = label;
      this.stack[this.stack.length - 1].identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      setData("referenceType", "full");
    }
    function onexitcharacterreferencemarker(token) {
      setData("characterReferenceType", token.type);
    }
    function onexitcharacterreferencevalue(token) {
      var data2 = this.sliceSerialize(token);
      var type = getData("characterReferenceType");
      var value;
      var tail;
      if (type) {
        value = safeFromInt(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
        setData("characterReferenceType");
      } else {
        value = decode(data2);
      }
      tail = this.stack.pop();
      tail.value += value;
      tail.position.end = point(token.end);
    }
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
    }
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      this.stack[this.stack.length - 1].url = "mailto:" + this.sliceSerialize(token);
    }
    function blockQuote() {
      return {type: "blockquote", children: []};
    }
    function codeFlow() {
      return {type: "code", lang: null, meta: null, value: ""};
    }
    function codeText() {
      return {type: "inlineCode", value: ""};
    }
    function definition() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function emphasis() {
      return {type: "emphasis", children: []};
    }
    function heading() {
      return {type: "heading", depth: void 0, children: []};
    }
    function hardBreak() {
      return {type: "break"};
    }
    function html() {
      return {type: "html", value: ""};
    }
    function image() {
      return {type: "image", title: null, url: "", alt: null};
    }
    function link() {
      return {type: "link", title: null, url: "", children: []};
    }
    function list(token) {
      return {
        type: "list",
        ordered: token.type === "listOrdered",
        start: null,
        spread: token._spread,
        children: []
      };
    }
    function listItem(token) {
      return {
        type: "listItem",
        spread: token._spread,
        checked: null,
        children: []
      };
    }
    function paragraph() {
      return {type: "paragraph", children: []};
    }
    function strong() {
      return {type: "strong", children: []};
    }
    function text() {
      return {type: "text", value: ""};
    }
    function thematicBreak() {
      return {type: "thematicBreak"};
    }
  }
  function configure(config, extensions) {
    var index = -1;
    while (++index < extensions.length) {
      extension(config, extensions[index]);
    }
    return config;
  }
  function extension(config, extension2) {
    var key;
    var left;
    for (key in extension2) {
      left = own.call(config, key) ? config[key] : config[key] = {};
      if (key === "canContainEols" || key === "transforms") {
        config[key] = [].concat(left, extension2[key]);
      } else {
        Object.assign(left, extension2[key]);
      }
    }
  }
});

// node_modules/mdast-util-from-markdown/index.js
var require_mdast_util_from_markdown = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = require_dist();
});

// node_modules/remark-parse/index.js
var require_remark_parse = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = parse;
  var fromMarkdown = require_mdast_util_from_markdown();
  function parse(options) {
    var self2 = this;
    this.Parser = parse2;
    function parse2(doc) {
      return fromMarkdown(doc, Object.assign({}, self2.data("settings"), options, {
        extensions: self2.data("micromarkExtensions") || [],
        mdastExtensions: self2.data("fromMarkdownExtensions") || []
      }));
    }
  }
});

// node_modules/@instantish/martian/build/src/notion/blocks.js
var require_blocks = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.toDo = exports2.numberedListItem = exports2.bulletedListItem = exports2.headingThree = exports2.headingTwo = exports2.headingOne = exports2.paragraph = void 0;
  function paragraph(text) {
    return {
      object: "block",
      type: "paragraph",
      paragraph: {
        text
      }
    };
  }
  exports2.paragraph = paragraph;
  function headingOne(text) {
    return {
      object: "block",
      type: "heading_1",
      heading_1: {
        text
      }
    };
  }
  exports2.headingOne = headingOne;
  function headingTwo(text) {
    return {
      object: "block",
      type: "heading_2",
      heading_2: {
        text
      }
    };
  }
  exports2.headingTwo = headingTwo;
  function headingThree(text) {
    return {
      object: "block",
      type: "heading_3",
      heading_3: {
        text
      }
    };
  }
  exports2.headingThree = headingThree;
  function bulletedListItem(text) {
    return {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        text
      }
    };
  }
  exports2.bulletedListItem = bulletedListItem;
  function numberedListItem(text) {
    return {
      object: "block",
      type: "numbered_list_item",
      numbered_list_item: {
        text
      }
    };
  }
  exports2.numberedListItem = numberedListItem;
  function toDo(checked, text) {
    return {
      object: "block",
      type: "to_do",
      to_do: {
        text,
        checked
      }
    };
  }
  exports2.toDo = toDo;
});

// node_modules/@instantish/martian/build/src/notion/common.js
var require_common = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.richText = void 0;
  function richText(content, options = {}) {
    var _a;
    const annotations = (_a = options.annotations) !== null && _a !== void 0 ? _a : {};
    return {
      type: "text",
      annotations: {
        bold: false,
        strikethrough: false,
        underline: false,
        italic: false,
        code: false,
        color: "default",
        ...annotations
      },
      text: {
        content,
        link: options.url ? {
          type: "url",
          url: options.url
        } : void 0
      }
    };
  }
  exports2.richText = richText;
});

// node_modules/@instantish/martian/node_modules/@notionhq/client/build/src/api-types.js
var require_api_types = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
});

// node_modules/@instantish/martian/build/src/notion/index.js
var require_notion = __commonJS((exports2) => {
  "use strict";
  var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
        __createBinding(exports3, m, p);
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  __exportStar2(require_blocks(), exports2);
  __exportStar2(require_common(), exports2);
  __exportStar2(require_api_types(), exports2);
});

// node_modules/@instantish/martian/build/src/parser/internal.js
var require_internal = __commonJS((exports2) => {
  "use strict";
  var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {enumerable: true, value: v});
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.parseRichText = exports2.parseBlocks = void 0;
  var notion = __importStar(require_notion());
  function parseInline(element, options) {
    var _a, _b;
    const copy = {
      annotations: {
        ...(_a = options === null || options === void 0 ? void 0 : options.annotations) !== null && _a !== void 0 ? _a : {}
      },
      url: options === null || options === void 0 ? void 0 : options.url
    };
    switch (element.type) {
      case "image":
        return [notion.richText((_b = element.title) !== null && _b !== void 0 ? _b : element.url, copy)];
      case "text":
        return [notion.richText(element.value, copy)];
      case "delete":
        copy.annotations.strikethrough = true;
        return element.children.flatMap((child) => parseInline(child, copy));
      case "emphasis":
        copy.annotations.italic = true;
        return element.children.flatMap((child) => parseInline(child, copy));
      case "strong":
        copy.annotations.bold = true;
        return element.children.flatMap((child) => parseInline(child, copy));
      case "link":
        copy.url = element.url;
        return element.children.flatMap((child) => parseInline(child, copy));
      case "inlineCode":
        copy.annotations.code = true;
        return [notion.richText(element.value, copy)];
      default:
        return [];
    }
  }
  function parseParagraph(element) {
    const text = element.children.flatMap((child) => parseInline(child));
    return notion.paragraph(text);
  }
  function parseHeading(element) {
    const text = element.children.flatMap((child) => parseInline(child));
    switch (element.depth) {
      case 1:
        return notion.headingOne(text);
      case 2:
        return notion.headingTwo(text);
      default:
        return notion.headingThree(text);
    }
  }
  function parseCode(element) {
    const text = [notion.richText(element.value, {annotations: {code: true}})];
    return notion.paragraph(text);
  }
  function parseList(element) {
    return element.children.flatMap((item) => {
      const paragraph = item.children[0];
      if (paragraph.type !== "paragraph") {
        return [];
      }
      const text = paragraph.children.flatMap((child) => parseInline(child));
      if (element.start !== null && element.start !== void 0) {
        return [notion.numberedListItem(text)];
      } else if (item.checked !== null && item.checked !== void 0) {
        return [notion.toDo(item.checked, text)];
      } else {
        return [notion.bulletedListItem(text)];
      }
    });
  }
  function parseNode(node) {
    switch (node.type) {
      case "heading":
        return [parseHeading(node)];
      case "paragraph":
        return [parseParagraph(node)];
      case "code":
        return [parseCode(node)];
      case "blockquote":
        return node.children.flatMap(parseNode);
      case "list":
        return parseList(node);
      default:
        return [];
    }
  }
  function parseBlocks(root) {
    return root.children.flatMap(parseNode);
  }
  exports2.parseBlocks = parseBlocks;
  function parseRichText(root) {
    if (root.children.length !== 1 || root.children[0].type !== "paragraph") {
      throw new Error(`Unsupported markdown element: ${JSON.stringify(root)}`);
    }
    const paragraph = root.children[0];
    return paragraph.children.flatMap((child) => parseInline(child));
  }
  exports2.parseRichText = parseRichText;
});

// node_modules/micromark-extension-gfm-autolink-literal/syntax.js
var require_syntax = __commonJS((exports2) => {
  var asciiAlpha = require_ascii_alpha();
  var asciiAlphanumeric = require_ascii_alphanumeric();
  var asciiControl = require_ascii_control();
  var markdownLineEnding = require_markdown_line_ending();
  var unicodePunctuation = require_unicode_punctuation();
  var unicodeWhitespace = require_unicode_whitespace();
  var www = {tokenize: tokenizeWww, partial: true};
  var domain = {tokenize: tokenizeDomain, partial: true};
  var path = {tokenize: tokenizePath, partial: true};
  var punctuation = {tokenize: tokenizePunctuation, partial: true};
  var namedCharacterReference = {
    tokenize: tokenizeNamedCharacterReference,
    partial: true
  };
  var wwwAutolink = {tokenize: tokenizeWwwAutolink, previous: previousWww};
  var httpAutolink = {tokenize: tokenizeHttpAutolink, previous: previousHttp};
  var emailAutolink = {tokenize: tokenizeEmailAutolink, previous: previousEmail};
  var text = {};
  exports2.text = text;
  var code = 48;
  while (code < 123) {
    text[code] = emailAutolink;
    code++;
    if (code === 58)
      code = 65;
    else if (code === 91)
      code = 97;
  }
  text[43] = emailAutolink;
  text[45] = emailAutolink;
  text[46] = emailAutolink;
  text[95] = emailAutolink;
  text[72] = [emailAutolink, httpAutolink];
  text[104] = [emailAutolink, httpAutolink];
  text[87] = [emailAutolink, wwwAutolink];
  text[119] = [emailAutolink, wwwAutolink];
  function tokenizeEmailAutolink(effects, ok, nok) {
    var self2 = this;
    var hasDot;
    return start;
    function start(code2) {
      if (!gfmAtext(code2) || !previousEmail(self2.previous) || previous(self2.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkEmail");
      return atext(code2);
    }
    function atext(code2) {
      if (gfmAtext(code2)) {
        effects.consume(code2);
        return atext;
      }
      if (code2 === 64) {
        effects.consume(code2);
        return label;
      }
      return nok(code2);
    }
    function label(code2) {
      if (code2 === 46) {
        return effects.check(punctuation, done, dotContinuation)(code2);
      }
      if (code2 === 45 || code2 === 95) {
        return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code2);
      }
      if (asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return label;
      }
      return done(code2);
    }
    function dotContinuation(code2) {
      effects.consume(code2);
      hasDot = true;
      return label;
    }
    function dashOrUnderscoreContinuation(code2) {
      effects.consume(code2);
      return afterDashOrUnderscore;
    }
    function afterDashOrUnderscore(code2) {
      if (code2 === 46) {
        return effects.check(punctuation, nok, dotContinuation)(code2);
      }
      return label(code2);
    }
    function done(code2) {
      if (hasDot) {
        effects.exit("literalAutolinkEmail");
        effects.exit("literalAutolink");
        return ok(code2);
      }
      return nok(code2);
    }
  }
  function tokenizeWwwAutolink(effects, ok, nok) {
    var self2 = this;
    return start;
    function start(code2) {
      if (code2 !== 87 && code2 - 32 !== 87 || !previousWww(self2.previous) || previous(self2.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkWww");
      return effects.check(www, effects.attempt(domain, effects.attempt(path, done), nok), nok)(code2);
    }
    function done(code2) {
      effects.exit("literalAutolinkWww");
      effects.exit("literalAutolink");
      return ok(code2);
    }
  }
  function tokenizeHttpAutolink(effects, ok, nok) {
    var self2 = this;
    return start;
    function start(code2) {
      if (code2 !== 72 && code2 - 32 !== 72 || !previousHttp(self2.previous) || previous(self2.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkHttp");
      effects.consume(code2);
      return t1;
    }
    function t1(code2) {
      if (code2 === 84 || code2 - 32 === 84) {
        effects.consume(code2);
        return t2;
      }
      return nok(code2);
    }
    function t2(code2) {
      if (code2 === 84 || code2 - 32 === 84) {
        effects.consume(code2);
        return p;
      }
      return nok(code2);
    }
    function p(code2) {
      if (code2 === 80 || code2 - 32 === 80) {
        effects.consume(code2);
        return s;
      }
      return nok(code2);
    }
    function s(code2) {
      if (code2 === 83 || code2 - 32 === 83) {
        effects.consume(code2);
        return colon;
      }
      return colon(code2);
    }
    function colon(code2) {
      if (code2 === 58) {
        effects.consume(code2);
        return slash1;
      }
      return nok(code2);
    }
    function slash1(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return slash2;
      }
      return nok(code2);
    }
    function slash2(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return asciiControl(code2) || unicodeWhitespace(code2) || unicodePunctuation(code2) ? nok(code2) : effects.attempt(domain, effects.attempt(path, done), nok)(code2);
    }
    function done(code2) {
      effects.exit("literalAutolinkHttp");
      effects.exit("literalAutolink");
      return ok(code2);
    }
  }
  function tokenizeWww(effects, ok, nok) {
    return start;
    function start(code2) {
      effects.consume(code2);
      return w2;
    }
    function w2(code2) {
      if (code2 === 87 || code2 - 32 === 87) {
        effects.consume(code2);
        return w3;
      }
      return nok(code2);
    }
    function w3(code2) {
      if (code2 === 87 || code2 - 32 === 87) {
        effects.consume(code2);
        return dot;
      }
      return nok(code2);
    }
    function dot(code2) {
      if (code2 === 46) {
        effects.consume(code2);
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return code2 === null || markdownLineEnding(code2) ? nok(code2) : ok(code2);
    }
  }
  function tokenizeDomain(effects, ok, nok) {
    var hasUnderscoreInLastSegment;
    var hasUnderscoreInLastLastSegment;
    return domain2;
    function domain2(code2) {
      if (code2 === 38) {
        return effects.check(namedCharacterReference, done, punctuationContinuation)(code2);
      }
      if (code2 === 46 || code2 === 95) {
        return effects.check(punctuation, done, punctuationContinuation)(code2);
      }
      if (asciiControl(code2) || unicodeWhitespace(code2) || code2 !== 45 && unicodePunctuation(code2)) {
        return done(code2);
      }
      effects.consume(code2);
      return domain2;
    }
    function punctuationContinuation(code2) {
      if (code2 === 46) {
        hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
        hasUnderscoreInLastSegment = void 0;
        effects.consume(code2);
        return domain2;
      }
      if (code2 === 95)
        hasUnderscoreInLastSegment = true;
      effects.consume(code2);
      return domain2;
    }
    function done(code2) {
      if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
        return ok(code2);
      }
      return nok(code2);
    }
  }
  function tokenizePath(effects, ok) {
    var balance = 0;
    return inPath;
    function inPath(code2) {
      if (code2 === 38) {
        return effects.check(namedCharacterReference, ok, continuedPunctuation)(code2);
      }
      if (code2 === 40) {
        balance++;
      }
      if (code2 === 41) {
        return effects.check(punctuation, parenAtPathEnd, continuedPunctuation)(code2);
      }
      if (pathEnd(code2)) {
        return ok(code2);
      }
      if (trailingPunctuation(code2)) {
        return effects.check(punctuation, ok, continuedPunctuation)(code2);
      }
      effects.consume(code2);
      return inPath;
    }
    function continuedPunctuation(code2) {
      effects.consume(code2);
      return inPath;
    }
    function parenAtPathEnd(code2) {
      balance--;
      return balance < 0 ? ok(code2) : continuedPunctuation(code2);
    }
  }
  function tokenizeNamedCharacterReference(effects, ok, nok) {
    return start;
    function start(code2) {
      effects.consume(code2);
      return inside;
    }
    function inside(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return inside;
      }
      if (code2 === 59) {
        effects.consume(code2);
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return pathEnd(code2) ? ok(code2) : nok(code2);
    }
  }
  function tokenizePunctuation(effects, ok, nok) {
    return start;
    function start(code2) {
      effects.consume(code2);
      return after;
    }
    function after(code2) {
      if (trailingPunctuation(code2)) {
        effects.consume(code2);
        return after;
      }
      return pathEnd(code2) ? ok(code2) : nok(code2);
    }
  }
  function trailingPunctuation(code2) {
    return code2 === 33 || code2 === 34 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 60 || code2 === 63 || code2 === 95 || code2 === 126;
  }
  function pathEnd(code2) {
    return code2 === null || code2 < 0 || code2 === 32 || code2 === 60;
  }
  function gfmAtext(code2) {
    return code2 === 43 || code2 === 45 || code2 === 46 || code2 === 95 || asciiAlphanumeric(code2);
  }
  function previousWww(code2) {
    return code2 === null || code2 < 0 || code2 === 32 || code2 === 40 || code2 === 42 || code2 === 95 || code2 === 126;
  }
  function previousHttp(code2) {
    return code2 === null || !asciiAlpha(code2);
  }
  function previousEmail(code2) {
    return code2 !== 47 && previousHttp(code2);
  }
  function previous(events) {
    var index = events.length;
    while (index--) {
      if ((events[index][1].type === "labelLink" || events[index][1].type === "labelImage") && !events[index][1]._balanced) {
        return true;
      }
    }
  }
});

// node_modules/micromark-extension-gfm-autolink-literal/index.js
var require_micromark_extension_gfm_autolink_literal = __commonJS((exports2, module2) => {
  module2.exports = require_syntax();
});

// node_modules/micromark-extension-gfm-strikethrough/index.js
var require_micromark_extension_gfm_strikethrough = __commonJS((exports2, module2) => {
  module2.exports = create;
  var classifyCharacter = require_classify_character();
  var chunkedSplice = require_chunked_splice();
  var resolveAll = require_resolve_all();
  var shallow = require_shallow();
  function create(options) {
    var settings = options || {};
    var single = settings.singleTilde;
    var tokenizer = {
      tokenize: tokenizeStrikethrough,
      resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === void 0) {
      single = true;
    }
    return {text: {126: tokenizer}, insideSpan: {null: tokenizer}};
    function resolveAllStrikethrough(events, context) {
      var index = -1;
      var strikethrough;
      var text;
      var open;
      var nextEvents;
      while (++index < events.length) {
        if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
          open = index;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
              events[index][1].type = "strikethroughSequence";
              events[open][1].type = "strikethroughSequence";
              strikethrough = {
                type: "strikethrough",
                start: shallow(events[open][1].start),
                end: shallow(events[index][1].end)
              };
              text = {
                type: "strikethroughText",
                start: shallow(events[open][1].end),
                end: shallow(events[index][1].start)
              };
              nextEvents = [
                ["enter", strikethrough, context],
                ["enter", events[open][1], context],
                ["exit", events[open][1], context],
                ["enter", text, context]
              ];
              chunkedSplice(nextEvents, nextEvents.length, 0, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
              chunkedSplice(nextEvents, nextEvents.length, 0, [
                ["exit", text, context],
                ["enter", events[index][1], context],
                ["exit", events[index][1], context],
                ["exit", strikethrough, context]
              ]);
              chunkedSplice(events, open - 1, index - open + 3, nextEvents);
              index = open + nextEvents.length - 2;
              break;
            }
          }
        }
      }
      return removeRemainingSequences(events);
    }
    function removeRemainingSequences(events) {
      var index = -1;
      var length = events.length;
      while (++index < length) {
        if (events[index][1].type === "strikethroughSequenceTemporary") {
          events[index][1].type = "data";
        }
      }
      return events;
    }
    function tokenizeStrikethrough(effects, ok, nok) {
      var previous = this.previous;
      var events = this.events;
      var size = 0;
      return start;
      function start(code) {
        if (code !== 126 || previous === 126 && events[events.length - 1][1].type !== "characterEscape") {
          return nok(code);
        }
        effects.enter("strikethroughSequenceTemporary");
        return more(code);
      }
      function more(code) {
        var before = classifyCharacter(previous);
        var token;
        var after;
        if (code === 126) {
          if (size > 1)
            return nok(code);
          effects.consume(code);
          size++;
          return more;
        }
        if (size < 2 && !single)
          return nok(code);
        token = effects.exit("strikethroughSequenceTemporary");
        after = classifyCharacter(code);
        token._open = !after || after === 2 && before;
        token._close = !before || before === 2 && after;
        return ok(code);
      }
    }
  }
});

// node_modules/micromark-extension-gfm-table/syntax.js
var require_syntax2 = __commonJS((exports2) => {
  exports2.flow = {
    null: {tokenize: tokenizeTable, resolve: resolveTable, interruptible: true}
  };
  var createSpace = require_factory_space();
  var setextUnderlineMini = {tokenize: tokenizeSetextUnderlineMini, partial: true};
  var nextPrefixedOrBlank = {tokenize: tokenizeNextPrefixedOrBlank, partial: true};
  function resolveTable(events, context) {
    var length = events.length;
    var index = -1;
    var token;
    var inHead;
    var inDelimiterRow;
    var inRow;
    var cell;
    var content;
    var text;
    var contentStart;
    var contentEnd;
    var cellStart;
    while (++index < length) {
      token = events[index][1];
      if (inRow) {
        if (token.type === "temporaryTableCellContent") {
          contentStart = contentStart || index;
          contentEnd = index;
        }
        if ((token.type === "tableCellDivider" || token.type === "tableRow") && contentEnd) {
          content = {
            type: "tableContent",
            start: events[contentStart][1].start,
            end: events[contentEnd][1].end
          };
          text = {
            type: "chunkText",
            start: content.start,
            end: content.end,
            contentType: "text"
          };
          events.splice(contentStart, contentEnd - contentStart + 1, ["enter", content, context], ["enter", text, context], ["exit", text, context], ["exit", content, context]);
          index -= contentEnd - contentStart - 3;
          length = events.length;
          contentStart = void 0;
          contentEnd = void 0;
        }
      }
      if (events[index][0] === "exit" && cellStart && cellStart + 1 < index && (token.type === "tableCellDivider" || token.type === "tableRow" && (cellStart + 3 < index || events[cellStart][1].type !== "whitespace"))) {
        cell = {
          type: inDelimiterRow ? "tableDelimiter" : inHead ? "tableHeader" : "tableData",
          start: events[cellStart][1].start,
          end: events[index][1].end
        };
        events.splice(index + (token.type === "tableCellDivider" ? 1 : 0), 0, [
          "exit",
          cell,
          context
        ]);
        events.splice(cellStart, 0, ["enter", cell, context]);
        index += 2;
        length = events.length;
        cellStart = index + 1;
      }
      if (token.type === "tableRow") {
        inRow = events[index][0] === "enter";
        if (inRow) {
          cellStart = index + 1;
        }
      }
      if (token.type === "tableDelimiterRow") {
        inDelimiterRow = events[index][0] === "enter";
        if (inDelimiterRow) {
          cellStart = index + 1;
        }
      }
      if (token.type === "tableHead") {
        inHead = events[index][0] === "enter";
      }
    }
    return events;
  }
  function tokenizeTable(effects, ok, nok) {
    var align = [];
    var tableHeaderCount = 0;
    var seenDelimiter;
    var hasDash;
    return start;
    function start(code) {
      if (code === null || code === -5 || code === -4 || code === -3) {
        return nok(code);
      }
      effects.enter("table")._align = align;
      effects.enter("tableHead");
      effects.enter("tableRow");
      if (code === 124) {
        return cellDividerHead(code);
      }
      tableHeaderCount++;
      effects.enter("temporaryTableCellContent");
      return inCellContentHead(code);
    }
    function cellDividerHead(code) {
      effects.enter("tableCellDivider");
      effects.consume(code);
      effects.exit("tableCellDivider");
      seenDelimiter = true;
      return cellBreakHead;
    }
    function cellBreakHead(code) {
      if (code === null || code === -5 || code === -4 || code === -3) {
        return atRowEndHead(code);
      }
      if (code === -2 || code === -1 || code === 32) {
        effects.enter("whitespace");
        effects.consume(code);
        return inWhitespaceHead;
      }
      if (seenDelimiter) {
        seenDelimiter = void 0;
        tableHeaderCount++;
      }
      if (code === 124) {
        return cellDividerHead(code);
      }
      effects.enter("temporaryTableCellContent");
      return inCellContentHead(code);
    }
    function inWhitespaceHead(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code);
        return inWhitespaceHead;
      }
      effects.exit("whitespace");
      return cellBreakHead(code);
    }
    function inCellContentHead(code) {
      if (code === null || code < 0 || code === 32 || code === 124) {
        effects.exit("temporaryTableCellContent");
        return cellBreakHead(code);
      }
      effects.consume(code);
      return code === 92 ? inCellContentEscapeHead : inCellContentHead;
    }
    function inCellContentEscapeHead(code) {
      if (code === 92 || code === 124) {
        effects.consume(code);
        return inCellContentHead;
      }
      return inCellContentHead(code);
    }
    function atRowEndHead(code) {
      if (code === null) {
        return nok(code);
      }
      effects.exit("tableRow");
      effects.exit("tableHead");
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return effects.check(setextUnderlineMini, nok, createSpace(effects, rowStartDelimiter, "linePrefix", 4));
    }
    function rowStartDelimiter(code) {
      if (code === null || code < 0 || code === 32) {
        return nok(code);
      }
      effects.enter("tableDelimiterRow");
      return atDelimiterRowBreak(code);
    }
    function atDelimiterRowBreak(code) {
      if (code === null || code === -5 || code === -4 || code === -3) {
        return rowEndDelimiter(code);
      }
      if (code === -2 || code === -1 || code === 32) {
        effects.enter("whitespace");
        effects.consume(code);
        return inWhitespaceDelimiter;
      }
      if (code === 45) {
        effects.enter("tableDelimiterFiller");
        effects.consume(code);
        hasDash = true;
        align.push(null);
        return inFillerDelimiter;
      }
      if (code === 58) {
        effects.enter("tableDelimiterAlignment");
        effects.consume(code);
        effects.exit("tableDelimiterAlignment");
        align.push("left");
        return afterLeftAlignment;
      }
      if (code === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code);
        effects.exit("tableCellDivider");
        return atDelimiterRowBreak;
      }
      return nok(code);
    }
    function inWhitespaceDelimiter(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code);
        return inWhitespaceDelimiter;
      }
      effects.exit("whitespace");
      return atDelimiterRowBreak(code);
    }
    function inFillerDelimiter(code) {
      if (code === 45) {
        effects.consume(code);
        return inFillerDelimiter;
      }
      effects.exit("tableDelimiterFiller");
      if (code === 58) {
        effects.enter("tableDelimiterAlignment");
        effects.consume(code);
        effects.exit("tableDelimiterAlignment");
        align[align.length - 1] = align[align.length - 1] === "left" ? "center" : "right";
        return afterRightAlignment;
      }
      return atDelimiterRowBreak(code);
    }
    function afterLeftAlignment(code) {
      if (code === 45) {
        effects.enter("tableDelimiterFiller");
        effects.consume(code);
        hasDash = true;
        return inFillerDelimiter;
      }
      return nok(code);
    }
    function afterRightAlignment(code) {
      if (code === null || code === -5 || code === -4 || code === -3) {
        return rowEndDelimiter(code);
      }
      if (code === -2 || code === -1 || code === 32) {
        effects.enter("whitespace");
        effects.consume(code);
        return inWhitespaceDelimiter;
      }
      if (code === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code);
        effects.exit("tableCellDivider");
        return atDelimiterRowBreak;
      }
      return nok(code);
    }
    function rowEndDelimiter(code) {
      effects.exit("tableDelimiterRow");
      if (!hasDash || tableHeaderCount !== align.length) {
        return nok(code);
      }
      if (code === null) {
        return tableClose(code);
      }
      return effects.check(nextPrefixedOrBlank, tableClose, tableContinue)(code);
    }
    function tableClose(code) {
      effects.exit("table");
      return ok(code);
    }
    function tableContinue(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return createSpace(effects, bodyStart, "linePrefix", 4);
    }
    function bodyStart(code) {
      effects.enter("tableBody");
      return rowStartBody(code);
    }
    function rowStartBody(code) {
      effects.enter("tableRow");
      if (code === 124) {
        return cellDividerBody(code);
      }
      effects.enter("temporaryTableCellContent");
      return inCellContentBody(code);
    }
    function cellDividerBody(code) {
      effects.enter("tableCellDivider");
      effects.consume(code);
      effects.exit("tableCellDivider");
      return cellBreakBody;
    }
    function cellBreakBody(code) {
      if (code === null || code === -5 || code === -4 || code === -3) {
        return atRowEndBody(code);
      }
      if (code === -2 || code === -1 || code === 32) {
        effects.enter("whitespace");
        effects.consume(code);
        return inWhitespaceBody;
      }
      if (code === 124) {
        return cellDividerBody(code);
      }
      effects.enter("temporaryTableCellContent");
      return inCellContentBody(code);
    }
    function inWhitespaceBody(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code);
        return inWhitespaceBody;
      }
      effects.exit("whitespace");
      return cellBreakBody(code);
    }
    function inCellContentBody(code) {
      if (code === null || code < 0 || code === 32 || code === 124) {
        effects.exit("temporaryTableCellContent");
        return cellBreakBody(code);
      }
      effects.consume(code);
      return code === 92 ? inCellContentEscapeBody : inCellContentBody;
    }
    function inCellContentEscapeBody(code) {
      if (code === 92 || code === 124) {
        effects.consume(code);
        return inCellContentBody;
      }
      return inCellContentBody(code);
    }
    function atRowEndBody(code) {
      effects.exit("tableRow");
      if (code === null) {
        return tableBodyClose(code);
      }
      return effects.check(nextPrefixedOrBlank, tableBodyClose, tableBodyContinue)(code);
    }
    function tableBodyClose(code) {
      effects.exit("tableBody");
      return tableClose(code);
    }
    function tableBodyContinue(code) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return createSpace(effects, rowStartBody, "linePrefix", 4);
    }
  }
  function tokenizeSetextUnderlineMini(effects, ok, nok) {
    return start;
    function start(code) {
      if (code !== 45) {
        return nok(code);
      }
      effects.enter("setextUnderline");
      return sequence(code);
    }
    function sequence(code) {
      if (code === 45) {
        effects.consume(code);
        return sequence;
      }
      return whitespace(code);
    }
    function whitespace(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code);
        return whitespace;
      }
      if (code === null || code === -5 || code === -4 || code === -3) {
        return ok(code);
      }
      return nok(code);
    }
  }
  function tokenizeNextPrefixedOrBlank(effects, ok, nok) {
    var size = 0;
    return start;
    function start(code) {
      effects.enter("check");
      effects.consume(code);
      return whitespace;
    }
    function whitespace(code) {
      if (code === -1 || code === 32) {
        effects.consume(code);
        size++;
        return size === 4 ? ok : whitespace;
      }
      if (code === null || code < 0) {
        return ok(code);
      }
      return nok(code);
    }
  }
});

// node_modules/micromark-extension-gfm-table/index.js
var require_micromark_extension_gfm_table = __commonJS((exports2, module2) => {
  module2.exports = require_syntax2();
});

// node_modules/micromark-extension-gfm-task-list-item/syntax.js
var require_syntax3 = __commonJS((exports2) => {
  var markdownLineEndingOrSpace = require_markdown_line_ending_or_space();
  var spaceFactory = require_factory_space();
  var prefixSize = require_prefix_size();
  var tasklistCheck = {tokenize: tokenizeTasklistCheck};
  exports2.text = {91: tasklistCheck};
  function tokenizeTasklistCheck(effects, ok, nok) {
    var self2 = this;
    return open;
    function open(code) {
      if (code !== 91 || self2.previous !== null || !self2._gfmTasklistFirstContentOfListItem) {
        return nok(code);
      }
      effects.enter("taskListCheck");
      effects.enter("taskListCheckMarker");
      effects.consume(code);
      effects.exit("taskListCheckMarker");
      return inside;
    }
    function inside(code) {
      if (code === -2 || code === 32) {
        effects.enter("taskListCheckValueUnchecked");
        effects.consume(code);
        effects.exit("taskListCheckValueUnchecked");
        return close;
      }
      if (code === 88 || code === 120) {
        effects.enter("taskListCheckValueChecked");
        effects.consume(code);
        effects.exit("taskListCheckValueChecked");
        return close;
      }
      return nok(code);
    }
    function close(code) {
      if (code === 93) {
        effects.enter("taskListCheckMarker");
        effects.consume(code);
        effects.exit("taskListCheckMarker");
        effects.exit("taskListCheck");
        return effects.check({tokenize: spaceThenNonSpace}, ok, nok);
      }
      return nok(code);
    }
  }
  function spaceThenNonSpace(effects, ok, nok) {
    var self2 = this;
    return spaceFactory(effects, after, "whitespace");
    function after(code) {
      return prefixSize(self2.events, "whitespace") && code !== null && !markdownLineEndingOrSpace(code) ? ok(code) : nok(code);
    }
  }
});

// node_modules/micromark-extension-gfm-task-list-item/index.js
var require_micromark_extension_gfm_task_list_item = __commonJS((exports2, module2) => {
  module2.exports = require_syntax3();
});

// node_modules/micromark-extension-gfm/syntax.js
var require_syntax4 = __commonJS((exports2, module2) => {
  var combine = require_combine_extensions();
  var autolink = require_micromark_extension_gfm_autolink_literal();
  var strikethrough = require_micromark_extension_gfm_strikethrough();
  var table = require_micromark_extension_gfm_table();
  var tasklist = require_micromark_extension_gfm_task_list_item();
  module2.exports = create;
  function create(options) {
    return combine([autolink, strikethrough(options), table, tasklist]);
  }
});

// node_modules/micromark-extension-gfm/index.js
var require_micromark_extension_gfm = __commonJS((exports2, module2) => {
  module2.exports = require_syntax4();
});

// node_modules/ccount/index.js
var require_ccount = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = ccount;
  function ccount(source, character) {
    var value = String(source);
    var count = 0;
    var index;
    if (typeof character !== "string") {
      throw new Error("Expected character");
    }
    index = value.indexOf(character);
    while (index !== -1) {
      count++;
      index = value.indexOf(character, index + character.length);
    }
    return count;
  }
});

// node_modules/unist-util-is/convert.js
var require_convert = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = convert;
  function convert(test) {
    if (test == null) {
      return ok;
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    if (typeof test === "object") {
      return "length" in test ? anyFactory(test) : allFactory(test);
    }
    if (typeof test === "function") {
      return test;
    }
    throw new Error("Expected function, string, or object as test");
  }
  function allFactory(test) {
    return all;
    function all(node) {
      var key;
      for (key in test) {
        if (node[key] !== test[key])
          return false;
      }
      return true;
    }
  }
  function anyFactory(tests) {
    var checks = [];
    var index = -1;
    while (++index < tests.length) {
      checks[index] = convert(tests[index]);
    }
    return any;
    function any() {
      var index2 = -1;
      while (++index2 < checks.length) {
        if (checks[index2].apply(this, arguments)) {
          return true;
        }
      }
      return false;
    }
  }
  function typeFactory(test) {
    return type;
    function type(node) {
      return Boolean(node && node.type === test);
    }
  }
  function ok() {
    return true;
  }
});

// node_modules/unist-util-visit-parents/color.js
var require_color = __commonJS((exports2, module2) => {
  module2.exports = color;
  function color(d) {
    return "[33m" + d + "[39m";
  }
});

// node_modules/unist-util-visit-parents/index.js
var require_unist_util_visit_parents = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = visitParents;
  var convert = require_convert();
  var color = require_color();
  var CONTINUE = true;
  var SKIP = "skip";
  var EXIT = false;
  visitParents.CONTINUE = CONTINUE;
  visitParents.SKIP = SKIP;
  visitParents.EXIT = EXIT;
  function visitParents(tree, test, visitor, reverse) {
    var step;
    var is;
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
      test = null;
    }
    is = convert(test);
    step = reverse ? -1 : 1;
    factory(tree, null, [])();
    function factory(node, index, parents) {
      var value = typeof node === "object" && node !== null ? node : {};
      var name;
      if (typeof value.type === "string") {
        name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
        visit.displayName = "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")";
      }
      return visit;
      function visit() {
        var grandparents = parents.concat(node);
        var result = [];
        var subresult;
        var offset;
        if (!test || is(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          offset = (reverse ? node.children.length : -1) + step;
          while (offset > -1 && offset < node.children.length) {
            subresult = factory(node.children[offset], offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
        return result;
      }
    }
  }
  function toResult(value) {
    if (value !== null && typeof value === "object" && "length" in value) {
      return value;
    }
    if (typeof value === "number") {
      return [CONTINUE, value];
    }
    return [value];
  }
});

// node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (string) => {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  };
});

// node_modules/mdast-util-find-and-replace/index.js
var require_mdast_util_find_and_replace = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = findAndReplace;
  var visit = require_unist_util_visit_parents();
  var convert = require_convert();
  var escape = require_escape_string_regexp();
  var splice = [].splice;
  function findAndReplace(tree, find, replace, options) {
    var settings;
    var schema;
    if (typeof find === "string" || find && typeof find.exec === "function") {
      schema = [[find, replace]];
    } else {
      schema = find;
      options = replace;
    }
    settings = options || {};
    search(tree, settings, handlerFactory(toPairs(schema)));
    return tree;
    function handlerFactory(pairs) {
      var pair = pairs[0];
      return handler;
      function handler(node, parent) {
        var find2 = pair[0];
        var replace2 = pair[1];
        var nodes = [];
        var start = 0;
        var index = parent.children.indexOf(node);
        var position;
        var match;
        var subhandler;
        var value;
        find2.lastIndex = 0;
        match = find2.exec(node.value);
        while (match) {
          position = match.index;
          value = replace2.apply(null, [].concat(match, {index: match.index, input: match.input}));
          if (value !== false) {
            if (start !== position) {
              nodes.push({type: "text", value: node.value.slice(start, position)});
            }
            if (typeof value === "string" && value.length > 0) {
              value = {type: "text", value};
            }
            if (value) {
              nodes = [].concat(nodes, value);
            }
            start = position + match[0].length;
          }
          if (!find2.global) {
            break;
          }
          match = find2.exec(node.value);
        }
        if (position === void 0) {
          nodes = [node];
          index--;
        } else {
          if (start < node.value.length) {
            nodes.push({type: "text", value: node.value.slice(start)});
          }
          nodes.unshift(index, 1);
          splice.apply(parent.children, nodes);
        }
        if (pairs.length > 1) {
          subhandler = handlerFactory(pairs.slice(1));
          position = -1;
          while (++position < nodes.length) {
            node = nodes[position];
            if (node.type === "text") {
              subhandler(node, parent);
            } else {
              search(node, settings, subhandler);
            }
          }
        }
        return index + nodes.length + 1;
      }
    }
  }
  function search(tree, settings, handler) {
    var ignored = convert(settings.ignore || []);
    var result = [];
    visit(tree, "text", visitor);
    return result;
    function visitor(node, parents) {
      var index = -1;
      var parent;
      var grandparent;
      while (++index < parents.length) {
        parent = parents[index];
        if (ignored(parent, grandparent ? grandparent.children.indexOf(parent) : void 0, grandparent)) {
          return;
        }
        grandparent = parent;
      }
      return handler(node, grandparent);
    }
  }
  function toPairs(schema) {
    var result = [];
    var key;
    var index;
    if (typeof schema !== "object") {
      throw new Error("Expected array or object as schema");
    }
    if ("length" in schema) {
      index = -1;
      while (++index < schema.length) {
        result.push([
          toExpression(schema[index][0]),
          toFunction(schema[index][1])
        ]);
      }
    } else {
      for (key in schema) {
        result.push([toExpression(key), toFunction(schema[key])]);
      }
    }
    return result;
  }
  function toExpression(find) {
    return typeof find === "string" ? new RegExp(escape(find), "g") : find;
  }
  function toFunction(replace) {
    return typeof replace === "function" ? replace : returner;
    function returner() {
      return replace;
    }
  }
});

// node_modules/mdast-util-gfm-autolink-literal/from-markdown.js
var require_from_markdown = __commonJS((exports2) => {
  var ccount = require_ccount();
  var findAndReplace = require_mdast_util_find_and_replace();
  var unicodePunctuation = require_unicode_punctuation();
  var unicodeWhitespace = require_unicode_whitespace();
  exports2.transforms = [transformGfmAutolinkLiterals];
  exports2.enter = {
    literalAutolink: enterLiteralAutolink,
    literalAutolinkEmail: enterLiteralAutolinkValue,
    literalAutolinkHttp: enterLiteralAutolinkValue,
    literalAutolinkWww: enterLiteralAutolinkValue
  };
  exports2.exit = {
    literalAutolink: exitLiteralAutolink,
    literalAutolinkEmail: exitLiteralAutolinkEmail,
    literalAutolinkHttp: exitLiteralAutolinkHttp,
    literalAutolinkWww: exitLiteralAutolinkWww
  };
  function enterLiteralAutolink(token) {
    this.enter({type: "link", title: null, url: "", children: []}, token);
  }
  function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    this.stack[this.stack.length - 1].url = "http://" + this.sliceSerialize(token);
  }
  function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
  }
  function exitLiteralAutolink(token) {
    this.exit(token);
  }
  function transformGfmAutolinkLiterals(tree) {
    findAndReplace(tree, [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, findUrl],
      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, findEmail]
    ], {ignore: ["link", "linkReference"]});
  }
  function findUrl($0, protocol, domain, path, match) {
    var prefix = "";
    var parts;
    var result;
    if (!previous(match)) {
      return false;
    }
    if (/^w/i.test(protocol)) {
      domain = protocol + domain;
      protocol = "";
      prefix = "http://";
    }
    if (!isCorrectDomain(domain)) {
      return false;
    }
    parts = splitUrl(domain + path);
    if (!parts[0])
      return false;
    result = {
      type: "link",
      title: null,
      url: prefix + protocol + parts[0],
      children: [{type: "text", value: protocol + parts[0]}]
    };
    if (parts[1]) {
      result = [result, {type: "text", value: parts[1]}];
    }
    return result;
  }
  function findEmail($0, atext, label, match) {
    if (!previous(match, true) || /[_-]$/.test(label)) {
      return false;
    }
    return {
      type: "link",
      title: null,
      url: "mailto:" + atext + "@" + label,
      children: [{type: "text", value: atext + "@" + label}]
    };
  }
  function isCorrectDomain(domain) {
    var parts = domain.split(".");
    if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
      return false;
    }
    return true;
  }
  function splitUrl(url) {
    var trail = /[!"&'),.:;<>?\]}]+$/.exec(url);
    var closingParenIndex;
    var openingParens;
    var closingParens;
    if (trail) {
      url = url.slice(0, trail.index);
      trail = trail[0];
      closingParenIndex = trail.indexOf(")");
      openingParens = ccount(url, "(");
      closingParens = ccount(url, ")");
      while (closingParenIndex !== -1 && openingParens > closingParens) {
        url += trail.slice(0, closingParenIndex + 1);
        trail = trail.slice(closingParenIndex + 1);
        closingParenIndex = trail.indexOf(")");
        closingParens++;
      }
    }
    return [url, trail];
  }
  function previous(match, email) {
    var code = match.input.charCodeAt(match.index - 1);
    return (code !== code || unicodeWhitespace(code) || unicodePunctuation(code)) && (!email || code !== 47);
  }
});

// node_modules/mdast-util-gfm-strikethrough/from-markdown.js
var require_from_markdown2 = __commonJS((exports2) => {
  exports2.canContainEols = ["delete"];
  exports2.enter = {strikethrough: enterStrikethrough};
  exports2.exit = {strikethrough: exitStrikethrough};
  function enterStrikethrough(token) {
    this.enter({type: "delete", children: []}, token);
  }
  function exitStrikethrough(token) {
    this.exit(token);
  }
});

// node_modules/mdast-util-gfm-table/from-markdown.js
var require_from_markdown3 = __commonJS((exports2) => {
  exports2.enter = {
    table: enterTable,
    tableData: enterCell,
    tableHeader: enterCell,
    tableRow: enterRow
  };
  exports2.exit = {
    codeText: exitCodeText,
    table: exitTable,
    tableData: exit,
    tableHeader: exit,
    tableRow: exit
  };
  function enterTable(token) {
    this.enter({type: "table", align: token._align, children: []}, token);
    this.setData("inTable", true);
  }
  function exitTable(token) {
    this.exit(token);
    this.setData("inTable");
  }
  function enterRow(token) {
    this.enter({type: "tableRow", children: []}, token);
  }
  function exit(token) {
    this.exit(token);
  }
  function enterCell(token) {
    this.enter({type: "tableCell", children: []}, token);
  }
  function exitCodeText(token) {
    var value = this.resume();
    if (this.getData("inTable")) {
      value = value.replace(/\\([\\|])/g, replace);
    }
    this.stack[this.stack.length - 1].value = value;
    this.exit(token);
  }
  function replace($0, $1) {
    return $1 === "|" ? $1 : $0;
  }
});

// node_modules/mdast-util-gfm-task-list-item/from-markdown.js
var require_from_markdown4 = __commonJS((exports2) => {
  exports2.exit = {
    taskListCheckValueChecked: exitCheck,
    taskListCheckValueUnchecked: exitCheck,
    paragraph: exitParagraphWithTaskListItem
  };
  function exitCheck(token) {
    this.stack[this.stack.length - 2].checked = token.type === "taskListCheckValueChecked";
  }
  function exitParagraphWithTaskListItem(token) {
    var parent = this.stack[this.stack.length - 2];
    var node = this.stack[this.stack.length - 1];
    var siblings = parent.children;
    var head = node.children[0];
    var index = -1;
    var firstParaghraph;
    if (parent && parent.type === "listItem" && typeof parent.checked === "boolean" && head && head.type === "text") {
      while (++index < siblings.length) {
        if (siblings[index].type === "paragraph") {
          firstParaghraph = siblings[index];
          break;
        }
      }
      if (firstParaghraph === node) {
        head.value = head.value.slice(1);
        if (head.value.length === 0) {
          node.children.shift();
        } else {
          head.position.start.column++;
          head.position.start.offset++;
          node.position.start = Object.assign({}, head.position.start);
        }
      }
    }
    this.exit(token);
  }
});

// node_modules/mdast-util-gfm/from-markdown.js
var require_from_markdown5 = __commonJS((exports2, module2) => {
  var autolinkLiteral = require_from_markdown();
  var strikethrough = require_from_markdown2();
  var table = require_from_markdown3();
  var taskListItem = require_from_markdown4();
  var own = {}.hasOwnProperty;
  module2.exports = configure([
    autolinkLiteral,
    strikethrough,
    table,
    taskListItem
  ]);
  function configure(extensions) {
    var config = {transforms: [], canContainEols: []};
    var length = extensions.length;
    var index = -1;
    while (++index < length) {
      extension(config, extensions[index]);
    }
    return config;
  }
  function extension(config, extension2) {
    var key;
    var left;
    var right;
    for (key in extension2) {
      left = own.call(config, key) ? config[key] : config[key] = {};
      right = extension2[key];
      if (key === "canContainEols" || key === "transforms") {
        config[key] = [].concat(left, right);
      } else {
        Object.assign(left, right);
      }
    }
  }
});

// node_modules/mdast-util-gfm-autolink-literal/to-markdown.js
var require_to_markdown = __commonJS((exports2) => {
  var inConstruct = "phrasing";
  var notInConstruct = ["autolink", "link", "image", "label"];
  exports2.unsafe = [
    {
      character: "@",
      before: "[+\\-.\\w]",
      after: "[\\-.\\w]",
      inConstruct,
      notInConstruct
    },
    {
      character: ".",
      before: "[Ww]",
      after: "[\\-.\\w]",
      inConstruct,
      notInConstruct
    },
    {
      character: ":",
      before: "[ps]",
      after: "\\/",
      inConstruct,
      notInConstruct
    }
  ];
});

// node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
var require_container_phrasing = __commonJS((exports2, module2) => {
  module2.exports = phrasing;
  function phrasing(parent, context, safeOptions) {
    var children = parent.children || [];
    var results = [];
    var index = -1;
    var before = safeOptions.before;
    var after;
    var handle;
    var child;
    while (++index < children.length) {
      child = children[index];
      if (index + 1 < children.length) {
        handle = context.handle.handlers[children[index + 1].type];
        if (handle && handle.peek)
          handle = handle.peek;
        after = handle ? handle(children[index + 1], parent, context, {
          before: "",
          after: ""
        }).charAt(0) : "";
      } else {
        after = safeOptions.after;
      }
      if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
        results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
        before = " ";
      }
      results.push(context.handle(child, parent, context, {
        before,
        after
      }));
      before = results[results.length - 1].slice(-1);
    }
    return results.join("");
  }
});

// node_modules/mdast-util-gfm-strikethrough/to-markdown.js
var require_to_markdown2 = __commonJS((exports2) => {
  var phrasing = require_container_phrasing();
  exports2.unsafe = [{character: "~", inConstruct: "phrasing"}];
  exports2.handlers = {delete: handleDelete};
  handleDelete.peek = peekDelete;
  function handleDelete(node, _, context) {
    var exit = context.enter("emphasis");
    var value = phrasing(node, context, {before: "~", after: "~"});
    exit();
    return "~~" + value + "~~";
  }
  function peekDelete() {
    return "~";
  }
});

// node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js
var require_pattern_compile = __commonJS((exports2, module2) => {
  module2.exports = patternCompile;
  function patternCompile(pattern) {
    var before;
    var after;
    if (!pattern._compiled) {
      before = pattern.before ? "(?:" + pattern.before + ")" : "";
      after = pattern.after ? "(?:" + pattern.after + ")" : "";
      if (pattern.atBreak) {
        before = "[\\r\\n][\\t ]*" + before;
      }
      pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (after || ""), "g");
    }
    return pattern._compiled;
  }
});

// node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
var require_inline_code = __commonJS((exports2, module2) => {
  module2.exports = inlineCode;
  inlineCode.peek = inlineCodePeek;
  var patternCompile = require_pattern_compile();
  function inlineCode(node, parent, context) {
    var value = node.value || "";
    var sequence = "`";
    var index = -1;
    var pattern;
    var expression;
    var match;
    var position;
    while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
      sequence += "`";
    }
    if (/[^ \r\n]/.test(value) && (/[ \r\n`]/.test(value.charAt(0)) || /[ \r\n`]/.test(value.charAt(value.length - 1)))) {
      value = " " + value + " ";
    }
    while (++index < context.unsafe.length) {
      pattern = context.unsafe[index];
      if (!pattern.atBreak)
        continue;
      expression = patternCompile(pattern);
      while (match = expression.exec(value)) {
        position = match.index;
        if (value.charCodeAt(position) === 10 && value.charCodeAt(position - 1) === 13) {
          position--;
        }
        value = value.slice(0, position) + " " + value.slice(match.index + 1);
      }
    }
    return sequence + value + sequence;
  }
  function inlineCodePeek() {
    return "`";
  }
});

// node_modules/repeat-string/index.js
var require_repeat_string = __commonJS((exports2, module2) => {
  /*!
   * repeat-string <https://github.com/jonschlinkert/repeat-string>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  "use strict";
  var res = "";
  var cache;
  module2.exports = repeat;
  function repeat(str, num) {
    if (typeof str !== "string") {
      throw new TypeError("expected a string");
    }
    if (num === 1)
      return str;
    if (num === 2)
      return str + str;
    var max = str.length * num;
    if (cache !== str || typeof cache === "undefined") {
      cache = str;
      res = "";
    } else if (res.length >= max) {
      return res.substr(0, max);
    }
    while (max > res.length && num > 1) {
      if (num & 1) {
        res += str;
      }
      num >>= 1;
      str += str;
    }
    res += str;
    res = res.substr(0, max);
    return res;
  }
});

// node_modules/markdown-table/index.js
var require_markdown_table = __commonJS((exports2, module2) => {
  "use strict";
  var repeat = require_repeat_string();
  module2.exports = markdownTable;
  var trailingWhitespace = / +$/;
  var space = " ";
  var lineFeed = "\n";
  var dash = "-";
  var colon = ":";
  var verticalBar = "|";
  var x = 0;
  var C = 67;
  var L = 76;
  var R = 82;
  var c = 99;
  var l = 108;
  var r = 114;
  function markdownTable(table, options) {
    var settings = options || {};
    var padding = settings.padding !== false;
    var start = settings.delimiterStart !== false;
    var end = settings.delimiterEnd !== false;
    var align = (settings.align || []).concat();
    var alignDelimiters = settings.alignDelimiters !== false;
    var alignments = [];
    var stringLength = settings.stringLength || defaultStringLength;
    var rowIndex = -1;
    var rowLength = table.length;
    var cellMatrix = [];
    var sizeMatrix = [];
    var row = [];
    var sizes = [];
    var longestCellByColumn = [];
    var mostCellsPerRow = 0;
    var cells;
    var columnIndex;
    var columnLength;
    var largest;
    var size;
    var cell;
    var lines;
    var line;
    var before;
    var after;
    var code;
    while (++rowIndex < rowLength) {
      cells = table[rowIndex];
      columnIndex = -1;
      columnLength = cells.length;
      row = [];
      sizes = [];
      if (columnLength > mostCellsPerRow) {
        mostCellsPerRow = columnLength;
      }
      while (++columnIndex < columnLength) {
        cell = serialize(cells[columnIndex]);
        if (alignDelimiters === true) {
          size = stringLength(cell);
          sizes[columnIndex] = size;
          largest = longestCellByColumn[columnIndex];
          if (largest === void 0 || size > largest) {
            longestCellByColumn[columnIndex] = size;
          }
        }
        row.push(cell);
      }
      cellMatrix[rowIndex] = row;
      sizeMatrix[rowIndex] = sizes;
    }
    columnIndex = -1;
    columnLength = mostCellsPerRow;
    if (typeof align === "object" && "length" in align) {
      while (++columnIndex < columnLength) {
        alignments[columnIndex] = toAlignment(align[columnIndex]);
      }
    } else {
      code = toAlignment(align);
      while (++columnIndex < columnLength) {
        alignments[columnIndex] = code;
      }
    }
    columnIndex = -1;
    columnLength = mostCellsPerRow;
    row = [];
    sizes = [];
    while (++columnIndex < columnLength) {
      code = alignments[columnIndex];
      before = "";
      after = "";
      if (code === l) {
        before = colon;
      } else if (code === r) {
        after = colon;
      } else if (code === c) {
        before = colon;
        after = colon;
      }
      size = alignDelimiters ? Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length) : 1;
      cell = before + repeat(dash, size) + after;
      if (alignDelimiters === true) {
        size = before.length + size + after.length;
        if (size > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size;
        }
        sizes[columnIndex] = size;
      }
      row[columnIndex] = cell;
    }
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    rowLength = cellMatrix.length;
    lines = [];
    while (++rowIndex < rowLength) {
      row = cellMatrix[rowIndex];
      sizes = sizeMatrix[rowIndex];
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      line = [];
      while (++columnIndex < columnLength) {
        cell = row[columnIndex] || "";
        before = "";
        after = "";
        if (alignDelimiters === true) {
          size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
          code = alignments[columnIndex];
          if (code === r) {
            before = repeat(space, size);
          } else if (code === c) {
            if (size % 2 === 0) {
              before = repeat(space, size / 2);
              after = before;
            } else {
              before = repeat(space, size / 2 + 0.5);
              after = repeat(space, size / 2 - 0.5);
            }
          } else {
            after = repeat(space, size);
          }
        }
        if (start === true && columnIndex === 0) {
          line.push(verticalBar);
        }
        if (padding === true && !(alignDelimiters === false && cell === "") && (start === true || columnIndex !== 0)) {
          line.push(space);
        }
        if (alignDelimiters === true) {
          line.push(before);
        }
        line.push(cell);
        if (alignDelimiters === true) {
          line.push(after);
        }
        if (padding === true) {
          line.push(space);
        }
        if (end === true || columnIndex !== columnLength - 1) {
          line.push(verticalBar);
        }
      }
      line = line.join("");
      if (end === false) {
        line = line.replace(trailingWhitespace, "");
      }
      lines.push(line);
    }
    return lines.join(lineFeed);
  }
  function serialize(value) {
    return value === null || value === void 0 ? "" : String(value);
  }
  function defaultStringLength(value) {
    return value.length;
  }
  function toAlignment(value) {
    var code = typeof value === "string" ? value.charCodeAt(0) : x;
    return code === L || code === l ? l : code === R || code === r ? r : code === C || code === c ? c : x;
  }
});

// node_modules/mdast-util-gfm-table/to-markdown.js
var require_to_markdown3 = __commonJS((exports2, module2) => {
  var phrasing = require_container_phrasing();
  var defaultInlineCode = require_inline_code();
  var markdownTable = require_markdown_table();
  module2.exports = toMarkdown;
  function toMarkdown(options) {
    var settings = options || {};
    var padding = settings.tableCellPadding;
    var alignDelimiters = settings.tablePipeAlign;
    var stringLength = settings.stringLength;
    var around = padding ? " " : "|";
    return {
      unsafe: [
        {character: "\r", inConstruct: "tableCell"},
        {character: "\n", inConstruct: "tableCell"},
        {atBreak: true, character: "|", after: "[	 :-]"},
        {character: "|", inConstruct: "tableCell"},
        {atBreak: true, character: ":", after: "-"},
        {atBreak: true, character: "-", after: "[:|-]"}
      ],
      handlers: {
        table: handleTable,
        tableRow: handleTableRow,
        tableCell: handleTableCell,
        inlineCode: inlineCodeWithTable
      }
    };
    function handleTable(node, _, context) {
      return serializeData(handleTableAsData(node, context), node.align);
    }
    function handleTableRow(node, _, context) {
      var row = handleTableRowAsData(node, context);
      var value = serializeData([row]);
      return value.slice(0, value.indexOf("\n"));
    }
    function handleTableCell(node, _, context) {
      var exit = context.enter("tableCell");
      var value = phrasing(node, context, {before: around, after: around});
      exit();
      return value;
    }
    function serializeData(matrix, align) {
      return markdownTable(matrix, {
        align,
        alignDelimiters,
        padding,
        stringLength
      });
    }
    function handleTableAsData(node, context) {
      var children = node.children;
      var index = -1;
      var length = children.length;
      var result = [];
      var subexit = context.enter("table");
      while (++index < length) {
        result[index] = handleTableRowAsData(children[index], context);
      }
      subexit();
      return result;
    }
    function handleTableRowAsData(node, context) {
      var children = node.children;
      var index = -1;
      var length = children.length;
      var result = [];
      var subexit = context.enter("tableRow");
      while (++index < length) {
        result[index] = handleTableCell(children[index], node, context);
      }
      subexit();
      return result;
    }
    function inlineCodeWithTable(node, parent, context) {
      var value = defaultInlineCode(node, parent, context);
      if (context.stack.indexOf("tableCell") !== -1) {
        value = value.replace(/\|/g, "\\$&");
      }
      return value;
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
var require_check_bullet = __commonJS((exports2, module2) => {
  module2.exports = checkBullet;
  function checkBullet(context) {
    var marker = context.options.bullet || "*";
    if (marker !== "*" && marker !== "+" && marker !== "-") {
      throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
    }
    return marker;
  }
});

// node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
var require_check_list_item_indent = __commonJS((exports2, module2) => {
  module2.exports = checkListItemIndent;
  function checkListItemIndent(context) {
    var style = context.options.listItemIndent || "tab";
    if (style === 1 || style === "1") {
      return "one";
    }
    if (style !== "tab" && style !== "one" && style !== "mixed") {
      throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
    }
    return style;
  }
});

// node_modules/mdast-util-to-markdown/lib/util/container-flow.js
var require_container_flow = __commonJS((exports2, module2) => {
  module2.exports = flow;
  var repeat = require_repeat_string();
  function flow(parent, context) {
    var children = parent.children || [];
    var results = [];
    var index = -1;
    var child;
    while (++index < children.length) {
      child = children[index];
      results.push(context.handle(child, parent, context, {before: "\n", after: "\n"}));
      if (index + 1 < children.length) {
        results.push(between(child, children[index + 1]));
      }
    }
    return results.join("");
    function between(left, right) {
      var index2 = -1;
      var result;
      while (++index2 < context.join.length) {
        result = context.join[index2](left, right, parent, context);
        if (result === true || result === 1) {
          break;
        }
        if (typeof result === "number") {
          return repeat("\n", 1 + Number(result));
        }
        if (result === false) {
          return "\n\n<!---->\n\n";
        }
      }
      return "\n\n";
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
var require_indent_lines = __commonJS((exports2, module2) => {
  module2.exports = indentLines;
  var eol = /\r?\n|\r/g;
  function indentLines(value, map) {
    var result = [];
    var start = 0;
    var line = 0;
    var match;
    while (match = eol.exec(value)) {
      one(value.slice(start, match.index));
      result.push(match[0]);
      start = match.index + match[0].length;
      line++;
    }
    one(value.slice(start));
    return result.join("");
    function one(value2) {
      result.push(map(value2, line, !value2));
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/handle/list-item.js
var require_list_item = __commonJS((exports2, module2) => {
  module2.exports = listItem;
  var repeat = require_repeat_string();
  var checkBullet = require_check_bullet();
  var checkListItemIndent = require_check_list_item_indent();
  var flow = require_container_flow();
  var indentLines = require_indent_lines();
  function listItem(node, parent, context) {
    var bullet = checkBullet(context);
    var listItemIndent = checkListItemIndent(context);
    var size;
    var value;
    var exit;
    if (parent && parent.ordered) {
      bullet = (parent.start > -1 ? parent.start : 1) + (context.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + ".";
    }
    size = bullet.length + 1;
    if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.spread || node.spread)) {
      size = Math.ceil(size / 4) * 4;
    }
    exit = context.enter("listItem");
    value = indentLines(flow(node, context), map);
    exit();
    return value;
    function map(line, index, blank) {
      if (index) {
        return (blank ? "" : repeat(" ", size)) + line;
      }
      return (blank ? bullet : bullet + repeat(" ", size - bullet.length)) + line;
    }
  }
});

// node_modules/mdast-util-gfm-task-list-item/to-markdown.js
var require_to_markdown4 = __commonJS((exports2) => {
  var defaultListItem = require_list_item();
  exports2.unsafe = [{atBreak: true, character: "-", after: "[:|-]"}];
  exports2.handlers = {
    listItem: listItemWithTaskListItem
  };
  function listItemWithTaskListItem(node, parent, context) {
    var value = defaultListItem(node, parent, context);
    var head = node.children[0];
    if (typeof node.checked === "boolean" && head && head.type === "paragraph") {
      value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }
    return value;
    function check($0) {
      return $0 + "[" + (node.checked ? "x" : " ") + "] ";
    }
  }
});

// node_modules/mdast-util-to-markdown/lib/configure.js
var require_configure = __commonJS((exports2, module2) => {
  module2.exports = configure;
  function configure(base, extension) {
    var index = -1;
    var key;
    if (extension.extensions) {
      while (++index < extension.extensions.length) {
        configure(base, extension.extensions[index]);
      }
    }
    for (key in extension) {
      if (key === "extensions") {
      } else if (key === "unsafe" || key === "join") {
        base[key] = base[key].concat(extension[key] || []);
      } else if (key === "handlers") {
        base[key] = Object.assign(base[key], extension[key] || {});
      } else {
        base.options[key] = extension[key];
      }
    }
    return base;
  }
});

// node_modules/mdast-util-gfm/to-markdown.js
var require_to_markdown5 = __commonJS((exports2, module2) => {
  var autolinkLiteral = require_to_markdown();
  var strikethrough = require_to_markdown2();
  var table = require_to_markdown3();
  var taskListItem = require_to_markdown4();
  var configure = require_configure();
  module2.exports = toMarkdown;
  function toMarkdown(options) {
    var config = configure({handlers: {}, join: [], unsafe: [], options: {}}, {
      extensions: [autolinkLiteral, strikethrough, table(options), taskListItem]
    });
    return Object.assign(config.options, {
      handlers: config.handlers,
      join: config.join,
      unsafe: config.unsafe
    });
  }
});

// node_modules/remark-gfm/index.js
var require_remark_gfm = __commonJS((exports2, module2) => {
  "use strict";
  var syntax = require_micromark_extension_gfm();
  var fromMarkdown = require_from_markdown5();
  var toMarkdown = require_to_markdown5();
  var warningIssued;
  module2.exports = gfm;
  function gfm(options) {
    var data = this.data();
    if (!warningIssued && (this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers || this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors)) {
      warningIssued = true;
      console.warn("[remark-gfm] Warning: please upgrade to remark 13 to use this plugin");
    }
    add("micromarkExtensions", syntax(options));
    add("fromMarkdownExtensions", fromMarkdown);
    add("toMarkdownExtensions", toMarkdown(options));
    function add(field, value) {
      if (data[field])
        data[field].push(value);
      else
        data[field] = [value];
    }
  }
});

// node_modules/@instantish/martian/build/src/index.js
var require_src = __commonJS((exports2) => {
  "use strict";
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.markdownToRichText = exports2.markdownToBlocks = void 0;
  var unified_1 = __importDefault(require_unified());
  var remark_parse_1 = __importDefault(require_remark_parse());
  var internal_1 = require_internal();
  var remark_gfm_1 = __importDefault(require_remark_gfm());
  function markdownToBlocks2(body) {
    const root = unified_1.default().use(remark_parse_1.default).use(remark_gfm_1.default).parse(body);
    return internal_1.parseBlocks(root);
  }
  exports2.markdownToBlocks = markdownToBlocks2;
  function markdownToRichText(text) {
    const root = unified_1.default().use(remark_parse_1.default).use(remark_gfm_1.default).parse(text);
    return internal_1.parseRichText(root);
  }
  exports2.markdownToRichText = markdownToRichText;
});

// node_modules/@notionhq/client/build/src/helpers.js
var require_helpers = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.isObject = exports2.pick = exports2.assertNever = void 0;
  function assertNever(value) {
    throw new Error(`Unexpected value should never occur: ${value}`);
  }
  exports2.assertNever = assertNever;
  function pick(base, keys) {
    const entries = keys.map((key) => [key, base === null || base === void 0 ? void 0 : base[key]]);
    return Object.fromEntries(entries);
  }
  exports2.pick = pick;
  function isObject(o) {
    return typeof o === "object" && o !== null;
  }
  exports2.isObject = isObject;
});

// node_modules/@notionhq/client/build/src/logging.js
var require_logging = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.logLevelSeverity = exports2.makeConsoleLogger = exports2.LogLevel = void 0;
  var helpers_1 = require_helpers();
  var LogLevel;
  (function(LogLevel2) {
    LogLevel2["DEBUG"] = "debug";
    LogLevel2["INFO"] = "info";
    LogLevel2["WARN"] = "warn";
    LogLevel2["ERROR"] = "error";
  })(LogLevel = exports2.LogLevel || (exports2.LogLevel = {}));
  function makeConsoleLogger(name) {
    return (level, message, extraInfo) => {
      console[level](`${name} ${level}:`, message, extraInfo);
    };
  }
  exports2.makeConsoleLogger = makeConsoleLogger;
  function logLevelSeverity(level) {
    switch (level) {
      case LogLevel.DEBUG:
        return 20;
      case LogLevel.INFO:
        return 40;
      case LogLevel.WARN:
        return 60;
      case LogLevel.ERROR:
        return 80;
      default:
        return helpers_1.assertNever(level);
    }
  }
  exports2.logLevelSeverity = logLevelSeverity;
});

// node_modules/@notionhq/client/build/src/errors.js
var require_errors = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.buildRequestError = exports2.APIResponseError = exports2.UnknownHTTPResponseError = exports2.isHTTPResponseError = exports2.RequestTimeoutError = exports2.isNotionClientError = exports2.ClientErrorCode = exports2.APIErrorCode = void 0;
  var helpers_1 = require_helpers();
  var APIErrorCode;
  (function(APIErrorCode2) {
    APIErrorCode2["Unauthorized"] = "unauthorized";
    APIErrorCode2["RestrictedResource"] = "restricted_resource";
    APIErrorCode2["ObjectNotFound"] = "object_not_found";
    APIErrorCode2["RateLimited"] = "rate_limited";
    APIErrorCode2["InvalidJSON"] = "invalid_json";
    APIErrorCode2["InvalidRequestURL"] = "invalid_request_url";
    APIErrorCode2["InvalidRequest"] = "invalid_request";
    APIErrorCode2["ValidationError"] = "validation_error";
    APIErrorCode2["ConflictError"] = "conflict_error";
    APIErrorCode2["InternalServerError"] = "internal_server_error";
    APIErrorCode2["ServiceUnavailable"] = "service_unavailable";
  })(APIErrorCode = exports2.APIErrorCode || (exports2.APIErrorCode = {}));
  var ClientErrorCode;
  (function(ClientErrorCode2) {
    ClientErrorCode2["RequestTimeout"] = "notionhq_client_request_timeout";
    ClientErrorCode2["ResponseError"] = "notionhq_client_response_error";
  })(ClientErrorCode = exports2.ClientErrorCode || (exports2.ClientErrorCode = {}));
  var NotionClientErrorBase = class extends Error {
  };
  function isNotionClientError(error) {
    return helpers_1.isObject(error) && error instanceof NotionClientErrorBase;
  }
  exports2.isNotionClientError = isNotionClientError;
  function isNotionClientErrorWithCode(error, codes) {
    return isNotionClientError(error) && error.code in codes;
  }
  var RequestTimeoutError = class extends NotionClientErrorBase {
    constructor(message = "Request to Notion API has timed out") {
      super(message);
      this.code = ClientErrorCode.RequestTimeout;
      this.name = "RequestTimeoutError";
    }
    static isRequestTimeoutError(error) {
      return isNotionClientErrorWithCode(error, {
        [ClientErrorCode.RequestTimeout]: true
      });
    }
    static rejectAfterTimeout(promise, timeoutMS) {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new RequestTimeoutError());
        }, timeoutMS);
        promise.then(resolve).catch(reject).then(() => clearTimeout(timeoutId));
      });
    }
  };
  exports2.RequestTimeoutError = RequestTimeoutError;
  var HTTPResponseError = class extends NotionClientErrorBase {
    constructor(args) {
      super(args.message);
      this.name = "HTTPResponseError";
      const {code, status, headers, rawBodyText} = args;
      this.code = code;
      this.status = status;
      this.headers = headers;
      this.body = rawBodyText;
    }
  };
  var httpResponseErrorCodes = {
    [ClientErrorCode.ResponseError]: true,
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RestrictedResource]: true,
    [APIErrorCode.ObjectNotFound]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidJSON]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.ConflictError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true
  };
  function isHTTPResponseError(error) {
    if (!isNotionClientErrorWithCode(error, httpResponseErrorCodes)) {
      return false;
    }
    return true;
  }
  exports2.isHTTPResponseError = isHTTPResponseError;
  var UnknownHTTPResponseError = class extends HTTPResponseError {
    constructor(args) {
      var _a;
      super({
        ...args,
        code: ClientErrorCode.ResponseError,
        message: (_a = args.message) !== null && _a !== void 0 ? _a : `Request to Notion API failed with status: ${args.status}`
      });
      this.name = "UnknownHTTPResponseError";
    }
    static isUnknownHTTPResponseError(error) {
      return isNotionClientErrorWithCode(error, {
        [ClientErrorCode.ResponseError]: true
      });
    }
  };
  exports2.UnknownHTTPResponseError = UnknownHTTPResponseError;
  var apiErrorCodes = {
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RestrictedResource]: true,
    [APIErrorCode.ObjectNotFound]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidJSON]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.ConflictError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true
  };
  var APIResponseError = class extends HTTPResponseError {
    constructor() {
      super(...arguments);
      this.name = "APIResponseError";
    }
    static isAPIResponseError(error) {
      return isNotionClientErrorWithCode(error, apiErrorCodes);
    }
  };
  exports2.APIResponseError = APIResponseError;
  function buildRequestError(response, bodyText) {
    const apiErrorResponseBody = parseAPIErrorResponseBody(bodyText);
    if (apiErrorResponseBody !== void 0) {
      return new APIResponseError({
        code: apiErrorResponseBody.code,
        message: apiErrorResponseBody.message,
        headers: response.headers,
        status: response.status,
        rawBodyText: bodyText
      });
    }
    return new UnknownHTTPResponseError({
      message: void 0,
      headers: response.headers,
      status: response.status,
      rawBodyText: bodyText
    });
  }
  exports2.buildRequestError = buildRequestError;
  function parseAPIErrorResponseBody(body) {
    if (typeof body !== "string") {
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (parseError) {
      return;
    }
    if (!helpers_1.isObject(parsed) || typeof parsed["message"] !== "string" || !isAPIErrorCode(parsed["code"])) {
      return;
    }
    return {
      ...parsed,
      code: parsed["code"],
      message: parsed["message"]
    };
  }
  function isAPIErrorCode(code) {
    return typeof code === "string" && code in apiErrorCodes;
  }
});

// node_modules/@notionhq/client/build/src/api-endpoints.js
var require_api_endpoints = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.search = exports2.usersList = exports2.usersRetrieve = exports2.pagesUpdate = exports2.pagesRetrieve = exports2.databasesUpdate = exports2.databasesCreate = exports2.pagesCreate = exports2.databasesRetrieve = exports2.databasesQuery = exports2.databasesList = exports2.blocksChildrenList = exports2.blocksChildrenAppend = exports2.blocksDelete = exports2.blocksUpdate = exports2.blocksRetrieve = void 0;
  exports2.blocksRetrieve = {
    method: "get",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `blocks/${p.block_id}`
  };
  exports2.blocksUpdate = {
    method: "patch",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: [
      "paragraph",
      "heading_1",
      "heading_2",
      "heading_3",
      "bulleted_list_item",
      "numbered_list_item",
      "toggle",
      "to_do",
      "archived"
    ],
    path: (p) => `blocks/${p.block_id}`
  };
  exports2.blocksDelete = {
    method: "delete",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `blocks/${p.block_id}`
  };
  exports2.blocksChildrenAppend = {
    method: "patch",
    pathParams: ["block_id"],
    queryParams: [],
    bodyParams: ["children"],
    path: (p) => `blocks/${p.block_id}/children`
  };
  exports2.blocksChildrenList = {
    method: "get",
    pathParams: ["block_id"],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: (p) => `blocks/${p.block_id}/children`
  };
  exports2.databasesList = {
    method: "get",
    pathParams: [],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: () => `databases`
  };
  exports2.databasesQuery = {
    method: "post",
    pathParams: ["database_id"],
    queryParams: [],
    bodyParams: ["filter", "sorts", "start_cursor", "page_size"],
    path: (p) => `databases/${p.database_id}/query`
  };
  exports2.databasesRetrieve = {
    method: "get",
    pathParams: ["database_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `databases/${p.database_id}`
  };
  exports2.pagesCreate = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: ["parent", "properties", "children", "icon", "cover"],
    path: () => `pages`
  };
  exports2.databasesCreate = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: ["parent", "properties", "title", "icon", "cover"],
    path: () => `databases`
  };
  exports2.databasesUpdate = {
    method: "patch",
    pathParams: ["database_id"],
    queryParams: [],
    bodyParams: ["properties", "title", "icon", "cover"],
    path: (d) => `databases/${d.database_id}`
  };
  exports2.pagesRetrieve = {
    method: "get",
    pathParams: ["page_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `pages/${p.page_id}`
  };
  exports2.pagesUpdate = {
    method: "patch",
    pathParams: ["page_id"],
    queryParams: [],
    bodyParams: ["archived", "properties", "cover", "icon"],
    path: (p) => `pages/${p.page_id}`
  };
  exports2.usersRetrieve = {
    method: "get",
    pathParams: ["user_id"],
    queryParams: [],
    bodyParams: [],
    path: (p) => `users/${p.user_id}`
  };
  exports2.usersList = {
    method: "get",
    pathParams: [],
    queryParams: ["start_cursor", "page_size"],
    bodyParams: [],
    path: () => `users`
  };
  exports2.search = {
    method: "post",
    pathParams: [],
    queryParams: [],
    bodyParams: ["query", "sort", "filter", "start_cursor", "page_size"],
    path: () => `search`
  };
});

// node_modules/node-fetch/browser.js
var require_browser = __commonJS((exports2, module2) => {
  "use strict";
  var getGlobal = function() {
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global2 !== "undefined") {
      return global2;
    }
    throw new Error("unable to locate global object");
  };
  var global2 = getGlobal();
  module2.exports = exports2 = global2.fetch;
  if (global2.fetch) {
    exports2.default = global2.fetch.bind(global2);
  }
  exports2.Headers = global2.Headers;
  exports2.Request = global2.Request;
  exports2.Response = global2.Response;
});

// node_modules/@notionhq/client/build/package.json
var require_package = __commonJS((exports2, module2) => {
  module2.exports = {
    name: "@notionhq/client",
    version: "0.3.2",
    description: "A simple and easy to use client for the Notion API",
    engines: {
      node: ">=12"
    },
    homepage: "https://developers.notion.com/docs/getting-started",
    bugs: {
      url: "https://github.com/makenotion/notion-sdk-js/issues"
    },
    repository: {
      type: "git",
      url: "https://github.com/makenotion/notion-sdk-js/"
    },
    keywords: [
      "notion",
      "notionapi",
      "rest",
      "notion-api"
    ],
    main: "./build/src",
    scripts: {
      prepare: "npm run build",
      prepublishOnly: "npm run lint && npm run test",
      build: "tsc",
      prettier: "prettier --write .",
      lint: "prettier --check . && eslint . --ext .ts && cspell '**/*' ",
      test: "ava",
      "check-links": "git ls-files | grep md$ | xargs -n 1 markdown-link-check",
      prebuild: "npm run clean",
      clean: "rm -rf ./build"
    },
    author: "",
    license: "MIT",
    files: [
      "build/package.json",
      "build/src/**"
    ],
    dependencies: {
      "@types/node-fetch": "^2.5.10",
      "node-fetch": "^2.6.1"
    },
    devDependencies: {
      "@ava/typescript": "^2.0.0",
      "@typescript-eslint/eslint-plugin": "^4.22.0",
      "@typescript-eslint/parser": "^4.22.0",
      ava: "^3.15.0",
      cspell: "^5.4.1",
      eslint: "^7.24.0",
      "markdown-link-check": "^3.8.7",
      prettier: "^2.3.0",
      typescript: "^4.2.4"
    }
  };
});

// node_modules/@notionhq/client/build/src/Client.js
var require_Client = __commonJS((exports2) => {
  "use strict";
  var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Client_auth;
  var _Client_logLevel;
  var _Client_logger;
  var _Client_prefixUrl;
  var _Client_timeoutMs;
  var _Client_notionVersion;
  var _Client_fetch;
  var _Client_agent;
  var _Client_userAgent;
  Object.defineProperty(exports2, "__esModule", {value: true});
  var logging_1 = require_logging();
  var errors_1 = require_errors();
  var helpers_1 = require_helpers();
  var api_endpoints_1 = require_api_endpoints();
  var node_fetch_1 = require_browser();
  var package_json_1 = require_package();
  var Client2 = class {
    constructor(options) {
      var _a, _b, _c, _d, _e, _f;
      _Client_auth.set(this, void 0);
      _Client_logLevel.set(this, void 0);
      _Client_logger.set(this, void 0);
      _Client_prefixUrl.set(this, void 0);
      _Client_timeoutMs.set(this, void 0);
      _Client_notionVersion.set(this, void 0);
      _Client_fetch.set(this, void 0);
      _Client_agent.set(this, void 0);
      _Client_userAgent.set(this, void 0);
      this.blocks = {
        retrieve: (args) => {
          return this.request({
            path: api_endpoints_1.blocksRetrieve.path(args),
            method: api_endpoints_1.blocksRetrieve.method,
            query: helpers_1.pick(args, api_endpoints_1.blocksRetrieve.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.blocksRetrieve.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        update: (args) => {
          return this.request({
            path: api_endpoints_1.blocksUpdate.path(args),
            method: api_endpoints_1.blocksUpdate.method,
            query: helpers_1.pick(args, api_endpoints_1.blocksUpdate.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.blocksUpdate.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        delete: (args) => {
          return this.request({
            path: api_endpoints_1.blocksDelete.path(args),
            method: api_endpoints_1.blocksDelete.method,
            query: helpers_1.pick(args, api_endpoints_1.blocksDelete.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.blocksDelete.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        children: {
          append: (args) => {
            return this.request({
              path: api_endpoints_1.blocksChildrenAppend.path(args),
              method: api_endpoints_1.blocksChildrenAppend.method,
              query: helpers_1.pick(args, api_endpoints_1.blocksChildrenAppend.queryParams),
              body: helpers_1.pick(args, api_endpoints_1.blocksChildrenAppend.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          list: (args) => {
            return this.request({
              path: api_endpoints_1.blocksChildrenList.path(args),
              method: api_endpoints_1.blocksChildrenList.method,
              query: helpers_1.pick(args, api_endpoints_1.blocksChildrenList.queryParams),
              body: helpers_1.pick(args, api_endpoints_1.blocksChildrenList.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          }
        }
      };
      this.databases = {
        list: (args = {}) => {
          return this.request({
            path: api_endpoints_1.databasesList.path(),
            method: api_endpoints_1.databasesList.method,
            query: helpers_1.pick(args, api_endpoints_1.databasesList.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.databasesList.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        retrieve: (args) => {
          return this.request({
            path: api_endpoints_1.databasesRetrieve.path(args),
            method: api_endpoints_1.databasesRetrieve.method,
            query: helpers_1.pick(args, api_endpoints_1.databasesRetrieve.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.databasesRetrieve.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        query: (args) => {
          return this.request({
            path: api_endpoints_1.databasesQuery.path(args),
            method: api_endpoints_1.databasesQuery.method,
            query: helpers_1.pick(args, api_endpoints_1.databasesQuery.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.databasesQuery.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        create: (args) => {
          return this.request({
            path: api_endpoints_1.databasesCreate.path(),
            method: api_endpoints_1.databasesCreate.method,
            query: helpers_1.pick(args, api_endpoints_1.databasesCreate.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.databasesCreate.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        update: (args) => {
          return this.request({
            path: api_endpoints_1.databasesUpdate.path(args),
            method: api_endpoints_1.databasesUpdate.method,
            query: helpers_1.pick(args, api_endpoints_1.databasesUpdate.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.databasesUpdate.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        }
      };
      this.pages = {
        create: (args) => {
          return this.request({
            path: api_endpoints_1.pagesCreate.path(),
            method: api_endpoints_1.pagesCreate.method,
            query: helpers_1.pick(args, api_endpoints_1.pagesCreate.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.pagesCreate.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        retrieve: (args) => {
          return this.request({
            path: api_endpoints_1.pagesRetrieve.path(args),
            method: api_endpoints_1.pagesRetrieve.method,
            query: helpers_1.pick(args, api_endpoints_1.pagesRetrieve.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.pagesRetrieve.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        update: (args) => {
          return this.request({
            path: api_endpoints_1.pagesUpdate.path(args),
            method: api_endpoints_1.pagesUpdate.method,
            query: helpers_1.pick(args, api_endpoints_1.pagesUpdate.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.pagesUpdate.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        }
      };
      this.users = {
        retrieve: (args) => {
          return this.request({
            path: api_endpoints_1.usersRetrieve.path(args),
            method: api_endpoints_1.usersRetrieve.method,
            query: helpers_1.pick(args, api_endpoints_1.usersRetrieve.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.usersRetrieve.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        },
        list: (args = {}) => {
          return this.request({
            path: api_endpoints_1.usersList.path(),
            method: api_endpoints_1.usersList.method,
            query: helpers_1.pick(args, api_endpoints_1.usersList.queryParams),
            body: helpers_1.pick(args, api_endpoints_1.usersList.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        }
      };
      __classPrivateFieldSet(this, _Client_auth, options === null || options === void 0 ? void 0 : options.auth, "f");
      __classPrivateFieldSet(this, _Client_logLevel, (_a = options === null || options === void 0 ? void 0 : options.logLevel) !== null && _a !== void 0 ? _a : logging_1.LogLevel.WARN, "f");
      __classPrivateFieldSet(this, _Client_logger, (_b = options === null || options === void 0 ? void 0 : options.logger) !== null && _b !== void 0 ? _b : logging_1.makeConsoleLogger(package_json_1.name), "f");
      __classPrivateFieldSet(this, _Client_prefixUrl, ((_c = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _c !== void 0 ? _c : "https://api.notion.com") + "/v1/", "f");
      __classPrivateFieldSet(this, _Client_timeoutMs, (_d = options === null || options === void 0 ? void 0 : options.timeoutMs) !== null && _d !== void 0 ? _d : 6e4, "f");
      __classPrivateFieldSet(this, _Client_notionVersion, (_e = options === null || options === void 0 ? void 0 : options.notionVersion) !== null && _e !== void 0 ? _e : Client2.defaultNotionVersion, "f");
      __classPrivateFieldSet(this, _Client_fetch, (_f = options === null || options === void 0 ? void 0 : options.fetch) !== null && _f !== void 0 ? _f : node_fetch_1.default, "f");
      __classPrivateFieldSet(this, _Client_agent, options === null || options === void 0 ? void 0 : options.agent, "f");
      __classPrivateFieldSet(this, _Client_userAgent, `notionhq-client/${package_json_1.version}`, "f");
    }
    async request({path, method, query, body, auth}) {
      this.log(logging_1.LogLevel.INFO, "request start", {method, path});
      const bodyAsJsonString = !body || Object.entries(body).length === 0 ? void 0 : JSON.stringify(body);
      const url = new URL(`${__classPrivateFieldGet(this, _Client_prefixUrl, "f")}${path}`);
      if (query) {
        for (const [key, value] of Object.entries(query)) {
          if (value !== void 0) {
            url.searchParams.append(key, String(value));
          }
        }
      }
      const headers = {
        ...this.authAsHeaders(auth),
        "Notion-Version": __classPrivateFieldGet(this, _Client_notionVersion, "f"),
        "user-agent": __classPrivateFieldGet(this, _Client_userAgent, "f")
      };
      if (bodyAsJsonString !== void 0) {
        headers["content-type"] = "application/json";
      }
      try {
        const response = await errors_1.RequestTimeoutError.rejectAfterTimeout(__classPrivateFieldGet(this, _Client_fetch, "f").call(this, url.toString(), {
          method,
          headers,
          body: bodyAsJsonString,
          agent: __classPrivateFieldGet(this, _Client_agent, "f")
        }), __classPrivateFieldGet(this, _Client_timeoutMs, "f"));
        const responseText = await response.text();
        if (!response.ok) {
          throw errors_1.buildRequestError(response, responseText);
        }
        const responseJson = JSON.parse(responseText);
        this.log(logging_1.LogLevel.INFO, `request success`, {method, path});
        return responseJson;
      } catch (error) {
        if (!errors_1.isNotionClientError(error)) {
          throw error;
        }
        this.log(logging_1.LogLevel.WARN, `request fail`, {
          code: error.code,
          message: error.message
        });
        if (errors_1.isHTTPResponseError(error)) {
          this.log(logging_1.LogLevel.DEBUG, `failed response body`, {
            body: error.body
          });
        }
        throw error;
      }
    }
    search(args) {
      return this.request({
        path: api_endpoints_1.search.path(),
        method: api_endpoints_1.search.method,
        query: helpers_1.pick(args, api_endpoints_1.search.queryParams),
        body: helpers_1.pick(args, api_endpoints_1.search.bodyParams),
        auth: args === null || args === void 0 ? void 0 : args.auth
      });
    }
    log(level, message, extraInfo) {
      if (logging_1.logLevelSeverity(level) >= logging_1.logLevelSeverity(__classPrivateFieldGet(this, _Client_logLevel, "f"))) {
        __classPrivateFieldGet(this, _Client_logger, "f").call(this, level, message, extraInfo);
      }
    }
    authAsHeaders(auth) {
      const headers = {};
      const authHeaderValue = auth !== null && auth !== void 0 ? auth : __classPrivateFieldGet(this, _Client_auth, "f");
      if (authHeaderValue !== void 0) {
        headers["authorization"] = `Bearer ${authHeaderValue}`;
      }
      return headers;
    }
  };
  exports2.default = Client2;
  _Client_auth = new WeakMap(), _Client_logLevel = new WeakMap(), _Client_logger = new WeakMap(), _Client_prefixUrl = new WeakMap(), _Client_timeoutMs = new WeakMap(), _Client_notionVersion = new WeakMap(), _Client_fetch = new WeakMap(), _Client_agent = new WeakMap(), _Client_userAgent = new WeakMap();
  Client2.defaultNotionVersion = "2021-08-16";
});

// node_modules/@notionhq/client/build/src/index.js
var require_src2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.isNotionClientError = exports2.RequestTimeoutError = exports2.UnknownHTTPResponseError = exports2.APIResponseError = exports2.ClientErrorCode = exports2.APIErrorCode = exports2.LogLevel = exports2.Client = void 0;
  var Client_1 = require_Client();
  Object.defineProperty(exports2, "Client", {enumerable: true, get: function() {
    return Client_1.default;
  }});
  var logging_1 = require_logging();
  Object.defineProperty(exports2, "LogLevel", {enumerable: true, get: function() {
    return logging_1.LogLevel;
  }});
  var errors_1 = require_errors();
  Object.defineProperty(exports2, "APIErrorCode", {enumerable: true, get: function() {
    return errors_1.APIErrorCode;
  }});
  Object.defineProperty(exports2, "ClientErrorCode", {enumerable: true, get: function() {
    return errors_1.ClientErrorCode;
  }});
  Object.defineProperty(exports2, "APIResponseError", {enumerable: true, get: function() {
    return errors_1.APIResponseError;
  }});
  Object.defineProperty(exports2, "UnknownHTTPResponseError", {enumerable: true, get: function() {
    return errors_1.UnknownHTTPResponseError;
  }});
  Object.defineProperty(exports2, "RequestTimeoutError", {enumerable: true, get: function() {
    return errors_1.RequestTimeoutError;
  }});
  Object.defineProperty(exports2, "isNotionClientError", {enumerable: true, get: function() {
    return errors_1.isNotionClientError;
  }});
});

// src/main.js
__markAsModule(exports);
__export(exports, {
  NOTION_CLIENT: () => NOTION_CLIENT,
  PLUGIN: () => PLUGIN,
  default: () => main_default,
  pluginIcon: () => pluginIcon
});

// src/settingTab.js
var import_obsidian = __toModule(require("obsidian"));
var OpnSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    let {containerEl} = this;
    containerEl.empty();
    containerEl.createEl("h2", {
      text: "Publish to Notion"
    });
    new import_obsidian.Setting(containerEl).setName("Notion Integration Token").addText((text) => text.setPlaceholder("secret_...").setValue(this.plugin.settings.token).onChange(async (value) => {
      this.plugin.settings.token = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("Database Id").addText((text) => text.setPlaceholder("Database id").setValue(this.plugin.settings.database).onChange(async (value) => {
      this.plugin.settings.database = value;
      await this.plugin.saveSettings();
    }));
  }
};
var settingTab_default = OpnSettingTab;

// src/main.js
var import_obsidian3 = __toModule(require("obsidian"));

// src/utils.js
var import_martian = __toModule(require_src());
var import_obsidian2 = __toModule(require("obsidian"));

// src/notion.js
async function newPage(title, blocks) {
  return NOTION_CLIENT.pages.create({
    parent: {
      database_id: PLUGIN.settings.database
    },
    properties: {
      Name: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: title
            }
          }
        ]
      }
    },
    children: blocks
  }).then((res) => {
    log(res);
    let publicUrl = res.url.replace("https://www.notion.so/", "https://gorgeous-wilderness-7e2.notion.site/");
    return publicUrl;
  });
}

// src/utils.js
var log = () => {
};
function publishNote(note) {
  if (PLUGIN.settings.token === "" || PLUGIN.settings.database === "") {
    new import_obsidian2.Notice("Please configure plugin");
    return false;
  }
  log(note);
  note.vault.read(note).then((data) => newPage(note.basename, (0, import_martian.markdownToBlocks)(data))).then((url) => {
    require("electron").clipboard.writeText(url);
    new import_obsidian2.Notice(`Public Link copied to clipboard`);
  });
}

// src/main.js
var import_client = __toModule(require_src2());
var DEFAULT_SETTINGS = {
  token: "",
  database: ""
};
var PLUGIN;
var NOTION_CLIENT;
var pluginIcon = "documents";
var ObsidianPublishWithNotion = class extends import_obsidian3.Plugin {
  async onload() {
    log("loading plugin");
    await this.loadSettings();
    this.addSettingTab(new settingTab_default(this.app, this));
    PLUGIN = this;
    NOTION_CLIENT = new import_client.Client({
      auth: PLUGIN.settings.token,
      baseUrl: "https://cors.bridged.cc/https://api.notion.com"
    });
    this.addCommand({
      id: "publish-to-notion",
      name: "Publish",
      checkCallback: (checking) => {
        let leaf = this.app.workspace.activeLeaf;
        let activeFile = this.app.workspace.getActiveFile();
        if (!leaf || !activeFile)
          return false;
        if (checking)
          return true;
        log(activeFile);
        publishNote(activeFile);
        return true;
      }
    });
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      if (file instanceof import_obsidian3.TFile) {
        menu.addItem((item) => {
          item.setTitle("Publish to Notion").setIcon(pluginIcon).onClick(() => publishNote(file));
        });
      }
    }));
  }
  onunload() {
    log("unloading plugin");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var main_default = ObsidianPublishWithNotion;
