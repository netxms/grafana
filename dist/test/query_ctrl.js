'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetXMSDatasourceQueryCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sdk = require('app/plugins/sdk');

require('./css/query-editor.css!');

require('./netxms_objects_list_directive');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NetXMSDatasourceQueryCtrl = exports.NetXMSDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(NetXMSDatasourceQueryCtrl, _QueryCtrl);

  function NetXMSDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
    _classCallCheck(this, NetXMSDatasourceQueryCtrl);

    var _this = _possibleConstructorReturn(this, (NetXMSDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(NetXMSDatasourceQueryCtrl)).call(this, $scope, $injector));

    _this.scope = $scope;
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.target.type = _this.target.type || 'DCI';
    _this.target.alarmSource = _this.target.alarmSource;
    _this.target.dciTarget = _this.target.dciTarget;
    _this.target.dci = _this.target.dci;
    _this.target.legend = _this.target.legend || '';
    return _this;
  }

  _createClass(NetXMSDatasourceQueryCtrl, [{
    key: 'getObjects',
    value: function getObjects() {
      return this.datasource.metricFindQuery('', 'datacollection').then(function (result) {
        return result;
      });
    }
  }, {
    key: 'getDCIs',
    value: function getDCIs() {
      return this.datasource.metricFindQuery({ target: this.target.dciTarget ? this.target.dciTarget.id : 0 }, 'datacollection').then(function (result) {
        return result;
      });
    }
  }, {
    key: 'getSourceObjects',
    value: function getSourceObjects() {
      return this.datasource.metricFindQuery('', 'alarms').then(function (result) {
        return result;
      });
    }
  }, {
    key: 'toggleEditorMode',
    value: function toggleEditorMode() {
      this.target.rawQuery = !this.target.rawQuery;
    }
  }, {
    key: 'clearDciField',
    value: function clearDciField() {
      this.target.dci = {};
    }
  }, {
    key: 'onSelectionChange',
    value: function onSelectionChange() {
      this.panelCtrl.refresh();
    }
  }]);

  return NetXMSDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

NetXMSDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
//# sourceMappingURL=query_ctrl.js.map
