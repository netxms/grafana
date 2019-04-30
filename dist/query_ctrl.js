'use strict';

System.register(['app/plugins/sdk', './css/query-editor.css!', './netxms_objects_list_directive'], function (_export, _context) {
  "use strict";

  var QueryCtrl, _createClass, NetXMSDatasourceQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }, function (_cssQueryEditorCss) {}, function (_netxms_objects_list_directive) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('NetXMSDatasourceQueryCtrl', NetXMSDatasourceQueryCtrl = function (_QueryCtrl) {
        _inherits(NetXMSDatasourceQueryCtrl, _QueryCtrl);

        function NetXMSDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
          _classCallCheck(this, NetXMSDatasourceQueryCtrl);

          var _this = _possibleConstructorReturn(this, (NetXMSDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(NetXMSDatasourceQueryCtrl)).call(this, $scope, $injector));

          _this.scope = $scope;
          _this.uiSegmentSrv = uiSegmentSrv;
          _this.target.type = _this.target.type || 'DCI';
          _this.target.alarmSource = _this.target.alarmSource;
          console.log(_this.target);
          _this.target.dciTarget = _this.target.dciTarget;
          _this.target.dci = _this.target.dci;
          _this.target.legend = _this.target.legend || '';
          _this.objectList = [];
          _this.dciList = [];
          _this.objectId = 0;
          return _this;
        }

        _createClass(NetXMSDatasourceQueryCtrl, [{
          key: 'getObjects',
          value: function getObjects() {
            if (_.isEmpty(this.objectList)) {
              this.objectList = this.datasource.metricFindQuery('', 'datacollection').then(function (result) {
                return result;
              });
            }
            return this.objectList;
          }
        }, {
          key: 'getDCIs',
          value: function getDCIs() {
            if (this.objectId != this.target.dciTarget.id) {
              this.objectId = this.target.dciTarget.id;
              this.dciList = this.datasource.metricFindQuery({ target: this.target.dciTarget ? this.target.dciTarget.id : 0 }, 'datacollection').then(function (result) {
                return result;
              });
            }

            return this.dciList;
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
            this.target.dci = { name: "", id: 0 };
          }
        }, {
          key: 'onSelectionChange',
          value: function onSelectionChange() {
            console.log("change");
            this.panelCtrl.refresh();
          }
        }]);

        return NetXMSDatasourceQueryCtrl;
      }(QueryCtrl));

      _export('NetXMSDatasourceQueryCtrl', NetXMSDatasourceQueryCtrl);

      NetXMSDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
