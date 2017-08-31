'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fetchAndUpdateFlow = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return agent.downloadAndUpdatePackage(params.downloadUrl);

          case 2:
            _context.next = 4;
            return agent.restartService();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchAndUpdateFlow(_x) {
    return _ref.apply(this, arguments);
  };
}();

var startup = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var ret;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            device.commandCallback = function (msg, flags) {
              console.log(msg, flags);
              console.log('msg actoin----------------------', msg, flags);

              switch (msg.action) {
                case 'update-flow':
                  fetchAndUpdateFlow(msg.parameters);
                  break;
                case 'restart':
                  agent.restartService();
                  break;
                case 'shutdown':
                  agent.shutdownService();
                  break;
                default:
                  break;
              }
            };
            device.listenCommands();
            _context2.next = 4;
            return agent.startService();

          case 4:
            ret = _context2.sent;

            console.log('agent started up');

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function startup() {
    return _ref2.apply(this, arguments);
  };
}();

var _modeDevice = require('mode-device');

var _modeDevice2 = _interopRequireDefault(_modeDevice);

var _enebularRuntimeAgent = require('enebular-runtime-agent');

var _enebularRuntimeAgent2 = _interopRequireDefault(_enebularRuntimeAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    DEVICE_ID = _process$env.DEVICE_ID,
    DEVICE_API_KEY = _process$env.DEVICE_API_KEY;


var device = new _modeDevice2.default(DEVICE_ID, DEVICE_API_KEY);
var agent = new _enebularRuntimeAgent2.default({
  command: 'npm',
  args: ['run', 'start'],
  pkgDir: process.env.NODE_RED_DIR
});

if (require.main === module) {
  console.log('haro----------------------');
  startup();
} else {
  console.log('nooooaro----------------------');
}