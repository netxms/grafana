'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsQueryCtrl = exports.QueryOptionsCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = require('./datasource');

var _query_ctrl = require('./query_ctrl');

require('./netxms_objects_list_directive');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetXMSConfigCtrl = function NetXMSConfigCtrl() {
  _classCallCheck(this, NetXMSConfigCtrl);
};

NetXMSConfigCtrl.templateUrl = 'partials/config.html';

var NetXMSQueryOptionsCtrl = function NetXMSQueryOptionsCtrl() {
  _classCallCheck(this, NetXMSQueryOptionsCtrl);
};

NetXMSQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

var NetXMSAnnotationsQueryCtrl = function NetXMSAnnotationsQueryCtrl() {
  _classCallCheck(this, NetXMSAnnotationsQueryCtrl);
};

NetXMSAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

exports.Datasource = _datasource.NetXMSDatasource;
exports.QueryCtrl = _query_ctrl.NetXMSDatasourceQueryCtrl;
exports.ConfigCtrl = NetXMSConfigCtrl;
exports.QueryOptionsCtrl = NetXMSQueryOptionsCtrl;
exports.AnnotationsQueryCtrl = NetXMSAnnotationsQueryCtrl;
//# sourceMappingURL=module.js.map
