"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCtrl = exports.AnnotationsQueryCtrl = void 0;
Object.defineProperty(exports, "Datasource", {
  enumerable: true,
  get: function get() {
    return _datasource.NetXMSDatasource;
  }
});
Object.defineProperty(exports, "QueryCtrl", {
  enumerable: true,
  get: function get() {
    return _query_ctrl.NetXMSDatasourceQueryCtrl;
  }
});
exports.QueryOptionsCtrl = void 0;

var _datasource = require("./datasource");

var _query_ctrl = require("./query_ctrl");

require("./netxms_objects_list_directive");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetXMSConfigCtrl = function NetXMSConfigCtrl() {
  _classCallCheck(this, NetXMSConfigCtrl);
};

exports.ConfigCtrl = NetXMSConfigCtrl;
NetXMSConfigCtrl.templateUrl = 'partials/config.html';

var NetXMSQueryOptionsCtrl = function NetXMSQueryOptionsCtrl() {
  _classCallCheck(this, NetXMSQueryOptionsCtrl);
};

exports.QueryOptionsCtrl = NetXMSQueryOptionsCtrl;
NetXMSQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

var NetXMSAnnotationsQueryCtrl = function NetXMSAnnotationsQueryCtrl() {
  _classCallCheck(this, NetXMSAnnotationsQueryCtrl);
};

exports.AnnotationsQueryCtrl = NetXMSAnnotationsQueryCtrl;
NetXMSAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
//# sourceMappingURL=module.js.map
