"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSocketIO = void 0;

var _react = require("react");

var _useWebsocket = require("./use-websocket");

var _constants = require("./constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyEvent = {
  type: 'empty',
  payload: null
};

var getSocketData = function getSocketData(event) {
  if (!event || !event.data) {
    return emptyEvent;
  }

  var match = event.data.match(/\[.*]/);

  if (!match) {
    return emptyEvent;
  }

  var data = JSON.parse(match);

  if (!Array.isArray(data) || !data[1]) {
    return emptyEvent;
  }

  return {
    type: data[0],
    payload: data[1]
  };
};

var useSocketIO = function useSocketIO(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_OPTIONS;
  var optionsWithSocketIO = (0, _react.useMemo)(function () {
    return _objectSpread({}, options, {
      fromSocketIO: true
    });
  }, []);

  var _useWebSocket = (0, _useWebsocket.useWebSocket)(url, optionsWithSocketIO),
      _useWebSocket2 = _slicedToArray(_useWebSocket, 3),
      sendMessage = _useWebSocket2[0],
      lastMessage = _useWebSocket2[1],
      readyStateFromUrl = _useWebSocket2[2];

  return [sendMessage, (0, _react.useMemo)(function () {
    return getSocketData(lastMessage);
  }, [lastMessage]), readyStateFromUrl];
};

exports.useSocketIO = useSocketIO;