"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetXMSDatasource = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NetXMSDatasource = /*#__PURE__*/function () {
  function NetXMSDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, NetXMSDatasource);

    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.sessionId = null;
    this.basicAuth = instanceSettings.basicAuth;
    this.withCredentials = instanceSettings.withCredentials;

    this._request = function (method, url, data, params) {
      var _this = this;

      var options = {
        url: this.url + "/" + url,
        method: method,
        data: data,
        headers: {},
        params: params
      };

      if (this.basicAuth || this.withCredentials) {
        options.withCredentials = true;
      }

      if (this.basicAuth) {
        options.headers["Authorization"] = this.basicAuth;
      }

      if (this.sessionId) options.headers["Session-Id"] = this.sessionId;
      return backendSrv.datasourceRequest(options).then(function (response) {
        var sessionId = null;

        if (typeof response.headers === 'function') {
          sessionId = response.headers("Session-Id");
        } else {
          sessionId = response.headers.get("Session-Id");
        }

        if (sessionId) {
          _this.sessionId = sessionId;
        }

        return response;
      });
    };
  }

  _createClass(NetXMSDatasource, [{
    key: "query",
    value: function query(options) {
      var query = this.buildQueryParameters(options);
      if (query.targets.includes("type\":\"Alarms\"")) var url = "grafana/alarms";else var url = "grafana/datacollection";
      return this._request('GET', url, null, query);
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var _this2 = this;

      return this._request('POST', 'sessions', null, null).then(function (response) {
        if (response.status === 200) {
          _this2._request('DELETE', 'sessions/' + response.data.session, null, null);

          return {
            status: "success",
            message: "Data source is working",
            title: "Success"
          };
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
      var _this3 = this;

      return this._request('GET', 'grafana/' + url, null, options).then(function (result) {
        return _this3.mapToTextValue(result);
      });
    }
  }, {
    key: "mapToTextValue",
    value: function mapToTextValue(result) {
      var map = _lodash["default"].map(result.data, function (d, i) {
        return {
          name: d,
          id: i
        };
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
        from: '"' + options.range.from.toISOString() + '"',
        // dirty hack to be compatible with old API
        to: '"' + options.range.to.toISOString() + '"',
        // dirty hack to be compatible with old API
        targets: JSON.stringify(options.targets)
        /*annotation: {
        },*/

      };
      return parameters;
    }
  }]);

  return NetXMSDatasource;
}();

exports.NetXMSDatasource = NetXMSDatasource;
//# sourceMappingURL=datasource.js.map
