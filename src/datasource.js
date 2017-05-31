import _ from "lodash";

export class NetXMSDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv)
  {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.sessionId = 0;
    this.basicAuth = instanceSettings.basicAuth;
    this.withCredentials = instanceSettings.withCredentials;

    this._request = function(method, url, data, params) {
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
      if (this.sessionId)
        options.headers["Session-Id"] = this.sessionId;

      return backendSrv.datasourceRequest(options).then(response =>
        {
          if (response.headers("Session-Id"))
            this.sessionId = response.headers("Session-Id");
          return response;
        });
    };
  }

  query(options)
  {
    var query = this.buildQueryParameters(options);
    if (query.targets.includes("type\":\"Alarms\""))
      var url = "grafana/alarms";
    else
      var url = "grafana/datacollection";

    return this._request('GET', url, null, query);
  }  

  testDatasource()
  {
    return this._request('POST', 'sessions', null, null).then(response =>
    {
      if (response.status === 200)
      {
        this._request('DELETE', 'sessions/' + response.data.session, null, null);
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

  metricFindQuery(options, url)
  {
    return this._request('GET', 'grafana/' + url, null, options).then(
      result =>
      {
        return this.mapToTextValue(result);
      });
  }

  mapToTextValue(result)
  {
    var map = _.map(result.data, (d, i) => {
      return { name: d, id: i };
    });
    return map.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  buildQueryParameters(options) {
    var parameters = {
      interval: options.intervalMs,
      from: options.range.from,
      to: options.range.to,
      targets: JSON.stringify(options.targets)
      /*annotation: {
      },*/
    };
    return parameters
  }
}