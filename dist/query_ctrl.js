"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetXMSDatasourceQueryCtrl = void 0;

var _sdk = require("app/plugins/sdk");

require("./css/query-editor.css!");

require("./netxms_objects_list_directive");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NetXMSDatasourceQueryCtrl = /*#__PURE__*/function (_QueryCtrl) {
  _inherits(NetXMSDatasourceQueryCtrl, _QueryCtrl);

  var _super = _createSuper(NetXMSDatasourceQueryCtrl);

  function NetXMSDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
    var _this;

    _classCallCheck(this, NetXMSDatasourceQueryCtrl);

    _this = _super.call(this, $scope, $injector);
    _this.scope = $scope;
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.target.type = _this.target.type || 'DCI';
    _this.target.alarmSource = _this.target.alarmSource;
    _this.target.dciTarget = _this.target.dciTarget;
    _this.target.dci = _this.target.dci;
    _this.target.legend = _this.target.legend || '';
    _this.objectList = [];
    _this.dciList = [];
    _this.objectId = 0;
    return _this;
  }

  _createClass(NetXMSDatasourceQueryCtrl, [{
    key: "getObjects",
    value: function getObjects() {
      if (_.isEmpty(this.objectList)) {
        this.objectList = this.datasource.metricFindQuery('', 'datacollection').then(function (result) {
          return result;
        });
      }

      return this.objectList;
    }
  }, {
    key: "getDCIs",
    value: function getDCIs() {
      if (this.objectId != this.target.dciTarget.id) {
        this.objectId = this.target.dciTarget.id;
        this.dciList = this.datasource.metricFindQuery({
          target: this.target.dciTarget ? this.target.dciTarget.id : 0
        }, 'datacollection').then(function (result) {
          return result;
        });
      }

      return this.dciList;
    }
  }, {
    key: "getSourceObjects",
    value: function getSourceObjects() {
      return this.datasource.metricFindQuery('', 'alarms').then(function (result) {
        return result;
      });
    }
  }, {
    key: "toggleEditorMode",
    value: function toggleEditorMode() {
      this.target.rawQuery = !this.target.rawQuery;
    }
  }, {
    key: "clearDciField",
    value: function clearDciField() {
      this.target.dci = {
        name: "",
        id: 0
      };
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange() {
      this.panelCtrl.refresh();
    }
  }]);

  return NetXMSDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

exports.NetXMSDatasourceQueryCtrl = NetXMSDatasourceQueryCtrl;
NetXMSDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
//# sourceMappingURL=query_ctrl.js.map
