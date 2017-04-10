"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetXMSDatasource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetXMSDatasource = exports.NetXMSDatasource = function () {
  function NetXMSDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, NetXMSDatasource);

    this.type = instanceSettings.type;
    if (instanceSettings.jsonData.url.endsWith("/")) this.url = instanceSettings.jsonData.url.slice(0, instanceSettings.jsonData.url.length - 1);else this.url = instanceSettings.jsonData.url;
    this.name = instanceSettings.name;
    this.user = instanceSettings.jsonData.user;
    this.password = instanceSettings.jsonData.password == null ? "" : instanceSettings.jsonData.password;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.authentication = "{ \"login\": \"" + this.user + "\", \"password\": \"" + this.password + "\" }";
    this.sessionId = 0;
  }

  _createClass(NetXMSDatasource, [{
    key: "query",
    value: function query(options) {
      var _this = this;

      var query = this.buildQueryParameters(options);
      if (query.targets.includes("type\":\"Alarms\"")) var url = "alarms";else var url = "datacollection";

      return this.backendSrv.datasourceRequest({
        url: this.url + '/grafana/' + url,
        method: 'GET',
        params: query,
        headers: { 'X-SessionId': this.sessionId,
          'X-Login': this.user,
          'X-Password': this.password }
      }).then(function (result) {
        if (result.headers("X-SessionId") !== null) _this.sessionId = result.headers("X-SessionId");
        return result;
      });
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var _this2 = this;

      return this.backendSrv.datasourceRequest({
        url: this.url + '/sessions',
        method: 'POST',
        data: this.authentication,
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        if (response.status === 200) {
          _this2.backendSrv.datasourceRequest({
            url: _this2.url + '/sessions/' + response.data.session,
            method: 'DELETE',
            headers: { 'X-SessionId': response.data.session }
          });
          return { status: "success", message: "Data source is working", title: "Success" };
        }
      });
    }

    /*
     * Not implemented yet
     */
    /*annotationQuery(options) {
      var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
      var annotationQuery = {
        range: options.range,
        annotation: {
          name: options.annotation.name,
          datasource: options.annotation.datasource,
          enable: options.annotation.enable,
          iconColor: options.annotation.iconColor,
          query: query
        },
        rangeRaw: options.rangeRaw
      };
       return this.backendSrv.datasourceRequest({
        url: this.url + '/annotations',
        method: 'POST',
        data: annotationQuery
      }).then(result => {
        return result.data;
      });
    }*/

  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(options, url) {
      return this.backendSrv.datasourceRequest({
        url: this.url + '/grafana/' + url,
        method: 'GET',
        params: options,
        headers: { 'X-SessionId': this.sessionId,
          'X-Login': this.user,
          'X-Password': this.password }
      }).then(this.mapToTextValue);
    }
  }, {
    key: "mapToTextValue",
    value: function mapToTextValue(result) {
      var map = _lodash2.default.map(result.data, function (d, i) {
        return { name: d, id: i };
      });
      return map.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
  }, {
    key: "buildQueryParameters",
    value: function buildQueryParameters(options) {
      var parameters = {
        interval: options.intervalMs,
        from: options.range.from,
        to: options.range.to,
        targets: JSON.stringify(options.targets)
        /*annotation: {
        },*/
      };
      return parameters;
    }
  }]);

  return NetXMSDatasource;
}();
//# sourceMappingURL=datasource.js.map