(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@sparkwave/js-math-tools/dist/js-math-tools.js
  var require_js_math_tools = __commonJS({
    "node_modules/@sparkwave/js-math-tools/dist/js-math-tools.js"() {
      (() => {
        var __getOwnPropNames2 = Object.getOwnPropertyNames;
        var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
          get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
        }) : x)(function(x) {
          if (typeof __require !== "undefined")
            return __require.apply(this, arguments);
          throw new Error('Dynamic require of "' + x + '" is not supported');
        });
        var __commonJS2 = (cb, mod) => function __require22() {
          return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
        };
        var require_math_error = __commonJS2({
          "src/math-error.js"(exports2, module2) {
            var isBrowser = new Function(`
  try {
    return this === window
  } catch(e) {}

  try {
    return typeof importScripts !== "undefined"
  } catch(e) {}

  return false
`);
            var MathError = class extends Error {
              constructor(message) {
                if (isBrowser()) {
                  super(message);
                } else {
                  super("\n\n\x1B[31m" + message + "\n\x1B[0m");
                }
              }
            };
            module2.exports = MathError;
          }
        });
        var require_assert = __commonJS2({
          "src/assert.js"(exports2, module2) {
            var MathError = require_math_error();
            module2.exports = function(isTrue, message) {
              if (!isTrue)
                throw new MathError(message);
            };
          }
        });
        var require_is_array = __commonJS2({
          "src/is-array.js"(exports2, module2) {
            function isArray(obj) {
              try {
                return obj instanceof Array || typeof obj.constructor !== "undefined" && obj.constructor.name === "Array";
              } catch (e) {
                return false;
              }
            }
            module2.exports = isArray;
          }
        });
        var require_is_dataframe = __commonJS2({
          "src/is-dataframe.js"(exports2, module2) {
            function isDataFrame(x) {
              try {
                return !!x._symbol && x._symbol === Symbol.for("@sparkwave/js-math-tools/dataframe");
              } catch (e) {
                return false;
              }
            }
            module2.exports = isDataFrame;
          }
        });
        var require_is_function = __commonJS2({
          "src/is-function.js"(exports2, module2) {
            function isFunction(fn) {
              return typeof fn === "function";
            }
            module2.exports = isFunction;
          }
        });
        var require_is_number = __commonJS2({
          "src/is-number.js"(exports2, module2) {
            function isNumber(x) {
              return typeof x === "number" && !isNaN(x);
            }
            module2.exports = isNumber;
          }
        });
        var require_is_undefined = __commonJS2({
          "src/is-undefined.js"(exports2, module2) {
            function isUndefined(x) {
              return x === null || typeof x === "undefined";
            }
            module2.exports = isUndefined;
          }
        });
        var require_is_object = __commonJS2({
          "src/is-object.js"(exports2, module2) {
            var isArray = require_is_array();
            var isUndefined = require_is_undefined();
            function isObject(x) {
              return typeof x === "object" && !isUndefined(x) && !isArray(x);
            }
            module2.exports = isObject;
          }
        });
        var require_is_series = __commonJS2({
          "src/is-series.js"(exports2, module2) {
            function isSeries(x) {
              try {
                return !!x._symbol && x._symbol === Symbol.for("@sparkwave/js-math-tools/series");
              } catch (e) {
                return false;
              }
            }
            module2.exports = isSeries;
          }
        });
        var require_index_of = __commonJS2({
          "src/index-of.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isFunction = require_is_function();
            var isNumber = require_is_number();
            var isObject = require_is_object();
            var isSeries = require_is_series();
            function indexOf(x, fn) {
              if (isDataFrame(x)) {
                const index = indexOf(x.values, fn);
                if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
                  index[0] = x.index[index[0]];
                }
                if (index.length > 1 && isNumber(index[1]) && index[1] >= 0 && index[1] < x.columns.length) {
                  index[1] = x.columns[index[1]];
                }
                return index;
              }
              if (isSeries(x)) {
                const index = indexOf(x.values, fn);
                if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
                  index[0] = x.index[index[0]];
                }
                return index;
              }
              assert(isObject(x) || isArray(x), "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `indexOf` function!");
              if (!isFunction(fn)) {
                const value = fn;
                fn = (v) => v === value;
              }
              function helper(x2, fn2, checked) {
                checked = checked || [];
                if (checked.indexOf(x2) > -1) {
                  return null;
                }
                if (isObject(x2)) {
                  checked.push(x2);
                  const keys = Object.keys(x2);
                  for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = x2[key];
                    if (fn2(value)) {
                      return [key];
                    }
                    const results = helper(value, fn2, checked);
                    if (results && results.length > 0) {
                      return [key].concat(results);
                    }
                  }
                } else if (isArray(x2)) {
                  checked.push(x2);
                  for (let i = 0; i < x2.length; i++) {
                    const value = x2[i];
                    if (fn2(value)) {
                      return [i];
                    }
                    const results = helper(value, fn2, checked);
                    if (results && results.length > 0) {
                      return [i].concat(results);
                    }
                  }
                } else {
                  if (fn2(x2)) {
                    return [];
                  }
                }
                return null;
              }
              function safeFn(v) {
                try {
                  return fn(v);
                } catch (e) {
                  return false;
                }
              }
              const paths = helper(x, safeFn);
              if (paths && paths.length > 0) {
                return paths;
              } else {
                return null;
              }
            }
            module2.exports = indexOf;
          }
        });
        var require_copy = __commonJS2({
          "src/copy.js"(exports2, module2) {
            var indexOf = require_index_of();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function copy(x) {
              try {
                const out = structuredClone(x);
                return out;
              } catch (e) {
                if (typeof x === "object") {
                  if (x === null) {
                    return null;
                  }
                  if (isArray(x)) {
                    return x.map((v) => copy(v));
                  }
                  if (isSeries(x)) {
                    const out2 = x.copy();
                    out2.values = copy(out2.values);
                    return out2;
                  }
                  if (isDataFrame(x)) {
                    const out2 = x.copy();
                    out2.values = copy(x.values);
                    return out2;
                  }
                  x = decycle(x);
                  const out = {};
                  Object.keys(x).forEach((key) => {
                    out[key] = copy(x[key]);
                  });
                  return out;
                } else {
                  return x;
                }
              }
            }
            function decycle(x) {
              function helper(x2, checked, currentPath) {
                checked = checked || [];
                currentPath = currentPath || "";
                if (checked.indexOf(x2) > -1) {
                  const parts = currentPath.split("/").slice(currentPath.startsWith("/") ? 1 : 0);
                  const isANestedCopy = parts.some((v, i) => {
                    const subParts = parts.slice(0, parts.length - i - 1);
                    let temp = orig;
                    subParts.forEach((part) => {
                      temp = temp[part];
                    });
                    return temp === x2;
                  });
                  if (isANestedCopy) {
                    const pathToCopy = orig === x2 ? "/" : "/" + indexOf(orig, x2).join("/");
                    return `<reference to "${pathToCopy}">`;
                  }
                }
                if (typeof x2 === "object") {
                  if (x2 === null)
                    return null;
                  checked.push(x2);
                  if (isArray(x2)) {
                    return x2.map((v, i) => helper(v, checked, currentPath + "/" + i));
                  } else {
                    Object.keys(x2).forEach((key) => {
                      x2[key] = helper(x2[key], checked, currentPath + "/" + key);
                    });
                    return x2;
                  }
                } else {
                  return x2;
                }
              }
              const orig = copy(x);
              let out = helper(orig);
              if (isDataFrame(x)) {
                const temp = x.copy();
                temp._values = out.values;
                temp._columns = out.columns;
                temp._index = out.index;
                out = temp;
              }
              if (isSeries(x)) {
                const temp = x.copy();
                temp.name = out.name;
                temp._values = out.values;
                temp._index = out.index;
                out = temp;
              }
              return out;
            }
            module2.exports = { copy, decycle };
          }
        });
        var require_flatten = __commonJS2({
          "src/flatten.js"(exports2, module2) {
            var { copy } = require_copy();
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function flatten(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return flatten(arr.values);
              }
              assert(isArray(arr), "The `flatten` function only works on arrays, Series, and DataFrames!");
              function helper(arr2) {
                let out = [];
                copy(arr2).forEach((child) => {
                  if (isArray(child)) {
                    out = out.concat(helper(child));
                  } else {
                    out.push(child);
                  }
                });
                return out;
              }
              return helper(arr);
            }
            module2.exports = flatten;
          }
        });
        var require_is_equal = __commonJS2({
          "src/is-equal.js"(exports2, module2) {
            var { decycle } = require_copy();
            function isEqual(a, b) {
              function helper(a2, b2) {
                const aType = typeof a2;
                const bType = typeof b2;
                if (aType !== bType)
                  return false;
                if (aType === "undefined")
                  return true;
                if (aType === "boolean")
                  return a2 === b2;
                if (aType === "symbol")
                  return a2 === b2;
                if (aType === "number" || aType === "bigint") {
                  if (a2.toString() === "NaN" && b2.toString() === "NaN") {
                    return true;
                  }
                  return a2 === b2;
                }
                if (aType === "string")
                  return a2 === b2;
                if (aType === "function")
                  return a2 === b2;
                if (aType === "object") {
                  if (a2 === null || b2 === null) {
                    return a2 === null && b2 === null;
                  } else {
                    const aKeys = Object.keys(a2);
                    const bKeys = Object.keys(b2);
                    if (aKeys.length !== bKeys.length)
                      return false;
                    for (let i = 0; i < aKeys.length; i++) {
                      const key = aKeys[i];
                      if (!helper(a2[key], b2[key]))
                        return false;
                    }
                    return true;
                  }
                }
              }
              try {
                if (a instanceof Date && b instanceof Date) {
                  return a.getTime() === b.getTime();
                }
                return helper(a, b);
              } catch (e) {
                return helper(decycle(a), decycle(b));
              }
            }
            module2.exports = isEqual;
          }
        });
        var require_set = __commonJS2({
          "src/set.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isFunction = require_is_function();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            function makeKey(n) {
              const alpha = "abcdefg1234567890";
              let out = "";
              while (out.length < n)
                out += alpha[parseInt(Math.random() * alpha.length)];
              return out;
            }
            var NULL_KEY = makeKey(256);
            var UNDEFINED_KEY = makeKey(256);
            var INFINITY_KEY = makeKey(256);
            var MINUS_INFINITY_KEY = makeKey(256);
            var SYMBOL_KEY = makeKey(256);
            function set(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return set(arr.values);
              }
              assert(isArray(arr), "The `set` function only works on arrays, Series, and DataFrames!");
              const out = [];
              const temp = {};
              flatten(arr).forEach((item) => {
                const key = typeof item === "object" && item === null ? NULL_KEY : isUndefined(item) ? UNDEFINED_KEY : isFunction(item) ? item.toString() : typeof item === "symbol" ? item.toString() + " - " + SYMBOL_KEY : item === Infinity ? INFINITY_KEY : item === -Infinity ? MINUS_INFINITY_KEY : isDataFrame(item) ? item.toJSONString() : isSeries(item) ? JSON.stringify(item.toObject()) : JSON.stringify(item);
                if (!temp[key])
                  out.push(item);
                temp[key] = true;
              });
              return out;
            }
            module2.exports = set;
          }
        });
        var require_count = __commonJS2({
          "src/count.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isFunction = require_is_function();
            var isSeries = require_is_series();
            var set = require_set();
            function count(arr, matcher) {
              if (isDataFrame(arr) || isSeries(arr)) {
                if (arguments.length > 1) {
                  return count(arr.values, matcher);
                } else {
                  return count(arr.values, arr.values);
                }
              }
              assert(isArray(arr), "The first argument to the `count` function must be an array, Series, or DataFrame!");
              if (isFunction(matcher)) {
                return flatten(arr).filter((value) => matcher(value)).length;
              } else if (isArray(matcher)) {
                const temp = flatten(arr);
                return set(matcher).map((value) => {
                  return {
                    value,
                    count: temp.filter((v) => isEqual(v, value)).length
                  };
                });
              } else if (arguments.length > 1) {
                return flatten(arr).filter((other) => isEqual(other, matcher)).length;
              } else {
                return count(arr, arr);
              }
            }
            module2.exports = count;
          }
        });
        var require_is_jagged = __commonJS2({
          "src/is-jagged.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function isJagged(x) {
              if (isDataFrame(x) || isSeries(x)) {
                return isJagged(x.values);
              }
              assert(isArray(x), "The `isJagged` function only works on arrays, Series, and DataFrames!");
              let childArrayCount = 0;
              let firstChildArrayLength = null;
              for (let i = 0; i < x.length; i++) {
                if (isArray(x[i])) {
                  childArrayCount++;
                  if (isJagged(x[i])) {
                    return true;
                  }
                  if (firstChildArrayLength === null) {
                    firstChildArrayLength = x[i].length;
                  } else if (x[i].length !== firstChildArrayLength) {
                    return true;
                  }
                }
              }
              if (childArrayCount > 0 && childArrayCount < x.length) {
                return true;
              }
              return false;
            }
            module2.exports = isJagged;
          }
        });
        var require_is_nested = __commonJS2({
          "src/is-nested.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function isNested(x) {
              if (isDataFrame(x) || isSeries(x)) {
                return isNested(x.values);
              }
              assert(isArray(x), "The `isNested` function only works on arrays, Series, and DataFrames!");
              for (let i = 0; i < x.length; i++) {
                if (isArray(x[i])) {
                  return true;
                }
              }
              return false;
            }
            module2.exports = isNested;
          }
        });
        var require_ndarray = __commonJS2({
          "src/ndarray.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isNested = require_is_nested();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var error = "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!";
            function ndarray(shape) {
              assert(!isUndefined(shape), error);
              if (!isArray(shape))
                shape = [shape];
              assert(!isNested(shape), error);
              assert(shape.length > 0, error);
              const s = shape[0];
              assert(isNumber(s), error);
              assert(parseInt(s) === s, error);
              assert(s >= 0, error);
              assert(s !== Infinity, "We can't create an array containing an infinite number of values!");
              if (shape.length === 1) {
                const out = [];
                for (let i = 0; i < s; i++)
                  out.push(void 0);
                return out;
              } else {
                const out = [];
                for (let i = 0; i < s; i++) {
                  out.push(ndarray(shape.slice(1)));
                }
                return out;
              }
            }
            module2.exports = ndarray;
          }
        });
        var require_reverse = __commonJS2({
          "src/reverse.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function reverse(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                const out2 = arr.copy();
                out2.values = reverse(out2.values);
                out2.index = reverse(out2.index);
                return out2;
              }
              assert(isArray(arr), "The `reverse` function only works on arrays, Series, and DataFrames!");
              const out = [];
              for (let i = arr.length - 1; i >= 0; i--)
                out.push(arr[i]);
              return out;
            }
            module2.exports = reverse;
          }
        });
        var require_range = __commonJS2({
          "src/range.js"(exports2, module2) {
            var assert = require_assert();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var reverse = require_reverse();
            function range(a, b, step = 1) {
              assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(step), "You must pass two numbers and optionally a step value to the `range` function!");
              assert(isNumber(a) && isNumber(b) && isNumber(step), "You must pass two numbers and optionally a step value to the `range` function!");
              assert(step > 0, "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)");
              let shouldReverse = false;
              if (a > b) {
                shouldReverse = true;
                const buffer = a;
                a = b + step;
                b = buffer + step;
              }
              let out = [];
              for (let i = a; i < b; i += step)
                out.push(i);
              if (shouldReverse)
                out = reverse(out);
              return out;
            }
            module2.exports = range;
          }
        });
        var require_shape = __commonJS2({
          "src/shape.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            function helper(x) {
              if (!isArray(x)) {
                return void 0;
              }
              const out = [x.length];
              let childArrayCount = 0;
              const childShapes = x.map((v) => {
                const s = helper(v);
                if (!isUndefined(s)) {
                  childArrayCount++;
                  if (s.length === 1) {
                    return s[0];
                  } else {
                    return s;
                  }
                } else {
                  return s;
                }
              });
              if (childArrayCount > 0) {
                if (childArrayCount === x.length) {
                  const childShapesAreIdentical = childShapes.slice(0, -1).every((s, i) => {
                    return isEqual(s, childShapes[i + 1]);
                  });
                  if (childShapesAreIdentical) {
                    return out.concat(childShapes[0]);
                  } else {
                    out.push(childShapes);
                    return out;
                  }
                } else {
                  out.push(childShapes);
                  return out;
                }
              } else {
                return out;
              }
            }
            function shape(x) {
              if (isDataFrame(x) || isSeries(x)) {
                return shape(x.values);
              }
              assert(isArray(x), "The `shape` function only works on arrays, Series, and DataFrames!");
              return helper(x);
            }
            module2.exports = shape;
          }
        });
        var require_df_append = __commonJS2({
          "src/dataframe/df-append.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isJagged = require_is_jagged();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            var MathError = require_math_error();
            var ndarray = require_ndarray();
            var range = require_range();
            var set = require_set();
            var shape = require_shape();
            function dfAppend(df, x, axis) {
              if (isUndefined(axis)) {
                axis = 0;
              }
              assert(axis === 0 || axis === 1 || axis === "vertical" || axis === "horizontal", 'The only valid axis values for use when appending data to a DataFrame are 0, 1, "vertical", and "horizontal". Note that 0 == "horizontal" and 1 == "vertical".');
              if (isArray(x)) {
                assert(!isJagged(x), "The array of data you're trying to append to this DataFrame is jagged!");
                const xShape = shape(x);
                if (xShape.length === 1) {
                  if (axis === 0) {
                    const out = df.copy();
                    out._values.push(x);
                    const maxRowLength = Math.max(df.shape[1], xShape[0]);
                    out._values.forEach((row) => {
                      while (row.length < maxRowLength) {
                        row.push(void 0);
                      }
                    });
                    while (out._index.length < out._values.length) {
                      out._index.push("row" + out._index.length);
                    }
                    while (out._columns.length < maxRowLength) {
                      out._columns.push("col" + out._columns.length);
                    }
                    return out;
                  } else {
                    const maxColLength = Math.max(df.shape[0], xShape[0]);
                    const out = df.copy();
                    range(0, maxColLength).forEach((i) => {
                      if (i >= out._values.length) {
                        out._values.push(ndarray(df.shape[1]));
                      }
                      out._values[i].push(x[i]);
                    });
                    while (out._index.length < out._values.length) {
                      out._index.push("row" + out._index.length);
                    }
                    while (out._columns.length < out._values[0].length) {
                      out._columns.push("col" + out._columns.length);
                    }
                    return out;
                  }
                } else if (xShape.length === 2) {
                  if (axis === 0) {
                    const maxRowLength = Math.max(...x.map((row) => row.length).concat([df.shape[1]]));
                    const out = df.copy();
                    out._values = out._values.concat(x).map((row) => {
                      while (row.length < maxRowLength) {
                        row.push(void 0);
                      }
                      return row;
                    });
                    while (out._index.length < out._values.length) {
                      out._index.push("row" + out._index.length);
                    }
                    while (out._columns.length < maxRowLength) {
                      out._columns.push("col" + out._columns.length);
                    }
                    return out;
                  } else {
                    const maxRowLength = Math.max(...x.map((row) => row.length)) + df.shape[1];
                    const maxColLength = Math.max(df.shape[0], xShape[0]);
                    const out = df.copy();
                    range(0, maxColLength).forEach((i) => {
                      if (i >= out._values.length) {
                        out._values.push(ndarray(df.shape[1]));
                      }
                      out._values[i] = out._values[i].concat(x[i]);
                      while (out._values[i].length < maxRowLength) {
                        out._values[i].push(void 0);
                      }
                    });
                    while (out._index.length < out._values.length) {
                      out._index.push("row" + out._index.length);
                    }
                    while (out._columns.length < maxRowLength) {
                      out._columns.push("col" + out._columns.length);
                    }
                    return out;
                  }
                } else {
                  throw new MathError("Only 1- and 2-dimensional arrays can be appended to a DataFrame!");
                }
              } else if (isSeries(x)) {
                const out = dfAppend(df, x.values, axis);
                if (axis === 0) {
                  out.index[out.index.length - 1] = out.index.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
                } else {
                  out.columns[out.columns.length - 1] = out.columns.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
                }
                return out;
              } else if (isDataFrame(x)) {
                if (axis === 0) {
                  const out = df.copy();
                  const maxRowLength = set(out._columns.concat(x._columns)).length;
                  out._values.forEach((row) => {
                    while (row.length < maxRowLength) {
                      row.push(void 0);
                    }
                  });
                  x.apply((row) => {
                    const rowCopy = row.copy();
                    const temp = [];
                    out._columns.forEach((col) => {
                      const index = rowCopy._index.indexOf(col);
                      if (index > -1) {
                        temp.push(rowCopy._values[index]);
                        rowCopy._values.splice(index, 1);
                        rowCopy._index.splice(index, 1);
                      } else {
                        temp.push(void 0);
                      }
                    });
                    out._values.push(temp.concat(rowCopy._values));
                  }, 1);
                  out._columns = out._columns.concat(x._columns.filter((c) => out._columns.indexOf(c) < 0));
                  while (out._index.length < out._values.length) {
                    const newRowName = "row" + out._index.length;
                    out._index.push(newRowName + (df._index.indexOf(newRowName) > -1 ? " (2)" : ""));
                  }
                  return out;
                } else {
                  const out = df.copy();
                  out._index.forEach((rowName, i) => {
                    const xIndex = x._index.indexOf(rowName);
                    if (xIndex > -1) {
                      out._values[i] = out._values[i].concat(x._values[xIndex]);
                    } else {
                      out._values[i] = out._values[i].concat(ndarray(x.shape[1]));
                    }
                  });
                  x._index.forEach((rowName, i) => {
                    const outIndex = out._index.indexOf(rowName);
                    if (outIndex < 0) {
                      out._index.push(rowName);
                      out._values.push(ndarray(out._columns.length).concat(x._values[i]));
                    }
                  });
                  out._columns = out._columns.concat(x._columns.map((c) => c + (out._columns.indexOf(c) > -1 ? " (2)" : "")));
                  return out;
                }
              } else {
                throw new MathError("Only 1- or 2-dimensional arrays, Series, and DataFrames can be appended to a DataFrame!");
              }
            }
            module2.exports = dfAppend;
          }
        });
        var require_df_apply = __commonJS2({
          "src/dataframe/df-apply.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isFunction = require_is_function();
            var isUndefined = require_is_undefined();
            function dfApply(DataFrame, Series, df, fn, axis) {
              axis = axis || 0;
              assert(isFunction(fn), "The first parameter to the `apply` method must be a function.");
              assert(axis === 0 || axis === 1, "The second parameter to the `apply` method (the `axis`) must be 0 or 1.");
              if (axis === 0) {
                const temp = {};
                let shouldReturnADataFrame;
                df.columns.forEach((colName, i) => {
                  const series = new Series(df.values.map((row) => row[i]));
                  series.name = colName;
                  series.index = df.index;
                  const value = fn(series, i, df);
                  if (value instanceof Series) {
                    temp[colName] = value.values;
                  } else {
                    temp[colName] = value;
                  }
                  if (isUndefined(shouldReturnADataFrame)) {
                    shouldReturnADataFrame = value instanceof Series || isArray(value);
                  }
                });
                if (shouldReturnADataFrame) {
                  const out = new DataFrame(temp);
                  out.index = df.index;
                  return out;
                } else {
                  const out = new Series(df.columns.map((colName) => temp[colName]));
                  out.index = df.columns;
                  return out;
                }
              } else if (axis === 1) {
                let shouldReturnADataFrame;
                const temp = df.values.map((row, i) => {
                  const series = new Series(row);
                  series.name = df.index[i];
                  series.index = df.columns;
                  const value = fn(series, i, df);
                  if (isUndefined(shouldReturnADataFrame)) {
                    shouldReturnADataFrame = value instanceof Series || isArray(value);
                  }
                  if (value instanceof Series) {
                    return value.values;
                  } else {
                    return value;
                  }
                });
                if (shouldReturnADataFrame) {
                  const out = new DataFrame(temp);
                  out.index = df.index;
                  out.columns = df.columns;
                  return out;
                } else {
                  const out = new Series(temp);
                  out.index = df.index;
                  return out;
                }
              }
            }
            module2.exports = dfApply;
          }
        });
        var require_is_string = __commonJS2({
          "src/is-string.js"(exports2, module2) {
            function isString2(s) {
              return typeof s === "string";
            }
            module2.exports = isString2;
          }
        });
        var require_df_assign = __commonJS2({
          "src/dataframe/df-assign.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isJagged = require_is_jagged();
            var isObject = require_is_object();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var MathError = require_math_error();
            var shape = require_shape();
            function dfAssign(DataFrame, Series, df, p1, p2) {
              const isDataFrame = (x) => x instanceof DataFrame;
              const isSeries = (x) => x instanceof Series;
              if (!isUndefined(p2)) {
                assert(isString2(p1), "If passing two arguments into the `assign` method, then the first argument must be a string name!");
                assert(isArray(p2) && !isJagged(p2) && shape(p2).length === 1, "If passing two arguments into the `assign` method, then the second argument must be a 1-dimensional array!");
                const out = df.append(p2, 1);
                out.columns[out.columns.length - 1] = p1;
                return out;
              } else {
                if (isDataFrame(p1)) {
                  return df.append(p1, 1);
                } else if (isSeries(p1)) {
                  return df.append(p1, 1);
                } else if (isObject(p1)) {
                  const maxColumnLength = Math.max(...Object.keys(p1).map((key) => p1[key].length));
                  Object.keys(p1).forEach((key) => {
                    while (p1[key].length < maxColumnLength) {
                      p1[key].push(void 0);
                    }
                  });
                  return df.append(new DataFrame(p1), 1);
                } else {
                  throw new MathError("You must pass a DataFrame, Series, or object into the `assign` method!");
                }
              }
            }
            module2.exports = dfAssign;
          }
        });
        var require_df_copy = __commonJS2({
          "src/dataframe/df-copy.js"(exports2, module2) {
            var { copy } = require_copy();
            function dfCopy(DataFrame, df) {
              if (df.isEmpty)
                return new DataFrame();
              const out = new DataFrame(copy(df.values));
              out.columns = df.columns.slice();
              out.index = df.index.slice();
              return out;
            }
            module2.exports = dfCopy;
          }
        });
        var require_df_drop = __commonJS2({
          "src/dataframe/df-drop.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isNumber = require_is_number();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var shape = require_shape();
            function dfDrop(DataFrame, Series, df, rows, cols) {
              if (isUndefined(rows))
                rows = [];
              if (isUndefined(cols))
                cols = [];
              if (isString2(rows) || isNumber(rows))
                rows = [rows];
              if (isString2(cols) || isNumber(cols))
                cols = [cols];
              assert(isArray(rows), "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.");
              assert(isArray(cols), "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.");
              assert(shape(rows).length === 1, "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.");
              assert(shape(cols).length === 1, "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.");
              let outIndex, outColumns;
              df.index.forEach((row, i) => {
                if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
                  if (!outIndex)
                    outIndex = [];
                  outIndex.push(row);
                }
              });
              df.columns.forEach((col, i) => {
                if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
                  if (!outColumns)
                    outColumns = [];
                  outColumns.push(col);
                }
              });
              let out = df.get(outIndex, outColumns);
              if (out instanceof Series) {
                let temp = new DataFrame();
                temp = temp.assign(out);
                if (df.index.indexOf(out.name) > -1)
                  temp = temp.transpose();
                out = temp;
              }
              return out;
            }
            module2.exports = dfDrop;
          }
        });
        var require_is_whole_number = __commonJS2({
          "src/helpers/is-whole-number.js"(exports2, module2) {
            var isNumber = require_is_number();
            function isInteger(x) {
              return isNumber(x) && parseInt(x) === x;
            }
            function isWholeNumber(x) {
              return isInteger(x) && x >= 0;
            }
            module2.exports = isWholeNumber;
          }
        });
        var require_df_drop_missing = __commonJS2({
          "src/dataframe/df-drop-missing.js"(exports2, module2) {
            var assert = require_assert();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var isWholeNumber = require_is_whole_number();
            var shape = require_shape();
            function dfDropMissing(DataFrame, Series, df, axis, condition, threshold) {
              axis = axis || 0;
              assert(axis === 0 || axis === 1, "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1.");
              threshold = threshold || 0;
              assert(isWholeNumber(threshold), "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values).");
              condition = threshold > 0 ? "none" : condition || "any";
              assert(condition === "any" || condition === "all" || condition === "none", "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped).");
              function helper(values) {
                if (threshold > 0) {
                  let count = 0;
                  for (let i = 0; i < values.length; i++) {
                    const value = values[i];
                    if (isUndefined(value))
                      count++;
                    if (count >= threshold)
                      return [];
                  }
                } else if (condition === "any") {
                  for (let i = 0; i < values.length; i++) {
                    const value = values[i];
                    if (isUndefined(value))
                      return [];
                  }
                } else if (condition === "all") {
                  for (let i = 0; i < values.length; i++) {
                    const value = values[i];
                    if (!isUndefined(value))
                      return values;
                  }
                  return [];
                }
                return values;
              }
              let out = df.copy();
              const tempID = Math.random().toString();
              if (axis === 0) {
                out = out.assign(tempID, out.index);
                const newValues = out.values.map(helper).filter((row) => row.length > 0);
                if (shape(newValues).length < 2)
                  return new DataFrame();
                out.values = newValues;
                let newIndex = out.get(null, tempID);
                if (isUndefined(newIndex))
                  return new DataFrame();
                if (isString2(newIndex))
                  newIndex = [newIndex];
                if (newIndex instanceof Series)
                  newIndex = newIndex.values;
                out.index = newIndex;
                out = out.drop(null, tempID);
              } else if (axis === 1) {
                const temp = {};
                out.columns.forEach((colName, i) => {
                  const values = out.values.map((row) => row[i]);
                  const newValues = helper(values);
                  if (newValues.length > 0) {
                    temp[colName] = newValues;
                  }
                });
                if (Object.keys(temp).length === 0) {
                  return new DataFrame();
                }
                const newOut = new DataFrame(temp);
                newOut.index = out.index;
                return newOut;
              }
              return out;
            }
            module2.exports = dfDropMissing;
          }
        });
        var require_drop_nan = __commonJS2({
          "src/drop-nan.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            function dropNaN(x) {
              if (isDataFrame(x) || isSeries(x)) {
                return x.dropNaN(...Object.values(arguments).slice(1));
              }
              assert(isArray(x), "The `dropNaN` function only works on arrays, Series, and DataFrames!");
              const out = [];
              x.forEach((v) => {
                try {
                  return out.push(dropNaN(v));
                } catch (e) {
                  if (isNumber(v)) {
                    return out.push(v);
                  }
                }
              });
              return out;
            }
            module2.exports = dropNaN;
          }
        });
        var require_df_drop_nan = __commonJS2({
          "src/dataframe/df-drop-nan.js"(exports2, module2) {
            var assert = require_assert();
            var dropNaN = require_drop_nan();
            var isWholeNumber = require_is_whole_number();
            function dfDropNaN(DataFrame, df, axis, condition, threshold) {
              axis = axis || 0;
              assert(axis === 0 || axis === 1, "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1.");
              threshold = threshold || 0;
              assert(isWholeNumber(threshold), "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values).");
              condition = threshold > 0 ? "none" : condition || "any";
              assert(condition === "any" || condition === "all" || condition === "none", "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped).");
              function helper(values) {
                const numericalValues = dropNaN(values);
                if (threshold > 0)
                  return values.length - numericalValues.length < threshold;
                if (condition === "any")
                  return numericalValues.length === values.length;
                if (condition === "all")
                  return numericalValues.length > 0;
                return true;
              }
              const out = df.copy();
              if (axis === 0) {
                const rowsToKeep = out.index.filter((row) => {
                  const values = out.get(row, null).values;
                  return helper(values);
                });
                if (rowsToKeep.length > 0)
                  return out.get(rowsToKeep, null);
                else
                  return new DataFrame();
              } else if (axis === 1) {
                const colsToKeep = out.columns.filter((col) => {
                  const values = out.get(null, col).values;
                  return helper(values);
                });
                if (colsToKeep.length > 0)
                  return out.get(null, colsToKeep);
                else
                  return new DataFrame();
              }
              return out;
            }
            module2.exports = dfDropNaN;
          }
        });
        var require_df_filter = __commonJS2({
          "src/dataframe/df-filter.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isFunction = require_is_function();
            var isUndefined = require_is_undefined();
            function arrayToObject(x) {
              const out = {};
              flatten(x).forEach((value, i) => {
                out[value] = i;
              });
              return out;
            }
            function undoArrayToObject(obj) {
              return Object.keys(obj).sort((a, b) => obj[a] - obj[b]);
            }
            function dfFilter(DataFrame, Series, df, fn, axis) {
              assert(isFunction(fn), "The `filter` method takes a single parameter: a function that is used to filter the values.");
              if (isUndefined(axis))
                axis = 0;
              assert(axis === 0 || axis === 1, "The `axis` parameter to the `filter` method must be 0 or 1.");
              let out = df.copy();
              if (out.isEmpty)
                return out;
              const index = arrayToObject(out.index);
              const columns = arrayToObject(out.columns);
              if (axis === 0) {
                const newValues = out.values.filter((row, i) => {
                  const series = new Series(row);
                  series.name = df.index[i];
                  series.index = df.columns;
                  const shouldKeep = fn(series, i, df);
                  if (!shouldKeep)
                    delete index[out.index[i]];
                  return shouldKeep;
                });
                if (flatten(newValues).length === 0) {
                  return new DataFrame();
                }
                if (newValues.length === 1) {
                  const temp = new Series(flatten(newValues));
                  temp.name = undoArrayToObject(index)[0];
                  temp.index = undoArrayToObject(columns);
                  return temp;
                }
                out.values = newValues;
                out.index = undoArrayToObject(index);
              } else if (axis === 1) {
                out = out.transpose();
                const newValues = out.values.filter((row, i) => {
                  const series = new Series(row);
                  series.name = df.columns[i];
                  series.index = df.index;
                  const shouldKeep = fn(series, i, df);
                  if (!shouldKeep)
                    delete columns[out.index[i]];
                  return shouldKeep;
                });
                if (flatten(newValues).length === 0) {
                  return new DataFrame();
                }
                if (newValues.length === 1) {
                  const temp = new Series(flatten(newValues));
                  temp.name = undoArrayToObject(columns)[0];
                  temp.index = undoArrayToObject(index);
                  return temp;
                }
                out.values = newValues;
                out.index = undoArrayToObject(columns);
                out = out.transpose();
              }
              return out;
            }
            module2.exports = dfFilter;
          }
        });
        var require_df_get = __commonJS2({
          "src/dataframe/df-get.js"(exports2, module2) {
            var assert = require_assert();
            var isNumber = require_is_number();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var set = require_set();
            function dfGet(df, rows, cols) {
              if (isString2(rows) || isNumber(rows))
                rows = [rows];
              if (isString2(cols) || isNumber(cols))
                cols = [cols];
              const types = set((rows || []).concat(cols || []).map((v) => typeof v));
              assert(types.length <= 2, "Only whole numbers and/or strings are allowed in `get` arrays!");
              if (types.length === 1) {
                assert(types[0] === "string" || types[0] === "number", "Only whole numbers and/or strings are allowed in `get` arrays!");
              }
              if (types.length === 2) {
                assert(types.indexOf("string") > -1, "Only whole numbers and/or strings are allowed in `get` arrays!");
                assert(types.indexOf("number") > -1, "Only whole numbers and/or strings are allowed in `get` arrays!");
              }
              if (!isUndefined(rows)) {
                rows = rows.map((r) => {
                  if (isString2(r)) {
                    assert(df.index.indexOf(r) > -1, `Row "${r}" does not exist!`);
                    return r;
                  }
                  if (isNumber(r)) {
                    assert(r >= 0, `Index ${r} is out of bounds!`);
                    assert(parseInt(r) === r, `Row numbers must be integers!`);
                    assert(r < df.index.length, `Index ${r} is out of bounds!`);
                    return df.index[r];
                  }
                });
              }
              if (!isUndefined(cols)) {
                cols = cols.map((c) => {
                  if (isString2(c)) {
                    assert(df.columns.indexOf(c) > -1, `Column "${c}" does not exist!`);
                    return c;
                  }
                  if (isNumber(c)) {
                    assert(c >= 0, `Column ${c} is out of bounds!`);
                    assert(parseInt(c) === c, `Column numbers must be integers!`);
                    assert(c < df.columns.length, `Column ${c} is out of bounds!`);
                    return df.columns[c];
                  }
                });
              }
              return df.getSubsetByNames(rows, cols);
            }
            module2.exports = dfGet;
          }
        });
        var require_sort = __commonJS2({
          "src/sort.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isFunction = require_is_function();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            function alphaSort(a, b) {
              try {
                if (a < b)
                  return -1;
                if (a > b)
                  return 1;
                return 0;
              } catch (e) {
                a = typeof a === "object" && a !== null ? JSON.stringify(a) : a.toString();
                b = typeof b === "object" && b !== null ? JSON.stringify(b) : b.toString();
                if (a < b)
                  return -1;
                if (a > b)
                  return 1;
                return 0;
              }
            }
            function sort(arr, fn) {
              if (isUndefined(fn))
                fn = alphaSort;
              if (isDataFrame(arr) || isSeries(arr)) {
                return arr.sort(...Object.values(arguments).slice(1));
              }
              assert(isArray(arr), "The `sort` function only works on arrays, Series, and DataFrames!");
              assert(isFunction(fn), "The second parameter of the `sort` function must be a comparison function!");
              const out = arr.slice();
              out.sort(fn);
              return out;
            }
            module2.exports = sort;
          }
        });
        var require_df_get_dummies = __commonJS2({
          "src/dataframe/df-get-dummies.js"(exports2, module2) {
            var assert = require_assert();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var set = require_set();
            var sort = require_sort();
            function camelify(text) {
              const temp = text.toLowerCase();
              let out = "";
              for (let i = 0; i < temp.length; i++) {
                const char = temp[i];
                if (char.match(/[a-z0-9]/g)) {
                  out += char;
                } else {
                  out += " ";
                }
              }
              const words = out.split(" ").filter((word) => word.length > 0);
              return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.substring(1)).join("");
            }
            function dfGetDummies(DataFrame, df, columns) {
              if (isUndefined(columns)) {
                columns = df.columns;
              } else if (isString2(columns)) {
                columns = [columns];
              }
              const temp = {};
              columns.forEach((col) => {
                assert(isString2(col), "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!");
                const colIndex = df.columns.indexOf(col);
                assert(colIndex > -1, `The given DataFrame does not have a column called "${col}"!`);
                const values = df.values.map((row) => row[colIndex]);
                const valuesSet = sort(set(values));
                values.forEach((value) => {
                  valuesSet.forEach((orig) => {
                    const colName = col + "_" + camelify(orig.toString());
                    if (!temp[colName]) {
                      temp[colName] = [];
                    }
                    if (value === orig) {
                      temp[colName].push(1);
                    } else {
                      temp[colName].push(0);
                    }
                  });
                });
              });
              const out = new DataFrame(temp);
              out.index = df.index;
              return out;
            }
            module2.exports = dfGetDummies;
          }
        });
        var require_df_get_subset_by_indices = __commonJS2({
          "src/dataframe/df-get-subset-by-indices.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var isWholeNumber = require_is_whole_number();
            var range = require_range();
            var shape = require_shape();
            function dfGetSubsetByIndices(df, rowIndices, colIndices) {
              const dataShape = df.shape;
              if (isUndefined(rowIndices))
                rowIndices = range(0, dataShape[0]);
              if (isUndefined(colIndices))
                colIndices = range(0, dataShape[1]);
              if (isNumber(rowIndices))
                rowIndices = [rowIndices];
              if (isNumber(colIndices))
                colIndices = [colIndices];
              assert(isArray(rowIndices) && isArray(colIndices), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.");
              assert(shape(rowIndices).length === 1 && shape(colIndices).length === 1, "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.");
              assert(rowIndices.length > 0, "The `rowIndices` array must contain at least one index.");
              assert(colIndices.length > 0, "The `colIndices` array must contain at least one index.");
              rowIndices.forEach((rowIndex) => {
                assert(isWholeNumber(rowIndex), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.");
                assert(rowIndex < df.index.length, `The row index ${rowIndex} is out of bounds.`);
              });
              colIndices.forEach((colIndex) => {
                assert(isWholeNumber(colIndex), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.");
                assert(colIndex < df.columns.length, `The column index ${colIndex} is out of bounds.`);
              });
              const rows = rowIndices.map((i) => df.index[i]);
              const cols = colIndices.map((i) => df.columns[i]);
              return df.getSubsetByNames(rows, cols);
            }
            module2.exports = dfGetSubsetByIndices;
          }
        });
        var require_df_get_subset_by_names = __commonJS2({
          "src/dataframe/df-get-subset-by-names.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var shape = require_shape();
            function dfGetSubsetByNames(DataFrame, Series, df, rows, cols) {
              if (isUndefined(rows))
                rows = df.index;
              if (isUndefined(cols))
                cols = df.columns;
              if (isString2(rows))
                rows = [rows];
              if (isString2(cols))
                cols = [cols];
              assert(isArray(rows) && isArray(cols), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.");
              assert(shape(rows).length === 1 && shape(cols).length === 1, "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.");
              assert(rows.length > 0, "The `rows` array must contain at least one row name.");
              assert(cols.length > 0, "The `cols` array must contain at least one column name.");
              rows.forEach((row) => {
                assert(isString2(row), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.");
                assert(df.index.indexOf(row) > -1, `The row name "${row}" does not exist in the list of rows.`);
              });
              cols.forEach((col) => {
                assert(isString2(col), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.");
                assert(df.columns.indexOf(col) > -1, `The column name "${col}" does not exist in the list of columns.`);
              });
              const values = rows.map((row) => {
                return cols.map((col) => {
                  return df.values[df.index.indexOf(row)][df.columns.indexOf(col)];
                });
              });
              if (rows.length === 1 && cols.length === 1) {
                return flatten(values)[0];
              }
              if (rows.length === 1) {
                const out2 = new Series(flatten(values));
                out2.name = rows[0];
                out2.index = cols;
                return out2;
              }
              if (cols.length === 1) {
                const out2 = new Series(flatten(values));
                out2.name = cols[0];
                out2.index = rows;
                return out2;
              }
              const out = new DataFrame(values);
              out.columns = cols;
              out.index = rows;
              return out;
            }
            module2.exports = dfGetSubsetByNames;
          }
        });
        var require_df_print = __commonJS2({
          "src/dataframe/df-print.js"(exports2, module2) {
            var isString2 = require_is_string();
            var range = require_range();
            function dfPrint(DataFrame, Series, df) {
              function truncate(s, maxLength2) {
                if (isString2(s)) {
                  if (s.length > maxLength2) {
                    return s.substring(0, maxLength2 - 3) + "...";
                  } else {
                    return s;
                  }
                } else {
                  return s;
                }
              }
              if (df.isEmpty) {
                console.table({});
                console.log("Shape:", [0, 0], "\n");
                return df;
              }
              const maxRows = typeof window === "undefined" ? 20 : 10;
              const halfMaxRows = parseInt(maxRows / 2);
              const maxColumns = typeof process === "undefined" ? 10 : Math.floor(process.stdout.columns / 24) - 1;
              const halfMaxColumns = parseInt(maxColumns / 2);
              const tempRows = maxRows > df.index.length ? null : range(0, halfMaxRows).concat(range(df.index.length - halfMaxRows, df.index.length));
              const tempColumns = maxColumns > df.columns.length ? null : range(0, halfMaxColumns).concat(range(df.columns.length - halfMaxColumns, df.columns.length));
              let temp = df.get(tempRows, tempColumns);
              if (temp instanceof Series) {
                if (df.shape[0] === 1) {
                  temp = new DataFrame([temp.values]);
                  temp.index = df.index;
                  temp.columns = new Series(df.columns).get(tempColumns).values;
                } else if (df.shape[1] === 1) {
                  temp = new DataFrame([temp.values]).transpose();
                  temp.index = new Series(df.index).get(tempRows).values;
                  temp.columns = df.columns;
                }
              }
              if (maxRows <= df.index.length) {
                temp._index.splice(halfMaxRows, 0, "...");
                temp._values.splice(halfMaxRows, 0, range(0, temp.columns.length).map(() => "..."));
              }
              if (maxColumns <= df.columns.length) {
                temp._columns.splice(halfMaxColumns, 0, "...");
                temp._values = temp._values.map((row) => {
                  row.splice(halfMaxColumns, 0, "...");
                  return row;
                });
              }
              const maxLength = 28;
              if (temp instanceof Series) {
                temp.values = temp.values.map((value) => truncate(value, maxLength));
                temp.name = truncate(temp.name, maxLength);
                temp.index = temp.index.map((row) => truncate(row, maxLength));
              } else {
                temp.values = temp.values.map((row) => {
                  return row.map((value) => truncate(value, maxLength));
                });
                temp.columns = temp.columns.map((col) => truncate(col, maxLength));
                temp.index = temp.index.map((row) => truncate(row, maxLength));
              }
              console.table(temp.toObject());
              console.log("Shape:", df.shape, "\n");
              return df;
            }
            module2.exports = dfPrint;
          }
        });
        var require_left_pad = __commonJS2({
          "src/helpers/left-pad.js"(exports2, module2) {
            var assert = require_assert();
            var isNumber = require_is_number();
            function leftPad(x, maxLength) {
              assert(isNumber(x), "The `leftPad` function only works on numbers!");
              let out = x.toString();
              while (out.length < maxLength)
                out = "0" + out;
              return out;
            }
            module2.exports = leftPad;
          }
        });
        var require_df_reset_index = __commonJS2({
          "src/dataframe/df-reset-index.js"(exports2, module2) {
            var leftPad = require_left_pad();
            var range = require_range();
            function dfResetIndex(df, shouldSkipCopying) {
              const out = shouldSkipCopying ? df : df.copy();
              out.index = range(0, df.shape[0]).map((i) => {
                return "row" + leftPad(i, (out.index.length - 1).toString().length);
              });
              return out;
            }
            module2.exports = dfResetIndex;
          }
        });
        var require_product = __commonJS2({
          "src/product.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function product(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return product(arr.values);
              }
              assert(isArray(arr), "The `product` function only works on arrays, Series, and DataFrames!");
              try {
                if (arr.length === 0)
                  return NaN;
                return flatten(arr).reduce((a, b) => a * b, 1);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = product;
          }
        });
        var require_reshape = __commonJS2({
          "src/reshape.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var product = require_product();
            var shape = require_shape();
            function reshape(x, newShape) {
              if (isDataFrame(x) || isSeries(x)) {
                return reshape(x.values, newShape);
              }
              assert(isArray(x), "The first argument passed into the `reshape` function must be an array!");
              if (isNumber(newShape))
                newShape = [newShape];
              assert(isArray(newShape), "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!");
              assert(shape(newShape).length === 1, "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!");
              newShape.forEach((v) => {
                assert(isNumber(v) && parseInt(v) === v && v > 0, "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!");
              });
              if (newShape.length === 0) {
                return flatten(x);
              }
              const temp = flatten(x);
              if (newShape.length === 1 && newShape[0] === temp.length) {
                return temp;
              }
              assert(product(newShape) === temp.length, "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!");
              const out = [];
              const step = parseInt(temp.length / newShape[0]);
              for (let i = 0; i < newShape[0]; i++) {
                const row = temp.slice(i * step, (i + 1) * step);
                out.push(reshape(row, newShape.slice(1)));
              }
              return out;
            }
            module2.exports = reshape;
          }
        });
        var require_random = __commonJS2({
          "src/random.js"(exports2, module2) {
            var { copy } = require_copy();
            var assert = require_assert();
            var isArray = require_is_array();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var ndarray = require_ndarray();
            var product = require_product();
            var reshape = require_reshape();
            var MAX = Math.pow(2, 64);
            var s = [];
            seed2(parseInt(Math.random() * MAX));
            function splitmix64(state, n) {
              state = uint(state);
              function helper() {
                state += uint("0x9e3779b97f4a7c15");
                let z = copy(state);
                z = (z ^ z >> BigInt(30)) * uint("0xbf58476d1ce4e5b9");
                z = (z ^ z >> BigInt(27)) * uint("0x94d049bb133111eb");
                return z ^ z >> BigInt(31);
              }
              const out = [];
              for (let i = 0; i < n; i++)
                out.push(helper());
              return out;
            }
            function uint(x) {
              return BigInt.asUintN(64, BigInt(x));
            }
            function rotl(x, k) {
              x = uint(x);
              k = BigInt(k);
              return uint(uint(x << k) | uint(x >> uint(BigInt(64) - k)));
            }
            function seed2(val) {
              if (!isUndefined(val)) {
                assert(isNumber(val), "If passing a value into the `seed` function, then that value must be an integer!");
                const temp = splitmix64(parseInt(val), 4);
                s[0] = temp[0];
                s[1] = temp[1];
                s[2] = temp[2];
                s[3] = temp[3];
              } else {
                return copy(s);
              }
            }
            function next() {
              const result = uint(rotl(s[0] + s[3], 23) + s[0]);
              const t = uint(s[1] << BigInt(17));
              s[2] = uint(s[2] ^ s[0]);
              s[3] = uint(s[3] ^ s[1]);
              s[1] = uint(s[1] ^ s[2]);
              s[0] = uint(s[0] ^ s[3]);
              s[2] = uint(s[2] ^ t);
              s[3] = rotl(s[3], 45);
              return parseInt(result) / MAX;
            }
            function random2(shape) {
              if (isUndefined(shape))
                return next();
              if (!isArray(shape))
                shape = [shape];
              return reshape(ndarray(product(shape)).map(next), shape);
            }
            module2.exports = { random: random2, seed: seed2 };
          }
        });
        var require_shuffle = __commonJS2({
          "src/shuffle.js"(exports2, module2) {
            var { random: random2 } = require_random();
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function shuffle(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return arr.shuffle(...Object.values(arguments).slice(1));
              }
              assert(isArray(arr), "The `shuffle` function only works on arrays, Series, and DataFrames!");
              const out = [];
              const temp = arr.slice();
              for (let i = 0; i < arr.length; i++) {
                const index = parseInt(random2() * temp.length);
                out.push(temp.splice(index, 1)[0]);
              }
              return out;
            }
            module2.exports = shuffle;
          }
        });
        var require_df_shuffle = __commonJS2({
          "src/dataframe/df-shuffle.js"(exports2, module2) {
            var assert = require_assert();
            var isUndefined = require_is_undefined();
            var shuffle = require_shuffle();
            function dfShuffle(df, axis) {
              if (isUndefined(axis))
                axis = 0;
              assert(axis === 0 || axis === 1, "The `axis` parameter to the `shuffle` must be 0, 1, or undefined.");
              return df.get(axis === 0 ? shuffle(df.index) : null, axis === 1 ? shuffle(df.columns) : null);
            }
            module2.exports = dfShuffle;
          }
        });
        var require_is_boolean = __commonJS2({
          "src/is-boolean.js"(exports2, module2) {
            function isBoolean(x) {
              return typeof x === "boolean";
            }
            module2.exports = isBoolean;
          }
        });
        var require_df_sort = __commonJS2({
          "src/dataframe/df-sort.js"(exports2, module2) {
            var { random: random2 } = require_random();
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isBoolean = require_is_boolean();
            var isFunction = require_is_function();
            var isNumber = require_is_number();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var range = require_range();
            var shape = require_shape();
            var sort = require_sort();
            function dfSort(df, a, b) {
              if (isFunction(a)) {
                return dfSortByFunction(df, a, b);
              } else {
                return dfSortByColumns(df, a, b);
              }
            }
            function dfSortByFunction(df, fn, axis) {
              axis = isUndefined(axis) ? 0 : axis;
              assert(isFunction(fn), "When sorting a DataFrame using a function, the first argument to the `sort` method must be a function!");
              assert(isNumber(axis), "When sorting a DataFrame using a function, the second argument to the `sort` method must be null, undefined, 0, or 1 to indicate the axis along which the data should be sorted! An axis of 0 means that the rows will be sorted relative to each other, whereas an axis of 1 means that the columns will be sorted relative to each other.");
              if (axis === 0) {
                const index = sort(df.index, (a, b) => {
                  return fn(df.get(a, null), df.get(b, null));
                });
                return df.get(index, null);
              } else {
                const columns = sort(df.columns, (a, b) => {
                  return fn(df.get(null, a), df.get(null, b));
                });
                return df.get(null, columns);
              }
            }
            function dfSortByColumns(df, cols, directions) {
              let out = df.copy();
              const indexID = random2().toString();
              out = out.assign(indexID, out.index);
              if (isUndefined(cols)) {
                cols = [indexID];
                directions = [true];
              }
              if (isNumber(cols) || isString2(cols)) {
                cols = [cols];
                if (isBoolean(directions) || isString2(directions))
                  directions = [directions];
              }
              assert(isArray(cols), "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null.");
              assert(shape(cols).length === 1, "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null.");
              if (isUndefined(directions))
                directions = range(0, cols.length).map(() => true);
              assert(isArray(directions), "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null.");
              assert(shape(directions).length === 1, "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null.");
              assert(cols.length === directions.length, "The arrays passed into the `sort` method must be equal in length.");
              cols = cols.map((col) => {
                assert(isString2(col) || isNumber(col), "Column references can either be column names (as strings) or column indices (as whole numbers).");
                if (isString2(col)) {
                  const index = out.columns.indexOf(col);
                  assert(index > -1, `The column "${col}" does not exist!`);
                  return index;
                }
                if (isNumber(col)) {
                  assert(parseInt(col) === col, "Column indices must be whole numbers!");
                  assert(col >= 0, `The column index ${col} is out of bounds!`);
                  assert(col < out.columns.length, `The index ${col} is out of bounds!`);
                  return col;
                }
              });
              directions = directions.map((dir) => {
                assert(isString2(dir) || isBoolean(dir), "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false).");
                if (isString2(dir)) {
                  const value = dir.trim().toLowerCase();
                  assert(value === "ascending" || value === "descending", "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false).");
                  return value === "ascending";
                }
                if (isBoolean(dir)) {
                  return dir;
                }
              });
              out.values = sort(out.values, (a, b) => {
                let counter = 0;
                while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
                  counter++;
                }
                const isAscending = directions[counter];
                if (a[cols[counter]] === b[cols[counter]])
                  return 0;
                if (a[cols[counter]] < b[cols[counter]])
                  return isAscending ? -1 : 1;
                if (a[cols[counter]] > b[cols[counter]])
                  return isAscending ? 1 : -1;
              });
              out.index = flatten(out.get(null, indexID).values);
              out = out.dropColumns(indexID);
              return out;
            }
            module2.exports = dfSort;
          }
        });
        var require_df_to_json_string = __commonJS2({
          "src/dataframe/df-to-json-string.js"(exports2, module2) {
            function dfToJSONString(df, axis) {
              return JSON.stringify(df.toObject(axis));
            }
            module2.exports = dfToJSONString;
          }
        });
        var require_df_to_json = __commonJS2({
          "src/dataframe/df-to-json.js"(exports2, module2) {
            var MathError = require_math_error();
            var dfToJSONString = require_df_to_json_string();
            function toJSON(df, filename, axis) {
              const out = dfToJSONString(df, axis);
              let downloadedInBrowser = false;
              let wroteToDiskInNode = false;
              let browserError, nodeError;
              try {
                let newFilename = filename;
                if (filename.includes("/")) {
                  const parts = filename.split("/");
                  newFilename = parts[parts.length - 1];
                }
                const a = document.createElement("a");
                a.href = `data:application/json;charset=utf-8,${encodeURIComponent(out)}`;
                a.download = newFilename;
                a.dispatchEvent(new MouseEvent("click"));
                downloadedInBrowser = true;
              } catch (e) {
                browserError = e;
              }
              try {
                const fs = __require2("fs");
                const path = __require2("path");
                fs.writeFileSync(path.resolve(filename), out, "utf8");
                wroteToDiskInNode = true;
              } catch (e) {
                nodeError = e;
              }
              if (!downloadedInBrowser && !wroteToDiskInNode) {
                if (typeof window !== "undefined") {
                  throw new MathError(browserError);
                } else if (typeof module2 !== "undefined") {
                  throw new MathError(nodeError);
                } else {
                  throw new MathError("I don't know what's going wrong, but it doesn't seem like you're in Node or the browser, and we couldn't download and/or write the file to disk!");
                }
              }
              return df;
            }
            module2.exports = toJSON;
          }
        });
        var require_df_to_object = __commonJS2({
          "src/dataframe/df-to-object.js"(exports2, module2) {
            var assert = require_assert();
            var isUndefined = require_is_undefined();
            function dfToObject(df, axis) {
              if (isUndefined(axis)) {
                axis = 0;
              } else {
                assert(axis === 0 || axis === 1, "The axis parameter of the `toObject` method must be undefined, 0, or 1. An axis of 0 indicates that the returned object should be organized first by rows and then by columns. An axis of 1 indicates that the returned object should be organized first by columns and then by rows.");
              }
              const out = {};
              if (axis === 0) {
                df.index.forEach((rowName, i) => {
                  const temp = {};
                  df.columns.forEach((colName, j) => {
                    temp[colName] = df.values[i][j];
                  });
                  out[rowName] = temp;
                });
              } else {
                df.columns.forEach((colName, j) => {
                  const temp = {};
                  df.index.forEach((rowName, i) => {
                    temp[rowName] = df.values[i][j];
                  });
                  out[colName] = temp;
                });
              }
              return out;
            }
            module2.exports = dfToObject;
          }
        });
        var require_transpose = __commonJS2({
          "src/transpose.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var ndarray = require_ndarray();
            var reverse = require_reverse();
            var shape = require_shape();
            function transpose(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return arr.transpose();
              }
              assert(isArray(arr), "The `transpose` function only works on arrays, Series, and DataFrames!");
              const theShape = shape(arr);
              assert(theShape.length <= 2, "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!");
              if (theShape.length === 1) {
                return reverse(arr);
              } else if (theShape.length === 2) {
                const out = ndarray(reverse(theShape));
                for (let row = 0; row < theShape[0]; row++) {
                  for (let col = 0; col < theShape[1]; col++) {
                    out[col][row] = arr[row][col];
                  }
                }
                return out;
              }
            }
            module2.exports = transpose;
          }
        });
        var require_series_append = __commonJS2({
          "src/series/series-append.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNested = require_is_nested();
            var isSeries = require_is_series();
            var shape = require_shape();
            function seriesAppend(Series, series, x) {
              if (isSeries(x)) {
                return new Series(series.values.concat(x.values));
              }
              if (isArray(x)) {
                const xShape = shape(x);
                assert(xShape.length === 1 && !isNested(xShape), "Only vectors can be appended to Series!");
                const out = series.copy();
                x.forEach((v, i) => {
                  out._values.push(v);
                  out._index.push("item" + (series.values.length + i));
                });
                return out;
              }
              assert(!isDataFrame(x), "DataFrames cannot be appended to Series!");
              return seriesAppend(series, [x]);
            }
            module2.exports = seriesAppend;
          }
        });
        var require_series_apply = __commonJS2({
          "src/series/series-apply.js"(exports2, module2) {
            var assert = require_assert();
            var isFunction = require_is_function();
            function seriesApply(series, fn) {
              assert(isFunction(fn), "The parameter to the `apply` method must be a function.");
              const out = series.copy();
              out._values = out._values.map((v, i) => fn(v, i));
              return out;
            }
            module2.exports = seriesApply;
          }
        });
        var require_series_drop_missing = __commonJS2({
          "src/series/series-drop-missing.js"(exports2, module2) {
            var isUndefined = require_is_undefined();
            function seriesDropMissing(series) {
              const out = series.copy();
              const outIndex = [];
              out._values = out.values.filter((v, i) => {
                if (isUndefined(v)) {
                  return false;
                } else {
                  outIndex.push(out.index[i]);
                  return true;
                }
              });
              out._index = outIndex;
              return out;
            }
            module2.exports = seriesDropMissing;
          }
        });
        var require_series_drop_nan = __commonJS2({
          "src/series/series-drop-nan.js"(exports2, module2) {
            var isNumber = require_is_number();
            function seriesDropNaN(Series, series) {
              const index = [];
              const values = [];
              series.values.forEach((value, i) => {
                if (isNumber(value)) {
                  values.push(value);
                  index.push(series.index[i]);
                }
              });
              const out = new Series(values);
              out.name = series.name;
              out.index = index;
              return out;
            }
            module2.exports = seriesDropNaN;
          }
        });
        var require_series_filter = __commonJS2({
          "src/series/series-filter.js"(exports2, module2) {
            var { copy } = require_copy();
            function seriesFilter(Series, series, fn) {
              let out = series.copy();
              const index = copy(out.index);
              const indicesToRemove = [];
              const newValues = out.values.filter((value, i) => {
                const shouldKeep = fn(value, i, out.values);
                if (!shouldKeep)
                  indicesToRemove.push(out.index[i]);
                return shouldKeep;
              });
              indicesToRemove.forEach((i) => {
                index.splice(index.indexOf(i), 1);
              });
              if (newValues.length === 0) {
                out = new Series();
                out.name = series.name;
                return out;
              }
              out.values = newValues;
              out.index = index;
              return out;
            }
            module2.exports = seriesFilter;
          }
        });
        var require_series_get = __commonJS2({
          "src/series/series-get.js"(exports2, module2) {
            var assert = require_assert();
            var isNumber = require_is_number();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var set = require_set();
            function seriesGet(series, indices) {
              if (isString2(indices) || isNumber(indices))
                indices = [indices];
              const types = set((indices || []).map((v) => typeof v));
              assert(types.length <= 2, "Only whole numbers and/or strings are allowed in `get` arrays!");
              if (types.length === 1) {
                assert(types[0] === "string" || types[0] === "number", "Only whole numbers and/or strings are allowed in `get` arrays!");
              }
              if (types.length === 2) {
                assert(types.indexOf("string") > -1, "Only whole numbers and/or strings are allowed in `get` arrays!");
                assert(types.indexOf("number") > -1, "Only whole numbers and/or strings are allowed in `get` arrays!");
              }
              if (!isUndefined(indices)) {
                indices = indices.map((i) => {
                  if (typeof i === "string") {
                    assert(series.index.indexOf(i) > -1, `Index "${i}" does not exist!`);
                    return i;
                  }
                  if (typeof i === "number") {
                    assert(i >= 0, `Index ${i} is out of bounds!`);
                    assert(parseInt(i) === i, `Indices must be integers!`);
                    assert(i < series.index.length, `Index ${i} is out of bounds!`);
                    return series.index[i];
                  }
                });
              }
              return series.getSubsetByNames(indices);
            }
            module2.exports = seriesGet;
          }
        });
        var require_series_get_subset_by_indices = __commonJS2({
          "src/series/series-get-subset-by-indices.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isUndefined = require_is_undefined();
            var isWholeNumber = require_is_whole_number();
            var range = require_range();
            var shape = require_shape();
            function seriesGetSubsetByIndices(series, indices) {
              const dataShape = series.shape;
              if (isUndefined(indices))
                indices = range(0, dataShape[0]);
              assert(isArray(indices), "The `indices` array must be 1-dimensional array of whole numbers.");
              assert(shape(indices).length === 1, "The `indices` array must be a 1-dimensional array of whole numbers.");
              assert(indices.length > 0, "The `indices` array must contain at least one index.");
              indices.forEach((index) => {
                assert(isWholeNumber(index), "The `indices` array must be a 1-dimensional array of whole numbers.");
                assert(index < series.index.length, `The row index ${index} is out of bounds.`);
              });
              const rows = indices.map((i) => series.index[i]);
              return series.getSubsetByNames(rows);
            }
            module2.exports = seriesGetSubsetByIndices;
          }
        });
        var require_series_get_subset_by_names = __commonJS2({
          "src/series/series-get-subset-by-names.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var shape = require_shape();
            function seriesGetSubsetByNames(Series, series, indices) {
              if (isUndefined(indices))
                indices = series.index;
              assert(isArray(indices), "The `indices` array must be a 1-dimensional array of strings.");
              assert(shape(indices).length === 1, "The `indices` array must be a 1-dimensional array of strings.");
              assert(indices.length > 0, "The `indices` array must contain at least one index name.");
              indices.forEach((name) => {
                assert(isString2(name), "The `indices` array must contain only strings.");
                assert(series.index.indexOf(name) > -1, `The name "${name}" does not exist in the index.`);
              });
              const values = indices.map((name) => {
                return series.values[series.index.indexOf(name)];
              });
              if (values.length === 1)
                return values[0];
              const out = new Series(values);
              out.index = indices;
              out.name = series.name;
              return out;
            }
            module2.exports = seriesGetSubsetByNames;
          }
        });
        var require_series_print = __commonJS2({
          "src/series/series-print.js"(exports2, module2) {
            var { copy } = require_copy();
            var range = require_range();
            function seriesPrint(series) {
              let temp = series.copy();
              const maxRows = typeof window === "undefined" ? 20 : 10;
              if (temp.index.length > maxRows) {
                temp = temp.get(range(0, maxRows / 2).concat(range(temp.index.length - maxRows / 2, temp.index.length)));
                const tempIndex = copy(temp.index);
                tempIndex.splice(parseInt(tempIndex.length / 2), 0, "...");
                temp.values.push("...");
                temp.index.push("...");
                temp = temp.get(tempIndex);
              }
              const out = {};
              temp.values.forEach((value, i) => {
                const obj = {};
                obj[temp.name] = value;
                out[temp.index[i]] = obj;
              });
              console.table(out);
              console.log("Shape:", series.shape, "\n");
              return series;
            }
            module2.exports = seriesPrint;
          }
        });
        var require_series_shuffle = __commonJS2({
          "src/series/series-shuffle.js"(exports2, module2) {
            var shuffle = require_shuffle();
            function seriesShuffle(series) {
              const out = series.copy();
              return out.get(shuffle(out.index));
            }
            module2.exports = seriesShuffle;
          }
        });
        var require_series_sort = __commonJS2({
          "src/series/series-sort.js"(exports2, module2) {
            var assert = require_assert();
            var isFunction = require_is_function();
            var isUndefined = require_is_undefined();
            var sort = require_sort();
            var transpose = require_transpose();
            function seriesSort(Series, series, fn) {
              fn = fn || ((a, b) => a < b ? -1 : 1);
              assert(isUndefined(fn) || isFunction(fn), "You must pass undefined, null, or a comparison function as the second argument to the `sort` method!");
              const pairs = transpose([series.values, series.index]);
              const temp = sort(pairs, (aPair, bPair) => {
                return fn(aPair[0], bPair[0]);
              });
              const newValues = [];
              const newIndex = [];
              temp.forEach((pair) => {
                newValues.push(pair[0]);
                newIndex.push(pair[1]);
              });
              const out = new Series();
              out._values = newValues;
              out._index = newIndex;
              out.name = series.name;
              return out;
            }
            module2.exports = seriesSort;
          }
        });
        var require_series_sort_by_index = __commonJS2({
          "src/series/series-sort-by-index.js"(exports2, module2) {
            var sort = require_sort();
            var transpose = require_transpose();
            function seriesSortByIndex(Series, series) {
              let temp = transpose([series.values, series.index]);
              temp = transpose(sort(temp, (a, b) => {
                if (a[1] === b[1])
                  return 0;
                if (a[1] < b[1])
                  return -1;
                if (a[1] > b[1])
                  return 1;
              }));
              const out = new Series(temp[0]);
              out.index = temp[1];
              out.name = series.name;
              return out;
            }
            module2.exports = seriesSortByIndex;
          }
        });
        var require_series_to_object = __commonJS2({
          "src/series/series-to-object.js"(exports2, module2) {
            function seriesToObject(series) {
              const out = {};
              out[series.name] = {};
              series.index.forEach((index, i) => {
                out[series.name][index] = series.values[i];
              });
              return out;
            }
            module2.exports = seriesToObject;
          }
        });
        var require_series = __commonJS2({
          "src/series/index.js"(exports2, module2) {
            var { copy } = require_copy();
            var assert = require_assert();
            var isArray = require_is_array();
            var isString2 = require_is_string();
            var isUndefined = require_is_undefined();
            var leftPad = require_left_pad();
            var range = require_range();
            var reverse = require_reverse();
            var seriesAppend = require_series_append();
            var seriesApply = require_series_apply();
            var seriesDropMissing = require_series_drop_missing();
            var seriesDropNaN = require_series_drop_nan();
            var seriesFilter = require_series_filter();
            var seriesGet = require_series_get();
            var seriesGetSubsetByIndices = require_series_get_subset_by_indices();
            var seriesGetSubsetByNames = require_series_get_subset_by_names();
            var seriesPrint = require_series_print();
            var seriesShuffle = require_series_shuffle();
            var seriesSort = require_series_sort();
            var seriesSortByIndex = require_series_sort_by_index();
            var seriesToObject = require_series_to_object();
            var shape = require_shape();
            var transpose = require_transpose();
            var SERIES_SYMBOL = Symbol.for("@sparkwave/js-math-tools/series");
            module2.exports = function(DataFrame) {
              class Series {
                static [Symbol.hasInstance](x) {
                  try {
                    return !!x._symbol && x._symbol === SERIES_SYMBOL;
                  } catch (e) {
                    return false;
                  }
                }
                constructor(data) {
                  const self = this;
                  self.name = "data";
                  Object.defineProperty(self, "_symbol", {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: SERIES_SYMBOL
                  });
                  Object.defineProperty(self, "_values", {
                    value: [],
                    configurable: true,
                    enumerable: false,
                    writable: true
                  });
                  Object.defineProperty(self, "values", {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return self._values;
                    },
                    set(x) {
                      assert(isArray(x), "The new values must be a 1-dimensional array!");
                      const dataShape = shape(x);
                      assert(dataShape.length === 1, "The new array of values must be 1-dimensional!");
                      if (dataShape[0] < self._index.length) {
                        self._index = self._index.slice(0, dataShape[0]);
                      } else if (dataShape[0] > self._index.length) {
                        self._index = self._index.concat(range(self._index.length, dataShape[0]).map((i) => {
                          return "item" + leftPad(i, (x.length - 1).toString().length);
                        }));
                      }
                      self._values = x;
                    }
                  });
                  Object.defineProperty(self, "_index", {
                    value: [],
                    configurable: true,
                    enumerable: false,
                    writable: true
                  });
                  Object.defineProperty(self, "index", {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return self._index;
                    },
                    set(x) {
                      assert(isArray(x), "The new index must be a 1-dimensional array of strings!");
                      assert(x.length === self.shape[0], "The new index must be the same length as the old index!");
                      assert(shape(x).length === 1, "The new index must be a 1-dimensional array of strings!");
                      x.forEach((value) => {
                        assert(isString2(value), "All of the row names must be strings!");
                      });
                      self._index = x;
                    }
                  });
                  if (data) {
                    if (data instanceof Series) {
                      self.name = data.name;
                      self.values = copy(data.values);
                      self.index = copy(data.index);
                    } else if (isArray(data)) {
                      const dataShape = shape(data);
                      assert(dataShape.length === 1, "When passing an array into the constructor of a Series, the array must be 1-dimensional!");
                      self.values = data;
                    } else if (data instanceof Object) {
                      const keys = Object.keys(data);
                      assert(keys.length === 1, "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!");
                      const name = keys[0];
                      const values = data[name];
                      assert(shape(values).length === 1, "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!");
                      self.name = name;
                      self.values = values.slice();
                    }
                  }
                }
                get shape() {
                  const self = this;
                  return shape(self.values);
                }
                get length() {
                  const self = this;
                  return self.shape[0];
                }
                get isEmpty() {
                  const self = this;
                  return self.values.filter((v) => !isUndefined(v)).length === 0;
                }
                clear() {
                  const self = this;
                  const out = self.copy();
                  out.values.forEach((v, i) => {
                    out.values[i] = void 0;
                  });
                  return out;
                }
                get(indices) {
                  const self = this;
                  return seriesGet(self, indices);
                }
                getSubsetByNames(indices) {
                  const self = this;
                  return seriesGetSubsetByNames(Series, self, indices);
                }
                getSubsetByIndices(indices) {
                  const self = this;
                  return seriesGetSubsetByIndices(self, indices);
                }
                loc(indices) {
                  const self = this;
                  return self.getSubsetByNames(indices);
                }
                iloc(indices) {
                  const self = this;
                  return self.getSubsetByIndices(indices);
                }
                reverse() {
                  const self = this;
                  const out = new Series(reverse(self.values));
                  out.index = reverse(self.index);
                  out.name = self.name;
                  return out;
                }
                resetIndex() {
                  const self = this;
                  const out = self.copy();
                  out.index = range(0, self.shape[0]).map((i) => {
                    return "item" + leftPad(i, (out.index.length - 1).toString().length);
                  });
                  return out;
                }
                copy() {
                  const self = this;
                  const out = new Series();
                  out._values = copy(self.values);
                  out._index = copy(self.index);
                  out.name = self.name;
                  return out;
                }
                append(x) {
                  const self = this;
                  return seriesAppend(Series, self, x);
                }
                apply(fn) {
                  const self = this;
                  return seriesApply(self, fn);
                }
                concat(x) {
                  const self = this;
                  return self.append(x);
                }
                dropMissing(condition, threshold) {
                  const self = this;
                  return seriesDropMissing(self, condition, threshold);
                }
                dropNaN() {
                  const self = this;
                  return seriesDropNaN(Series, self);
                }
                toObject() {
                  const self = this;
                  return seriesToObject(self);
                }
                print() {
                  const self = this;
                  return seriesPrint(self);
                }
                shuffle() {
                  const self = this;
                  return seriesShuffle(self);
                }
                sort(direction) {
                  const self = this;
                  return seriesSort(Series, self, direction);
                }
                sortByIndex() {
                  const self = this;
                  return seriesSortByIndex(Series, self);
                }
                filter(fn) {
                  const self = this;
                  return seriesFilter(Series, self, fn);
                }
                toDataFrame() {
                  const self = this;
                  const out = new DataFrame(transpose([self.values]));
                  out.columns = [self.name];
                  out.index = self.index;
                  return out;
                }
                transpose() {
                  const self = this;
                  const out = self.copy();
                  out.values = reverse(out.values);
                  out.index = reverse(out.index);
                  return out;
                }
                getDummies() {
                  const self = this;
                  return self.toDataFrame().getDummies();
                }
                oneHotEncode() {
                  const self = this;
                  return self.getDummies();
                }
              }
              return Series;
            };
          }
        });
        var require_dataframe = __commonJS2({
          "src/dataframe/index.js"(exports2, module2) {
            var { copy } = require_copy();
            var assert = require_assert();
            var count = require_count();
            var dfAppend = require_df_append();
            var dfApply = require_df_apply();
            var dfAssign = require_df_assign();
            var dfCopy = require_df_copy();
            var dfDrop = require_df_drop();
            var dfDropMissing = require_df_drop_missing();
            var dfDropNaN = require_df_drop_nan();
            var dfFilter = require_df_filter();
            var dfGet = require_df_get();
            var dfGetDummies = require_df_get_dummies();
            var dfGetSubsetByIndices = require_df_get_subset_by_indices();
            var dfGetSubsetByNames = require_df_get_subset_by_names();
            var dfPrint = require_df_print();
            var dfResetIndex = require_df_reset_index();
            var dfShuffle = require_df_shuffle();
            var dfSort = require_df_sort();
            var dfToJSON = require_df_to_json();
            var dfToJSONString = require_df_to_json_string();
            var dfToObject = require_df_to_object();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isObject = require_is_object();
            var isUndefined = require_is_undefined();
            var leftPad = require_left_pad();
            var ndarray = require_ndarray();
            var range = require_range();
            var shape = require_shape();
            var transpose = require_transpose();
            var DATAFRAME_SYMBOL = Symbol.for("@sparkwave/js-math-tools/dataframe");
            function makeKey(n) {
              const alpha = "abcdefghijklmnopqrstuvwxyz1234567890";
              let out = "";
              for (let i = 0; i < n; i++)
                out += alpha[parseInt(Math.random() * alpha.length)];
              return out;
            }
            var DataFrame = class {
              static [Symbol.hasInstance](x) {
                try {
                  return !!x._symbol && x._symbol === DATAFRAME_SYMBOL;
                } catch (e) {
                  return false;
                }
              }
              constructor(data) {
                const self = this;
                Object.defineProperty(self, "_symbol", {
                  configurable: false,
                  enumerable: false,
                  writable: false,
                  value: DATAFRAME_SYMBOL
                });
                Object.defineProperty(self, "_values", {
                  value: [],
                  configurable: true,
                  enumerable: false,
                  writable: true
                });
                Object.defineProperty(self, "values", {
                  configurable: true,
                  enumerable: true,
                  get() {
                    if (self._values.length === 0 || !isUndefined(self._values[0]) && self._values[0].length === 0) {
                      return [[]];
                    }
                    return self._values;
                  },
                  set(x) {
                    assert(isArray(x), "The new values must be a 2-dimensional array!");
                    const dataShape = shape(x);
                    assert(dataShape.length === 2, "The new array of values must be 2-dimensional!");
                    if (dataShape[0] < self._index.length) {
                      self._index = self._index.slice(0, dataShape[0]);
                    } else if (dataShape[0] > self._index.length) {
                      self._index = self._index.concat(range(self._index.length, dataShape[0]).map((i) => {
                        return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
                      }));
                    }
                    if (dataShape[1] < self._columns.length) {
                      self._columns = self._columns.slice(0, dataShape[1]);
                    } else if (dataShape[1] > self._columns.length) {
                      self._columns = self._columns.concat(range(self._columns.length, dataShape[1]).map((i) => {
                        return "col" + leftPad(i, (dataShape[1] - 1).toString().length);
                      }));
                    }
                    self._values = x;
                  }
                });
                Object.defineProperty(self, "_columns", {
                  value: [],
                  configurable: true,
                  enumerable: false,
                  writable: true
                });
                Object.defineProperty(self, "columns", {
                  configurable: true,
                  enumerable: true,
                  get() {
                    return self._columns;
                  },
                  set(x) {
                    assert(isArray(x), "The new columns list must be a 1-dimensional array of strings!");
                    assert(self.isEmpty || x.length === self.shape[1], "The new columns list must be the same length as the old columns list!");
                    assert(shape(x).length === 1, "The new columns list must be a 1-dimensional array of strings!");
                    x = x.map((v) => {
                      if (typeof v !== "string") {
                        v = JSON.stringify(v) || v.toString();
                      }
                      if (v.trim().length === 0) {
                        return "untitled_" + makeKey(8);
                      }
                      return v.trim();
                    });
                    const counts = (() => {
                      const temp = count(x);
                      const out = {};
                      temp.forEach((obj) => {
                        out[obj.value] = obj.count;
                      });
                      return out;
                    })();
                    x = x.map((v) => {
                      if (counts[v] > 1) {
                        return v + "_" + makeKey(8);
                      }
                      return v;
                    });
                    self._columns = x;
                  }
                });
                Object.defineProperty(self, "_index", {
                  value: [],
                  configurable: true,
                  enumerable: false,
                  writable: true
                });
                Object.defineProperty(self, "index", {
                  configurable: true,
                  enumerable: true,
                  get() {
                    return self._index;
                  },
                  set(x) {
                    assert(isArray(x), "The new index must be a 1-dimensional array of strings!");
                    assert(self.isEmpty || x.length === self.shape[0], "The new index must be the same length as the old index!");
                    assert(shape(x).length === 1, "The new index must be a 1-dimensional array of strings!");
                    x = x.map((v) => {
                      if (typeof v !== "string") {
                        v = JSON.stringify(v) || v.toString();
                      }
                      if (v.trim().length === 0) {
                        return "untitled_" + makeKey(8);
                      }
                      return v.trim();
                    });
                    const counts = (() => {
                      const temp = count(x);
                      const out = {};
                      temp.forEach((obj) => {
                        out[obj.value] = obj.count;
                      });
                      return out;
                    })();
                    x = x.map((v) => {
                      if (counts[v] > 1) {
                        return v + "_" + makeKey(8);
                      }
                      return v;
                    });
                    self._index = x;
                  }
                });
                assert(isUndefined(data) || isObject(data) || isArray(data), "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values.");
                if (data) {
                  if (data instanceof DataFrame) {
                    self.values = copy(data.values);
                    self.columns = copy(data.columns);
                    self.index = copy(data.index);
                  } else if (isArray(data)) {
                    const dataShape = shape(data);
                    assert(dataShape.length === 2, "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!");
                    self.values = data;
                  } else {
                    self._columns = Object.keys(data);
                    const temp = [];
                    self._columns.forEach((col) => {
                      const values = data[col];
                      temp.push(values);
                    });
                    self._values = transpose(temp);
                    const dataShape = shape(self.values);
                    self._index = range(0, dataShape[0]).map((i) => {
                      return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
                    });
                  }
                }
              }
              get shape() {
                const self = this;
                return shape(self.values);
              }
              get length() {
                const self = this;
                return self.shape[0];
              }
              get width() {
                const self = this;
                return self.shape[1];
              }
              get rows() {
                const self = this;
                return self.index;
              }
              set rows(rows) {
                const self = this;
                self.index = rows;
              }
              get isEmpty() {
                const self = this;
                return flatten(self.values).length === 0;
              }
              clear() {
                const self = this;
                const out = new DataFrame(ndarray(self.shape));
                out.columns = self.columns.slice();
                out.index = self.index.slice();
                return out;
              }
              get(rows, cols) {
                const self = this;
                if (arguments.length === 0) {
                  return self;
                }
                if (arguments.length === 1) {
                  try {
                    return self.get(null, rows);
                  } catch (e) {
                    return self.get(rows, null);
                  }
                }
                return dfGet(self, rows, cols);
              }
              getSubsetByNames(rows, cols) {
                const self = this;
                return dfGetSubsetByNames(DataFrame, Series, self, rows, cols);
              }
              getSubsetByIndices(rowIndices, colIndices) {
                const self = this;
                return dfGetSubsetByIndices(self, rowIndices, colIndices);
              }
              getDummies(columns) {
                const self = this;
                return dfGetDummies(DataFrame, self, columns);
              }
              oneHotEncode(columns) {
                const self = this;
                return dfGetDummies(DataFrame, self, columns);
              }
              transpose() {
                const self = this;
                const out = new DataFrame(transpose(self.values));
                out.columns = self.index.slice();
                out.index = self.columns.slice();
                return out;
              }
              get T() {
                const self = this;
                return self.transpose();
              }
              resetIndex(shouldSkipCopying) {
                const self = this;
                return dfResetIndex(self, shouldSkipCopying);
              }
              copy() {
                const self = this;
                return dfCopy(DataFrame, self);
              }
              assign(p1, p2) {
                const self = this;
                return dfAssign(DataFrame, Series, self, p1, p2);
              }
              apply(fn, axis) {
                const self = this;
                return dfApply(DataFrame, Series, self, fn, axis);
              }
              dropMissing(axis, condition, threshold) {
                const self = this;
                return dfDropMissing(DataFrame, Series, self, axis, condition, threshold);
              }
              dropNaN(axis, condition, threshold) {
                const self = this;
                return dfDropNaN(DataFrame, self, axis, condition, threshold);
              }
              drop(rows, cols) {
                const self = this;
                return dfDrop(DataFrame, Series, self, rows, cols);
              }
              dropColumns(columns) {
                const self = this;
                return self.drop(null, columns);
              }
              dropRows(rows) {
                const self = this;
                return self.drop(rows, null);
              }
              toObject(axis) {
                const self = this;
                return dfToObject(self, axis);
              }
              toJSONString(axis) {
                const self = this;
                return dfToJSONString(self, axis);
              }
              saveAsJSON(filename, axis) {
                const self = this;
                return dfToJSON(self, filename, axis);
              }
              print() {
                const self = this;
                return dfPrint(DataFrame, Series, self);
              }
              sort(cols, directions) {
                const self = this;
                return dfSort(self, cols, directions);
              }
              sortByIndex() {
                const self = this;
                return self.sort();
              }
              filter(fn, axis) {
                const self = this;
                return dfFilter(DataFrame, Series, self, fn, axis);
              }
              shuffle(axis) {
                const self = this;
                return dfShuffle(self, axis);
              }
              append(x, axis) {
                const self = this;
                return dfAppend(self, x, axis);
              }
              concat(x, axis) {
                const self = this;
                return self.append(x, axis);
              }
              join(x, axis) {
                const self = this;
                return self.append(x, axis);
              }
              toString() {
                const self = this;
                return JSON.stringify(self);
              }
            };
            var Series = require_series()(DataFrame);
            module2.exports = { DataFrame, Series };
          }
        });
        var require_max = __commonJS2({
          "src/max.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function max(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return max(arr.values);
              }
              assert(isArray(arr), "The `max` function only works on arrays, Series, and DataFrames!");
              try {
                return Math.max(...flatten(arr));
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = max;
          }
        });
        var require_vectorize = __commonJS2({
          "src/vectorize.js"(exports2, module2) {
            var { DataFrame, Series } = require_dataframe();
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isFunction = require_is_function();
            var isSeries = require_is_series();
            var max = require_max();
            var range = require_range();
            var shape = require_shape();
            function isArraySeriesOrDataFrame(x) {
              return isArray(x) || isSeries(x) || isDataFrame(x);
            }
            function vectorize(fn) {
              assert(isFunction(fn), "You must pass a function into the `vectorize` function!");
              return function helper() {
                let hasSeries, hasDataFrames;
                const series = [];
                const dataframes = [];
                const childArrays = Object.keys(arguments).filter((key) => {
                  const arg = arguments[key];
                  if (isArray(arg)) {
                    return true;
                  } else if (isSeries(arg)) {
                    hasSeries = true;
                    series.push(arg);
                    return true;
                  } else if (isDataFrame(arg)) {
                    hasDataFrames = true;
                    dataframes.push(arg);
                    return true;
                  } else {
                    return false;
                  }
                }).map((key) => arguments[key]);
                childArrays.slice(0, -1).forEach((s, i) => {
                  assert(isEqual(isArray(s) ? shape(s) : s.shape, isArray(childArrays[i + 1]) ? shape(childArrays[i + 1]) : childArrays[i + 1].shape), `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`);
                });
                if (childArrays.length > 0) {
                  const maxLength = max(childArrays.map((a) => a.length ? a.length : a.values.length));
                  const out = range(0, maxLength).map((i) => {
                    const args = Object.keys(arguments).map((key) => {
                      if (isArraySeriesOrDataFrame(arguments[key])) {
                        if (isArray(arguments[key])) {
                          return arguments[key][i];
                        } else if (isSeries(arguments[key])) {
                          return arguments[key].values[i];
                        } else if (isDataFrame(arguments[key])) {
                          return arguments[key].values[i];
                        }
                      } else {
                        return arguments[key];
                      }
                    });
                    return helper(...args);
                  });
                  if (hasDataFrames) {
                    try {
                      if (dataframes.length === 1 && isEqual(shape(dataframes[0]), shape(out))) {
                        const temp = new DataFrame(out);
                        temp.index = dataframes[0].index.slice();
                        temp.columns = dataframes[0].columns.slice();
                        return temp;
                      } else {
                        return new DataFrame(out);
                      }
                    } catch (e) {
                      return out;
                    }
                  }
                  if (hasSeries) {
                    try {
                      if (series.length === 1 && series[0].length === out.length) {
                        const temp = new Series(out);
                        temp.name = series[0].name;
                        temp.index = series[0].index.slice();
                        return temp;
                      } else {
                        return new Series(out);
                      }
                    } catch (e) {
                      return out;
                    }
                  }
                  return out;
                } else {
                  return fn(...arguments);
                }
              };
            }
            module2.exports = vectorize;
          }
        });
        var require_abs = __commonJS2({
          "src/abs.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function abs(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.abs(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(abs);
          }
        });
        var require_add = __commonJS2({
          "src/add.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function add() {
              try {
                let out = 0;
                const x = Object.values(arguments);
                for (let i = 0; i < x.length; i++) {
                  if (!isNumber(x[i]))
                    return NaN;
                  out += x[i];
                }
                return out;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(add);
          }
        });
        var require_apply = __commonJS2({
          "src/apply.js"(exports2, module2) {
            var vectorize = require_vectorize();
            function apply(x, fn) {
              try {
                return fn(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(apply);
          }
        });
        var require_arccos = __commonJS2({
          "src/arccos.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function arccos(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.acos(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(arccos);
          }
        });
        var require_arcsin = __commonJS2({
          "src/arcsin.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function arcsin(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.asin(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(arcsin);
          }
        });
        var require_arctan = __commonJS2({
          "src/arctan.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function arctan(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.atan(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(arctan);
          }
        });
        var require_argmax = __commonJS2({
          "src/argmax.js"(exports2, module2) {
            var assert = require_assert();
            var indexOf = require_index_of();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var max = require_max();
            function argmax(x) {
              if (isDataFrame(x)) {
                const index = argmax(x.values);
                return [x.index[index[0]], x.columns[index[1]]];
              }
              if (isSeries(x)) {
                const index = argmax(x.values);
                return [x.index[index]];
              }
              assert(isArray(x), "The `argmax` function only works on arrays, Series, and DataFrames!");
              try {
                const out = indexOf(x, max(x));
                if (out) {
                  if (out.length === 0) {
                    return void 0;
                  } else if (out.length === 1) {
                    return out[0];
                  } else {
                    return out;
                  }
                } else {
                  return void 0;
                }
              } catch (e) {
                return void 0;
              }
            }
            module2.exports = argmax;
          }
        });
        var require_min = __commonJS2({
          "src/min.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function min(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return min(arr.values);
              }
              assert(isArray(arr), "The `min` function only works on arrays, Series, and DataFrames!");
              try {
                return Math.min(...flatten(arr));
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = min;
          }
        });
        var require_argmin = __commonJS2({
          "src/argmin.js"(exports2, module2) {
            var assert = require_assert();
            var indexOf = require_index_of();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var min = require_min();
            function argmin(x) {
              if (isDataFrame(x)) {
                const index = argmin(x.values);
                return [x.index[index[0]], x.columns[index[1]]];
              }
              if (isSeries(x)) {
                const index = argmin(x.values);
                return [x.index[index]];
              }
              assert(isArray(x), "The `argmin` function only works on arrays, Series, and DataFrames!");
              try {
                const out = indexOf(x, min(x));
                if (out) {
                  if (out.length === 0) {
                    return void 0;
                  } else if (out.length === 1) {
                    return out[0];
                  } else {
                    return out;
                  }
                } else {
                  return void 0;
                }
              } catch (e) {
                return void 0;
              }
            }
            module2.exports = argmin;
          }
        });
        var require_cast = __commonJS2({
          "src/cast.js"(exports2, module2) {
            var isArray = require_is_array();
            var isBoolean = require_is_boolean();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isNumber = require_is_number();
            var isObject = require_is_object();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            function cast(value, type) {
              if (isDataFrame(value) || isSeries(value)) {
                return value.apply((item) => cast(item, type));
              }
              if (isArray(value)) {
                return value.map((v) => cast(v, type));
              }
              if (type === "null") {
                return null;
              }
              if (type === "number") {
                if (isUndefined(value)) {
                  return NaN;
                }
                const booleanValue = cast(value, "boolean");
                if (isBoolean(booleanValue)) {
                  return booleanValue ? 1 : 0;
                }
                try {
                  JSON.parse(value);
                } catch (e) {
                  const dateValue = cast(value, "date");
                  if (dateValue instanceof Date) {
                    return dateValue.getTime();
                  }
                }
                const out = parseFloat(value);
                if (isNaN(out))
                  return NaN;
                return out;
              }
              if (type === "boolean") {
                if (isBoolean(value)) {
                  return value;
                }
                if (isNumber(value)) {
                  if (value === 0) {
                    return false;
                  }
                  if (value === 1) {
                    return true;
                  }
                  return null;
                }
                try {
                  const vBool = (typeof value === "object" ? value.toString() === "null" ? "false" : JSON.stringify(value) : value.toString()).trim().toLowerCase();
                  if (vBool === "true" || vBool === "yes" || vBool === "y") {
                    return true;
                  }
                  if (vBool === "false" || vBool === "no" || vBool === "n") {
                    return false;
                  }
                  return null;
                } catch (e) {
                  return null;
                }
              }
              if (type === "date") {
                if (value instanceof Date) {
                  return value;
                }
                if (isUndefined(value)) {
                  return null;
                }
                const valueFloat = parseFloat(value);
                if (!isNaN(valueFloat)) {
                  const out = new Date(value);
                  if (out.toString() === "Invalid Date")
                    return null;
                  return out;
                }
                const valueDate = Date.parse(value);
                if (!isNaN(valueDate)) {
                  return new Date(valueDate);
                }
                return null;
              }
              if (type === "object") {
                if (isObject(value)) {
                  return value;
                }
                const booleanValue = cast(value, "boolean");
                if (isBoolean(booleanValue)) {
                  return null;
                }
                try {
                  const numberValue = cast(value, "number");
                  if (isNumber(numberValue)) {
                    JSON.parse(value);
                    return null;
                  }
                } catch (e) {
                }
                const dateValue = cast(value, "date");
                if (dateValue) {
                  return dateValue;
                }
                try {
                  const out = JSON.parse(value);
                  if (isArray(out)) {
                    return out.map((v) => cast(v, type));
                  } else {
                    return out;
                  }
                } catch (e) {
                  return null;
                }
              }
              if (type === "string") {
                if (isUndefined(value)) {
                  if (isEqual(value, void 0)) {
                    return "undefined";
                  }
                  return "null";
                }
                if (value instanceof Date) {
                  return value.toJSON();
                }
                const valueString = (() => {
                  if (typeof value === "object") {
                    if (value === null) {
                      return "null";
                    } else {
                      return JSON.stringify(value);
                    }
                  } else {
                    return value.toString();
                  }
                })();
                return valueString;
              }
            }
            module2.exports = cast;
          }
        });
        var require_ceil = __commonJS2({
          "src/ceil.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function ceil(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.ceil(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(ceil);
          }
        });
        var require_chop = __commonJS2({
          "src/chop.js"(exports2, module2) {
            var abs = require_abs();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var vectorize = require_vectorize();
            function chop(x, threshold) {
              try {
                if (!isNumber(x))
                  return NaN;
                if (isUndefined(threshold)) {
                  threshold = 1e-10;
                } else if (!isNumber(threshold)) {
                  return NaN;
                }
                return abs(x) < threshold ? 0 : x;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(chop);
          }
        });
        var require_clamp = __commonJS2({
          "src/clamp.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function clamp(x, a, b) {
              try {
                if (!isNumber(x))
                  return NaN;
                if (!isNumber(a))
                  return NaN;
                if (!isNumber(b))
                  return NaN;
                if (x < a)
                  return a;
                if (x > b)
                  return b;
                return x;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(clamp);
          }
        });
        var require_combinations = __commonJS2({
          "src/combinations.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            function combinations(arr, r) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return combinations(arr.values, r);
              }
              assert(isArray(arr), "The `combinations` function only works on arrays, Series, and DataFrames!");
              assert(isNumber(r), "`r` must be a whole number!");
              arr = flatten(arr);
              if (r > arr.length) {
                return [arr];
              }
              if (r <= 0) {
                return [[]];
              }
              assert(r === parseInt(r), "`r` must be a whole number!");
              if (arr.length < 2)
                return arr;
              const out = [];
              arr.forEach((item, i) => {
                const after = arr.slice(i + 1);
                if (after.length < r - 1)
                  return;
                const children = combinations(after, r - 1);
                children.forEach((child) => {
                  out.push([item].concat(child));
                });
              });
              return out;
            }
            module2.exports = combinations;
          }
        });
        var require_mean = __commonJS2({
          "src/mean.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function mean(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return mean(arr.values);
              }
              assert(isArray(arr), "The `mean` function only works on arrays, Series, and DataFrames!");
              try {
                const temp = flatten(arr);
                let out = 0;
                temp.forEach((v) => {
                  out += v;
                });
                return out / temp.length;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = mean;
          }
        });
        var require_covariance = __commonJS2({
          "src/covariance.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var mean = require_mean();
            var shape = require_shape();
            function covariance(x, y) {
              if (isSeries(x)) {
                return covariance(x.values, y);
              }
              if (isSeries(y)) {
                return covariance(x, y.values);
              }
              assert(isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1, "The `covariance` function only works on 1-dimensional arrays and Series!");
              assert(x.length === y.length, "The two arrays or Series passed into the `covariance` function must have the same length!");
              try {
                const mx = mean(x);
                const my = mean(y);
                if (!isNumber(mx) || !isNumber(my)) {
                  return NaN;
                }
                const n = Math.max(x.length, y.length);
                let out = 0;
                for (let i = 0; i < n; i++) {
                  if (!isNumber(x[i]))
                    return NaN;
                  if (!isNumber(y[i]))
                    return NaN;
                  out += (x[i] - mx) * (y[i] - my);
                }
                return out / x.length;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = covariance;
          }
        });
        var require_sqrt = __commonJS2({
          "src/sqrt.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function sqrt(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.sqrt(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(sqrt);
          }
        });
        var require_variance = __commonJS2({
          "src/variance.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var mean = require_mean();
            function variance(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return variance(arr.values);
              }
              assert(isArray(arr), "The `variance` function only works on arrays, Series, and DataFrames!");
              try {
                const temp = flatten(arr);
                const m = mean(temp);
                let out = 0;
                for (let i = 0; i < temp.length; i++) {
                  if (!isNumber(temp[i]))
                    return NaN;
                  out += (temp[i] - m) * (temp[i] - m);
                }
                return out / temp.length;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = variance;
          }
        });
        var require_std = __commonJS2({
          "src/std.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var sqrt = require_sqrt();
            var variance = require_variance();
            function std(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return std(arr.values);
              }
              assert(isArray(arr), "The `std` function only works on arrays, Series, and DataFrames!");
              try {
                return sqrt(variance(arr));
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = std;
          }
        });
        var require_correl = __commonJS2({
          "src/correl.js"(exports2, module2) {
            var assert = require_assert();
            var covariance = require_covariance();
            var isArray = require_is_array();
            var isSeries = require_is_series();
            var shape = require_shape();
            var std = require_std();
            function correl(x, y) {
              if (isSeries(x)) {
                return correl(x.values, y);
              }
              if (isSeries(y)) {
                return correl(x, y.values);
              }
              assert(isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1, "The `correl` function only works on 1-dimensional arrays and Series!");
              assert(x.length === y.length, "The two arrays or Series passed into the `correl` function must have the same length!");
              try {
                return covariance(x, y) / (std(x) * std(y));
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = correl;
          }
        });
        var require_cos = __commonJS2({
          "src/cos.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function cos(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.cos(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(cos);
          }
        });
        var require_data_types = __commonJS2({
          "src/helpers/data-types.js"(exports2, module2) {
            module2.exports = Object.freeze({
              boolean: "boolean",
              date: "date",
              null: "null",
              number: "number",
              object: "object",
              string: "string"
            });
          }
        });
        var require_diff = __commonJS2({
          "src/diff.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isSeries = require_is_series();
            var set = require_set();
            function diff(a, b) {
              if (isDataFrame(a) || isSeries(a)) {
                return diff(a.values, b);
              }
              if (isDataFrame(b) || isSeries(b)) {
                return diff(a, b.values);
              }
              assert(isArray(a) && isArray(b), "The `diff` function only works on arrays, Series, and DataFrames!");
              const aTemp = set(a);
              const bTemp = set(b);
              const out = [];
              aTemp.forEach((item) => {
                if (bTemp.findIndex((other) => isEqual(other, item)) < 0) {
                  out.push(item);
                }
              });
              return out;
            }
            module2.exports = diff;
          }
        });
        var require_pow = __commonJS2({
          "src/pow.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function pow(x, p) {
              try {
                if (!isNumber(x))
                  return NaN;
                if (!isNumber(p))
                  return NaN;
                return Math.pow(x, p);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(pow);
          }
        });
        var require_multiply = __commonJS2({
          "src/multiply.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function multiply() {
              try {
                const values = Object.values(arguments);
                if (values.length === 0)
                  return NaN;
                let out = 1;
                for (let i = 0; i < values.length; i++) {
                  if (!isNumber(values[i]))
                    return NaN;
                  out *= values[i];
                }
                return out;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(multiply);
          }
        });
        var require_scale = __commonJS2({
          "src/scale.js"(exports2, module2) {
            var multiply = require_multiply();
            function scale() {
              return multiply(...arguments);
            }
            module2.exports = scale;
          }
        });
        var require_subtract = __commonJS2({
          "src/subtract.js"(exports2, module2) {
            var add = require_add();
            var scale = require_scale();
            function subtract(a, b) {
              return add(a, scale(b, -1));
            }
            module2.exports = subtract;
          }
        });
        var require_sum = __commonJS2({
          "src/sum.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            function sum(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return sum(arr.values);
              }
              assert(isArray(arr), "The `sum` function only works on arrays, Series, and DataFrames!");
              try {
                if (arr.length === 0)
                  return NaN;
                return flatten(arr).reduce((a, b) => a + b, 0);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = sum;
          }
        });
        var require_distance = __commonJS2({
          "src/distance.js"(exports2, module2) {
            var abs = require_abs();
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var pow = require_pow();
            var shape = require_shape();
            var sqrt = require_sqrt();
            var subtract = require_subtract();
            var sum = require_sum();
            function distance(a, b) {
              if (isNumber(a) && isNumber(b)) {
                return abs(a - b);
              }
              if (isDataFrame(a) || isSeries(a)) {
                return distance(a.values, b);
              }
              if (isDataFrame(b) || isSeries(b)) {
                return distance(a, b.values);
              }
              if (isArray(a) && isArray(b)) {
                assert(isEqual(shape(a), shape(b)), "If passing two arrays, Series, or DataFrames into the `distance` function, then those objects must have the same shape!");
              }
              try {
                return sqrt(sum(pow(subtract(a, b), 2)));
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = distance;
          }
        });
        var require_divide = __commonJS2({
          "src/divide.js"(exports2, module2) {
            var pow = require_pow();
            var scale = require_scale();
            function divide(a, b) {
              return scale(a, pow(b, -1));
            }
            module2.exports = divide;
          }
        });
        var require_dot = __commonJS2({
          "src/dot.js"(exports2, module2) {
            var { DataFrame, Series } = require_dataframe();
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var scale = require_scale();
            var shape = require_shape();
            var sum = require_sum();
            var transpose = require_transpose();
            function dot(a, b) {
              if (isDataFrame(a)) {
                const temp = dot(a.values, b);
                if (shape(temp).length === 1) {
                  const out = new Series(temp);
                  out.name = isSeries(b) ? b.name : out.name;
                  out.index = a.index.slice();
                  return out;
                } else {
                  const out = new DataFrame(temp);
                  out.index = a.index.slice();
                  if (isDataFrame(b)) {
                    out.columns = b.columns.slice();
                  }
                  return out;
                }
              }
              if (isDataFrame(b)) {
                const temp = dot(a, b.values);
                if (shape(temp).length === 1) {
                  const out = new Series(temp);
                  out.name = isSeries(a) ? a.name : out.name;
                  out.index = b.columns.slice();
                  return out;
                } else {
                  const out = new DataFrame(temp);
                  out.columns = b.columns.slice();
                  return out;
                }
              }
              if (isSeries(a)) {
                return dot(a.values, b);
              }
              if (isSeries(b)) {
                return dot(a, b.values);
              }
              assert(isArray(a) && isArray(b), "The `dot` function only works on arrays, Series, and DataFrames!");
              flatten(a).concat(flatten(b)).forEach((v) => {
                assert(isNumber(v), "One of the arrays you passed into the `dot` function contains non-numerical values!");
              });
              const aShape = shape(a);
              const bShape = shape(b);
              assert(aShape.length <= 2 && bShape.length <= 2, "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!");
              assert(aShape[aShape.length - 1] === bShape[0], `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${aShape[aShape.length - 1]} !== ${bShape[0]})`);
              if (aShape.length === 1 && bShape.length === 1) {
                return sum(scale(a, b));
              } else if (aShape.length === 1 && bShape.length === 2) {
                return transpose(b).map((col) => dot(a, col));
              } else if (aShape.length === 2 && bShape.length === 1) {
                return a.map((row) => dot(row, b));
              } else if (aShape.length === 2 && bShape.length === 2) {
                const bTranspose = transpose(b);
                const out = [];
                for (let i = 0; i < a.length; i++) {
                  const row = [];
                  for (let j = 0; j < bTranspose.length; j++) {
                    row.push(dot(a[i], bTranspose[j]));
                  }
                  out.push(row);
                }
                return out;
              }
            }
            module2.exports = dot;
          }
        });
        var require_drop_missing = __commonJS2({
          "src/drop-missing.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            function dropMissing(x) {
              if (isDataFrame(x) || isSeries(x)) {
                return x.dropMissing(...Object.values(arguments).slice(1));
              }
              assert(isArray(x), "The `dropMissing` function only works on arrays, Series, and DataFrames!");
              const out = [];
              x.forEach((v) => {
                try {
                  return out.push(dropMissing(v));
                } catch (e) {
                  if (!isUndefined(v)) {
                    out.push(v);
                  }
                }
              });
              return out;
            }
            module2.exports = dropMissing;
          }
        });
        var require_drop_missing_pairwise = __commonJS2({
          "src/drop-missing-pairwise.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            var shape = require_shape();
            function dropMissingPairwise(a, b) {
              if (isDataFrame(a) || isSeries(a)) {
                return dropMissingPairwise(a.values, b);
              }
              if (isDataFrame(b) || isSeries(b)) {
                return dropMissingPairwise(a, b.values);
              }
              assert(isArray(a) && isArray(b), "The `dropMissingPairwise` function only works on arrays, Series, and DataFrames!");
              assert(isEqual(shape(a), shape(b)), "The two arrays, Series, and/or DataFrames passed into the `dropMissingPairwise` function must have the same shape!");
              const aOut = [];
              const bOut = [];
              for (let i = 0; i < a.length; i++) {
                try {
                  const [aChildren, bChildren] = dropMissingPairwise(a[i], b[i]);
                  aOut.push(aChildren);
                  bOut.push(bChildren);
                } catch (e) {
                  if (!isUndefined(a[i]) && !isUndefined(b[i])) {
                    aOut.push(a[i]);
                    bOut.push(b[i]);
                  }
                }
              }
              return [aOut, bOut];
            }
            module2.exports = dropMissingPairwise;
          }
        });
        var require_drop_nan_pairwise = __commonJS2({
          "src/drop-nan-pairwise.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var shape = require_shape();
            function dropNaNPairwise(a, b) {
              if (isDataFrame(a) || isSeries(a)) {
                return dropNaNPairwise(a.values, b);
              }
              if (isDataFrame(b) || isSeries(b)) {
                return dropNaNPairwise(a, b.values);
              }
              assert(isArray(a) && isArray(b), "The `dropNaNPairwise` only works on arrays, Series, and DataFrames!");
              assert(isEqual(shape(a), shape(b)), "The two arrays, Series, and/or DataFrames passed into the `dropNaNPairwise` must have the same shape!");
              const aOut = [];
              const bOut = [];
              for (let i = 0; i < a.length; i++) {
                try {
                  const [aChildren, bChildren] = dropNaNPairwise(a[i], b[i]);
                  aOut.push(aChildren);
                  bOut.push(bChildren);
                } catch (e) {
                  if (isNumber(a[i]) && isNumber(b[i])) {
                    aOut.push(a[i]);
                    bOut.push(b[i]);
                  }
                }
              }
              return [aOut, bOut];
            }
            module2.exports = dropNaNPairwise;
          }
        });
        var require_drop_undefined = __commonJS2({
          "src/drop-undefined.js"(exports2, module2) {
            var dropMissing = require_drop_missing();
            function dropUndefined(x) {
              return dropMissing(x);
            }
            module2.exports = dropUndefined;
          }
        });
        var require_exp = __commonJS2({
          "src/exp.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function exp(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.exp(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(exp);
          }
        });
        var require_factorial = __commonJS2({
          "src/factorial.js"(exports2, module2) {
            var vectorize = require_vectorize();
            function factorial(n) {
              try {
                if (n !== parseInt(n))
                  return NaN;
                if (n <= 1)
                  return 1;
                return n * factorial(n - 1);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(factorial);
          }
        });
        var require_find = __commonJS2({
          "src/find.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isFunction = require_is_function();
            var isObject = require_is_object();
            var isSeries = require_is_series();
            function find(x, fn) {
              if (isDataFrame(x)) {
                return find(flatten(x.values), fn);
              }
              if (isSeries(x)) {
                return find(x.values, fn);
              }
              assert(isObject(x) || isArray(x), "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `find` function!");
              if (!isFunction(fn)) {
                const value = fn;
                fn = (v) => v === value;
              }
              function helper(x2, fn2, checked) {
                checked = checked || [];
                if (checked.indexOf(x2) > -1) {
                  return null;
                }
                if (isObject(x2)) {
                  checked.push(x2);
                  const keys = Object.keys(x2);
                  for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = x2[key];
                    if (fn2(value)) {
                      return value;
                    }
                    const result = helper(value, fn2, checked);
                    if (result) {
                      return result;
                    }
                  }
                } else if (isArray(x2)) {
                  checked.push(x2);
                  for (let i = 0; i < x2.length; i++) {
                    const value = x2[i];
                    if (fn2(value)) {
                      return value;
                    }
                    const result = helper(value, fn2, checked);
                    if (result) {
                      return result;
                    }
                  }
                } else {
                  if (fn2(x2)) {
                    return x2;
                  }
                }
                return null;
              }
              function safeFn(v) {
                try {
                  return fn(v);
                } catch (e) {
                  return false;
                }
              }
              return helper(x, safeFn);
            }
            module2.exports = find;
          }
        });
        var require_find_all = __commonJS2({
          "src/find-all.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isFunction = require_is_function();
            var isObject = require_is_object();
            var isSeries = require_is_series();
            function findAll(x, fn) {
              if (isDataFrame(x)) {
                return findAll(flatten(x.values), fn);
              }
              if (isSeries(x)) {
                return findAll(x.values, fn);
              }
              assert(isObject(x) || isArray(x), "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `findAll` function!");
              if (!isFunction(fn)) {
                const value = fn;
                fn = (v) => v === value;
              }
              function helper(x2, fn2, checked) {
                checked = checked || [];
                if (checked.indexOf(x2) > -1) {
                  return null;
                }
                if (isObject(x2)) {
                  checked.push(x2);
                  const keys = Object.keys(x2);
                  const out = [];
                  for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = x2[key];
                    let alreadyStoredThisValue = false;
                    if (fn2(value)) {
                      out.push(value);
                      alreadyStoredThisValue = true;
                    }
                    const results2 = helper(value, fn2, checked);
                    if (results2 && results2.length > 0) {
                      results2.slice(alreadyStoredThisValue ? 1 : 0).forEach((r) => out.push(r));
                    }
                  }
                  return out;
                } else if (isArray(x2)) {
                  checked.push(x2);
                  const out = [];
                  for (let i = 0; i < x2.length; i++) {
                    const value = x2[i];
                    let alreadyStoredThisValue = false;
                    if (fn2(value)) {
                      out.push(value);
                      alreadyStoredThisValue = true;
                    }
                    const results2 = helper(value, fn2, checked);
                    if (results2 && results2.length > 0) {
                      results2.slice(alreadyStoredThisValue ? 1 : 0).forEach((r) => out.push(r));
                    }
                  }
                  return out;
                } else {
                  if (fn2(x2)) {
                    return [x2];
                  }
                }
                return null;
              }
              function safeFn(v) {
                try {
                  return fn(v);
                } catch (e) {
                  return false;
                }
              }
              const results = helper(x, safeFn);
              if (results && results.length > 0) {
                return results;
              } else {
                return null;
              }
            }
            module2.exports = findAll;
          }
        });
        var require_float = __commonJS2({
          "src/float.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function float(x) {
              try {
                if (x === "Infinity") {
                  return Infinity;
                }
                if (x === "-Infinity") {
                  return -Infinity;
                }
                const out = JSON.parse(x);
                if (isNumber(out))
                  return out;
                return NaN;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(float);
          }
        });
        var require_floor = __commonJS2({
          "src/floor.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function floor(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.floor(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(floor);
          }
        });
        var require_zeros = __commonJS2({
          "src/zeros.js"(exports2, module2) {
            var isNumber = require_is_number();
            var product = require_product();
            var reshape = require_reshape();
            function zeros(shape) {
              if (isNumber(shape))
                shape = [shape];
              const out = [];
              const n = product(shape);
              for (let i = 0; i < n; i++)
                out.push(0);
              return reshape(out, shape);
            }
            module2.exports = zeros;
          }
        });
        var require_identity = __commonJS2({
          "src/identity.js"(exports2, module2) {
            var assert = require_assert();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var zeros = require_zeros();
            function identity(size) {
              assert(!isUndefined(size), "You must pass an integer greater than 0 (representing the size) into the `identity` function!");
              assert(isNumber(size), "You must pass an integer greater than 0 (representing the size) into the `identity` function!");
              assert(parseInt(size) === size, "You must pass an integer greater than 0 (representing the size) into the `identity` function!");
              assert(size > 0, "You must pass an integer greater than 0 (representing the size) into the `identity` function!");
              const out = zeros([size, size]);
              for (let i = 0; i < size; i++)
                out[i][i] = 1;
              return out;
            }
            module2.exports = identity;
          }
        });
        var require_boolean_values = __commonJS2({
          "src/helpers/boolean-values.js"(exports2, module2) {
            module2.exports = ["true", "false", "yes", "no"];
          }
        });
        var require_null_values = __commonJS2({
          "src/helpers/null-values.js"(exports2, module2) {
            module2.exports = ["null", "none", "nan", "na", "n/a", "", "undefined"];
          }
        });
        var require_infer_type = __commonJS2({
          "src/infer-type.js"(exports2, module2) {
            var apply = require_apply();
            var assert = require_assert();
            var booleanValues = require_boolean_values();
            var cast = require_cast();
            var count = require_count();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var isString2 = require_is_string();
            var nullValues = require_null_values();
            function inferType(arr) {
              if (isDataFrame(arr)) {
                const out = arr.copy();
                const results = inferType(arr.values);
                out.values = results.values;
                return { type: results.type, values: out };
              }
              if (isSeries(arr)) {
                const out = arr.copy();
                const results = inferType(arr.values);
                out.values = results.values;
                return { type: results.type, values: out };
              }
              if (!isArray(arr)) {
                const out = inferType([arr]);
                out.value = out.values[0];
                delete out.values;
                return out;
              }
              assert(isArray(arr), "The `inferType` function only works on arrays, Series, and DataFrames!");
              const types = flatten(arr).map((v) => {
                if (v === void 0)
                  return "null";
                try {
                  if (typeof v === "object") {
                    const temp = new Date(v.toString());
                    if (temp instanceof Date && temp.toString() !== "Invalid Date") {
                      return "date";
                    }
                  }
                } catch (e) {
                }
                if (!isString2(v)) {
                  v = JSON.stringify(v);
                }
                const vLower = v.toLowerCase();
                const vLowerTrimmed = vLower.trim();
                if (nullValues.indexOf(vLowerTrimmed) > -1) {
                  return "null";
                }
                if (booleanValues.indexOf(vLowerTrimmed) > -1) {
                  return "boolean";
                }
                try {
                  const vParsed = JSON.parse(v);
                  if (isNumber(vParsed)) {
                    return "number";
                  }
                  if (typeof vParsed === "object") {
                    if (isArray(vParsed))
                      return "string";
                    return "object";
                  }
                  return "string";
                } catch (e) {
                  const vDate = new Date(v);
                  if (vDate.toString() !== "Invalid Date") {
                    return "date";
                  }
                  return "string";
                }
              });
              const counts = count(types).sort((a, b) => b.count - a.count);
              const primaryType = counts[0].value;
              return { type: primaryType, values: apply(arr, (v) => cast(v, primaryType)) };
            }
            module2.exports = inferType;
          }
        });
        var require_int = __commonJS2({
          "src/int.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function int2(x) {
              try {
                const out = JSON.parse(x);
                if (isNumber(out))
                  return parseInt(out);
                return NaN;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(int2);
          }
        });
        var require_intersect = __commonJS2({
          "src/intersect.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isEqual = require_is_equal();
            var isSeries = require_is_series();
            var set = require_set();
            function intersect() {
              const arrays = Object.values(arguments).map((x) => {
                if (isDataFrame(x) || isSeries(x)) {
                  return set(x.values);
                }
                assert(isArray(x), "The `intersect` function only works on arrays, Series, and DataFrames!");
                return set(x);
              });
              const all = set(arrays);
              return all.filter((v) => {
                return arrays.every((arr) => arr.findIndex((other) => isEqual(other, v)) > -1);
              });
            }
            module2.exports = intersect;
          }
        });
        var require_inverse = __commonJS2({
          "src/inverse.js"(exports2, module2) {
            var add = require_add();
            var assert = require_assert();
            var dot = require_dot();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var scale = require_scale();
            var shape = require_shape();
            function inverse(x) {
              if (isDataFrame(x)) {
                const out = x.copy();
                out.values = inverse(out.values);
                return out;
              }
              assert(isArray(x), "The `inverse` function only works on square 2-dimensional arrays or DataFrames!");
              flatten(x).forEach((v) => assert(isNumber(v), "The array passed into the `inverse` function must contain only numbers!"));
              const xShape = shape(x);
              assert(xShape.length === 2, "The array passed into the `inverse` function must be exactly two-dimensional and square!");
              assert(xShape[0] === xShape[1], "The array passed into the `inverse` function must be exactly two-dimensional and square!");
              assert(xShape[0] >= 0, "The array passed into the `inverse` function must be exactly two-dimensional and square!");
              if (xShape[0] === 0) {
                return x;
              } else if (xShape[0] === 1) {
                assert(x[0][0] !== 0, "This matrix cannot be inverted!");
                return 1 / x[0][0];
              } else if (xShape[0] === 2) {
                const a = x[0][0];
                const b = x[0][1];
                const c = x[1][0];
                const d = x[1][1];
                const det = a * d - b * c;
                assert(det !== 0, "This matrix cannot be inverted!");
                const out = [
                  [d, -b],
                  [-c, a]
                ];
                return scale(out, 1 / det);
              } else if (xShape[0] > 1) {
                const times = (a, b) => isNumber(a) || isNumber(b) ? scale(a, b) : dot(a, b);
                for (let divider = 1; divider < xShape[0] - 1; divider++) {
                  try {
                    const A = x.slice(0, divider).map((row) => row.slice(0, divider));
                    const B = x.slice(0, divider).map((row) => row.slice(divider, xShape[0]));
                    const C = x.slice(divider, xShape[0]).map((row) => row.slice(0, divider));
                    const D = x.slice(divider, xShape[0]).map((row) => row.slice(divider, xShape[0]));
                    const AInv = inverse(A);
                    const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))));
                    const topLeft = add(AInv, times(times(times(times(AInv, B), CompInv), C), AInv));
                    const topRight = times(-1, times(times(AInv, B), CompInv));
                    const bottomLeft = times(-1, times(times(CompInv, C), AInv));
                    const bottomRight = CompInv;
                    const out = topLeft.map((row, i) => row.concat(topRight[i])).concat(bottomLeft.map((row, i) => row.concat(bottomRight[i])));
                    return out;
                  } catch (e) {
                  }
                }
                assert(false, "This matrix cannot be inverted!");
              }
            }
            module2.exports = inverse;
          }
        });
        var require_is_browser = __commonJS2({
          "src/helpers/is-browser.js"(exports2, module2) {
            var isBrowser = new Function(`
    try {
      return this === window
    } catch(e) {}

    try {
      return !!importScripts
    } catch(e){}

    return false
  `);
            module2.exports = isBrowser;
          }
        });
        var require_lerp = __commonJS2({
          "src/lerp.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function lerp(a, b, f) {
              try {
                if (!isNumber(a))
                  return NaN;
                if (!isNumber(b))
                  return NaN;
                if (!isNumber(f))
                  return NaN;
                return f * (b - a) + a;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(lerp);
          }
        });
        var require_log = __commonJS2({
          "src/log.js"(exports2, module2) {
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var vectorize = require_vectorize();
            function log(x, base) {
              try {
                base = isUndefined(base) ? Math.E : base;
                if (!isNumber(x))
                  return NaN;
                if (!isNumber(base))
                  return NaN;
                return Math.log(x) / Math.log(base);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(log);
          }
        });
        var require_median = __commonJS2({
          "src/median.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var sort = require_sort();
            function median(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return median(arr.values);
              }
              assert(isArray(arr), "The `median` function only works on arrays, Series, and DataFrames!");
              try {
                const temp = sort(flatten(arr));
                if (temp.length === 0) {
                  return NaN;
                } else if (temp.length % 2 === 0) {
                  return (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2;
                } else {
                  return temp[parseInt(temp.length / 2)];
                }
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = median;
          }
        });
        var require_mod = __commonJS2({
          "src/mod.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function mod(a, b) {
              try {
                if (!isNumber(a))
                  return NaN;
                if (!isNumber(b))
                  return NaN;
                return a % b;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(mod);
          }
        });
        var require_mode = __commonJS2({
          "src/mode.js"(exports2, module2) {
            var assert = require_assert();
            var count = require_count();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var set = require_set();
            var sort = require_sort();
            function mode(arr) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return mode(arr.values);
              }
              assert(isArray(arr), "The `mode` function only works on arrays, Series, and DataFrames!");
              try {
                if (arr.length === 0)
                  return NaN;
                const temp = flatten(arr);
                if (temp.length === 0)
                  return NaN;
                const counts = {};
                const tempSet = set(temp);
                tempSet.forEach((value) => {
                  counts[value] = count(temp, value);
                });
                const sortedTempSet = sort(tempSet, (a, b) => counts[b] - counts[a]);
                const mostCountedValue = sortedTempSet[0];
                const out = sort(sortedTempSet.filter((value) => counts[value] === counts[mostCountedValue]));
                return out;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = mode;
          }
        });
        var require_normal = __commonJS2({
          "src/normal.js"(exports2, module2) {
            var { random: random2 } = require_random();
            var apply = require_apply();
            var isUndefined = require_is_undefined();
            var ndarray = require_ndarray();
            function helper() {
              const u1 = random2();
              const u2 = random2();
              return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            }
            function normal(shape) {
              if (isUndefined(shape))
                return helper();
              return apply(ndarray(shape), helper);
            }
            module2.exports = normal;
          }
        });
        var require_ones = __commonJS2({
          "src/ones.js"(exports2, module2) {
            var apply = require_apply();
            var ndarray = require_ndarray();
            function ones(shape) {
              return apply(ndarray(shape), () => 1);
            }
            module2.exports = ones;
          }
        });
        var require_permutations = __commonJS2({
          "src/permutations.js"(exports2, module2) {
            var assert = require_assert();
            var flatten = require_flatten();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isNumber = require_is_number();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            function permutations(arr, r) {
              if (isDataFrame(arr) || isSeries(arr)) {
                return permutations(arr.values, r);
              }
              assert(isArray(arr), "The `permutations` function only works on arrays, Series, and DataFrames!");
              if (isUndefined(r))
                r = arr.length;
              assert(isNumber(r), "`r` must be a whole number!");
              arr = flatten(arr);
              if (r > arr.length) {
                return permutations(arr);
              }
              if (r <= 0) {
                return [[]];
              }
              assert(r === parseInt(r), "`r` must be a whole number!");
              if (arr.length < 2)
                return arr;
              const out = [];
              arr.forEach((item, i) => {
                const before = arr.slice(0, i);
                const after = arr.slice(i + 1);
                const others = before.concat(after);
                const children = permutations(others, r - 1);
                children.forEach((child) => {
                  out.push([item].concat(child));
                });
              });
              return out;
            }
            module2.exports = permutations;
          }
        });
        var require_print = __commonJS2({
          "src/print.js"(exports2, module2) {
            var { DataFrame, Series } = require_dataframe();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isJagged = require_is_jagged();
            var isSeries = require_is_series();
            var shape = require_shape();
            function print() {
              Object.keys(arguments).forEach((key) => {
                const x = arguments[key];
                if (isArray(x)) {
                  if (!isJagged(x)) {
                    const xShape = shape(x);
                    if (xShape.length === 1) {
                      new Series(x).print();
                    } else if (xShape.length == 2) {
                      new DataFrame(x).print();
                    } else {
                      console.log(x);
                    }
                  } else {
                    console.log(x);
                  }
                } else if (isDataFrame(x) || isSeries(x)) {
                  x.print();
                } else {
                  console.log(x);
                }
              });
            }
            module2.exports = print;
          }
        });
        var require_remap = __commonJS2({
          "src/remap.js"(exports2, module2) {
            var isArray = require_is_array();
            var isNumber = require_is_number();
            var isUndefined = require_is_undefined();
            var max = require_max();
            var min = require_min();
            var vectorize = require_vectorize();
            var helper = vectorize(function(x, a, b, c, d) {
              try {
                if (![x, a, b, c, d].every((v) => isNumber(v))) {
                  return NaN;
                }
                if (b - a === 0)
                  return NaN;
                return (d - c) * (x - a) / (b - a) + c;
              } catch (e) {
                return NaN;
              }
            });
            function remap(x, a, b, c, d) {
              if (isArray(x) && isUndefined(c) && isUndefined(d)) {
                c = a;
                d = b;
                a = min(x);
                b = max(x);
              }
              return helper(x, a, b, c, d);
            }
            module2.exports = remap;
          }
        });
        var require_round = __commonJS2({
          "src/round.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function round(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.round(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(round);
          }
        });
        var require_sign = __commonJS2({
          "src/sign.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function sign(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                if (x < 0)
                  return -1;
                if (x > 0)
                  return 1;
                return 0;
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(sign);
          }
        });
        var require_sin = __commonJS2({
          "src/sin.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function sin(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.sin(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(sin);
          }
        });
        var require_stdev = __commonJS2({
          "src/stdev.js"(exports2, module2) {
            var std = require_std();
            function stdev(x) {
              return std(x);
            }
            module2.exports = stdev;
          }
        });
        var require_tan = __commonJS2({
          "src/tan.js"(exports2, module2) {
            var isNumber = require_is_number();
            var vectorize = require_vectorize();
            function tan(x) {
              try {
                if (!isNumber(x))
                  return NaN;
                return Math.tan(x);
              } catch (e) {
                return NaN;
              }
            }
            module2.exports = vectorize(tan);
          }
        });
        var require_time = __commonJS2({
          "src/time.js"(exports2, module2) {
            var assert = require_assert();
            var isFunction = require_is_function();
            function timeSync(fn, args) {
              assert(isFunction(fn), "`fn` must be a function!");
              const start = new Date();
              if (args) {
                fn(...args);
              } else {
                fn();
              }
              return new Date() - start;
            }
            async function timeAsync(fn, args) {
              assert(isFunction(fn), "`fn` must be a function!");
              const start = new Date();
              if (args) {
                await fn(...args);
              } else {
                await fn();
              }
              return new Date() - start;
            }
            module2.exports = { timeSync, timeAsync };
          }
        });
        var require_union = __commonJS2({
          "src/union.js"(exports2, module2) {
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var set = require_set();
            function union() {
              return set([...arguments].map((v) => {
                if (isArray(v))
                  return v;
                if (isDataFrame(v))
                  return v.values;
                if (isSeries(v))
                  return v.values;
                return [v];
              }));
            }
            module2.exports = union;
          }
        });
        var require_zip = __commonJS2({
          "src/zip.js"(exports2, module2) {
            var assert = require_assert();
            var isArray = require_is_array();
            var isDataFrame = require_is_dataframe();
            var isSeries = require_is_series();
            var isUndefined = require_is_undefined();
            var max = require_max();
            var range = require_range();
            function zip() {
              const out = [];
              const arrays = Object.values(arguments).map((arr) => {
                if (isDataFrame(arr) || isSeries(arr)) {
                  arr = arr.values;
                }
                assert(isArray(arr), "The `zip` function only works on arrays, Series, and DataFrames!");
                return arr;
              });
              range(0, max(arrays.map((arr) => arr.length))).forEach((i) => {
                const row = [];
                arrays.forEach((arr) => {
                  const value = arr[i];
                  row.push(isUndefined(value) ? void 0 : value);
                });
                out.push(row);
              });
              return out;
            }
            module2.exports = zip;
          }
        });
        var require_src2 = __commonJS2({
          "src/index.js"(exports2, module2) {
            var { copy, decycle } = require_copy();
            var { DataFrame, Series } = require_dataframe();
            var out = {
              abs: require_abs(),
              add: require_add(),
              apply: require_apply(),
              arccos: require_arccos(),
              arcsin: require_arcsin(),
              arctan: require_arctan(),
              argmax: require_argmax(),
              argmin: require_argmin(),
              assert: require_assert(),
              cast: require_cast(),
              ceil: require_ceil(),
              chop: require_chop(),
              clamp: require_clamp(),
              combinations: require_combinations(),
              copy,
              correl: require_correl(),
              cos: require_cos(),
              count: require_count(),
              covariance: require_covariance(),
              DataFrame,
              dataTypes: require_data_types(),
              decycle,
              diff: require_diff(),
              distance: require_distance(),
              divide: require_divide(),
              dot: require_dot(),
              dropMissing: require_drop_missing(),
              dropMissingPairwise: require_drop_missing_pairwise(),
              dropNaN: require_drop_nan(),
              dropNaNPairwise: require_drop_nan_pairwise(),
              dropUndefined: require_drop_undefined(),
              exp: require_exp(),
              factorial: require_factorial(),
              find: require_find(),
              findAll: require_find_all(),
              flatten: require_flatten(),
              float: require_float(),
              floor: require_floor(),
              identity: require_identity(),
              indexOf: require_index_of(),
              inferType: require_infer_type(),
              int: require_int(),
              intersect: require_intersect(),
              inverse: require_inverse(),
              isArray: require_is_array(),
              isBoolean: require_is_boolean(),
              isBrowser: require_is_browser(),
              isDataFrame: require_is_dataframe(),
              isEqual: require_is_equal(),
              isFunction: require_is_function(),
              isJagged: require_is_jagged(),
              isNested: require_is_nested(),
              isNumber: require_is_number(),
              isObject: require_is_object(),
              isSeries: require_is_series(),
              isString: require_is_string(),
              isUndefined: require_is_undefined(),
              lerp: require_lerp(),
              log: require_log(),
              MathError: require_math_error(),
              max: require_max(),
              mean: require_mean(),
              median: require_median(),
              min: require_min(),
              mod: require_mod(),
              mode: require_mode(),
              multiply: require_multiply(),
              ndarray: require_ndarray(),
              normal: require_normal(),
              ones: require_ones(),
              permutations: require_permutations(),
              pow: require_pow(),
              print: require_print(),
              product: require_product(),
              random: require_random().random,
              range: require_range(),
              remap: require_remap(),
              reshape: require_reshape(),
              reverse: require_reverse(),
              round: require_round(),
              scale: require_scale(),
              seed: require_random().seed,
              Series,
              set: require_set(),
              shape: require_shape(),
              shuffle: require_shuffle(),
              sign: require_sign(),
              sin: require_sin(),
              sort: require_sort(),
              sqrt: require_sqrt(),
              std: require_std(),
              stdev: require_stdev(),
              subtract: require_subtract(),
              sum: require_sum(),
              tan: require_tan(),
              time: require_time().timeSync,
              timeSync: require_time().timeSync,
              timeAsync: require_time().timeAsync,
              transpose: require_transpose(),
              union: require_union(),
              variance: require_variance(),
              vectorize: require_vectorize(),
              zeros: require_zeros(),
              zip: require_zip(),
              dump: function() {
                const pub = typeof global !== "undefined" ? global : window;
                if (!pub) {
                  throw new out.MathError("Cannot dump functions into global scope because neither `global` nor `window` exist in the current context!");
                }
                Object.keys(out).forEach((key) => {
                  try {
                    Object.defineProperty(pub, key, {
                      configurable: false,
                      enumerable: true,
                      writable: false,
                      value: out[key]
                    });
                  } catch (e) {
                    pub[key] = out[key];
                  }
                });
              }
            };
            if (typeof module2 !== "undefined") {
              module2.exports = out;
            }
            if (typeof window !== "undefined") {
              window.JSMathTools = out;
            }
          }
        });
        require_src2();
      })();
    }
  });

  // src/index.js
  var require_src = __commonJS({
    "src/index.js"(exports, module) {
      var {
        assert,
        isNumber,
        decycle
      } = require_js_math_tools();
      function makeKey(keyLength, keySeed, charset) {
        if (arguments.length === 2) {
          if (isNumber(arguments[1])) {
            charset = null;
          } else {
            charset = keySeed;
            keySeed = null;
          }
        }
        assert(
          isNumber(keyLength) && int(keyLength) === keyLength,
          "`keyLength` must be an integer!"
        );
        if (keySeed) {
          assert(
            isNumber(keySeed) && int(keySeed) === keySeed,
            "`keySeed` must be an integer!"
          );
          seed(keySeed);
        }
        if (charset) {
          assert(isString(charset), "`charset` must be a string!");
        }
        let out = "";
        charset = charset || "abcdefg1234567890";
        for (let i = 0; i < keyLength; i++) {
          out += charset[int(random() * charset.length)];
        }
        return out;
      }
      function stringify(x, replacer, space) {
        return JSON.stringify(decycle(x), replacer, space);
      }
      var SubscriptionService = class {
        constructor() {
          const self = this;
          self.subscriptions = {};
        }
        on(path, callback) {
          const self = this;
          if (!self.subscriptions[path])
            self.subscriptions[path] = [];
          self.subscriptions[path].push(callback);
          return self;
        }
        off(path, callback) {
          const self = this;
          self.subscriptions[path].splice(
            self.subscriptions[path].indexOf(callback),
            1
          );
          return self;
        }
        run(path, payload) {
          const self = this;
          const callbacks = self.subscriptions[path];
          if (callbacks)
            callbacks.forEach((cb) => cb(payload));
          return self;
        }
      };
      var Drone = class extends SubscriptionService {
        constructor() {
          super();
          const self = this;
          onmessage = (event) => self.run(event.data.path, event.data.payload, event.data.cbid);
        }
        run(path, payload, cbid) {
          const self = this;
          const request = {
            data: payload
          };
          const response = {
            send: function(result) {
              try {
                result = JSON.parse(stringify(result));
              } catch (e) {
              }
              postMessage({
                path: cbid,
                payload: result
              });
            }
          };
          const callbacks = self.subscriptions[path];
          if (callbacks)
            callbacks.forEach((cb) => cb(request, response));
          else
            response.send(null);
          return self;
        }
      };
      var Queen = class extends SubscriptionService {
        constructor(filename, n) {
          super();
          const self = this;
          self.hive = [];
          if (filename) {
            self.addDrones(filename, n || 1);
          }
        }
        addDrone(filename) {
          const self = this;
          const drone = new Worker(filename);
          drone.onmessage = (event) => super.run(event.data.path, event.data.payload);
          self.hive.push(drone);
          return drone;
        }
        addDrones(filename, n) {
          const self = this;
          for (let i = 0; i < n; i++)
            self.addDrone(filename);
          return self;
        }
        removeDrone(drone) {
          const self = this;
          self.hive = self.hive.filter((other) => other !== drone);
          drone.terminate();
          return self;
        }
        removeDrones(drones) {
          const self = this;
          drones.forEach((drone) => self.removeDrone(drone));
          return self;
        }
        run(path, payload) {
          const self = this;
          if (self.hive.length === 0) {
            console.warn(
              "The queen issued a command, but there are no drones in the hive! Use the queen's `addDrone` method to add a drone to the hive! (https://github.com/jrc03c/bee.js)"
            );
            return null;
          }
          return new Promise((resolve, reject) => {
            try {
              try {
                payload = JSON.parse(stringify(payload));
              } catch (e) {
              }
              const results = new Array(self.hive.length);
              const promises = self.hive.map(function(drone, i) {
                return new Promise(function(innerResolve, innerReject) {
                  try {
                    const cbid = makeKey(32);
                    self.on(cbid, (result) => {
                      self.off(cbid, this);
                      results[i] = result;
                      innerResolve();
                    });
                    drone.postMessage({ path, payload, cbid });
                  } catch (e) {
                    innerReject(e);
                  }
                });
              });
              Promise.all(promises).then(() => {
                if (self.hive.length === 1)
                  resolve(results[0]);
                else
                  resolve(results);
              });
            } catch (e) {
              reject(e);
            }
          });
        }
        command(path, payload) {
          const self = this;
          return self.run(path, payload);
        }
        kill() {
          const self = this;
          self.stop();
          self.removeDrones(self.hive);
          return null;
        }
        stop() {
          const self = this;
          self.hive.forEach((drone) => drone.terminate());
          return self;
        }
        terminate() {
          const self = this;
          return self.stop();
        }
      };
      var Bee = { Drone, Queen };
      if (typeof module !== "undefined") {
        module.exports = Bee;
      }
      if (typeof globalThis !== "undefined") {
        globalThis.Bee = Bee;
      }
    }
  });
  require_src();
})();
