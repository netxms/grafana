import _ from "lodash";

export class NetXMSDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv)
  {
    this.type = instanceSettings.type;
    if (instanceSettings.jsonData.url.endsWith("/"))
      this.url = instanceSettings.jsonData.url.slice(0, (instanceSettings.jsonData.url.length-1));
    else
      this.url = instanceSettings.jsonData.url;
    this.name = instanceSettings.name;
    this.user = instanceSettings.jsonData.user;
    this.password = (instanceSettings.jsonData.password == null) ? "" : instanceSettings.jsonData.password;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.authentication = "{ \"login\": \"" + this.user + "\", \"password\": \"" + this.password + "\" }";
    this.sessionId = 0;
  }

  query(options)
  {
    var query = this.buildQueryParameters(options);
    if (query.targets.includes("type\":\"Alarms\""))
      var url = "alarms";
    else
      var url = "datacollection";

    return this.backendSrv.datasourceRequest(
    {
      url: this.url + '/grafana/' + url,
      method: 'GET',
      params: query,
      headers: { 'X-SessionId': this.sessionId,
                 'X-Login': this.user,
                 'X-Password': this.password }
    }).then(result => {
      if (result.headers("X-SessionId") !== null)
        this.sessionId = result.headers("X-SessionId");
      return result });
  }  

  testDatasource()
  {
    return this.backendSrv.datasourceRequest(
    {
      url: this.url + '/sessions',
      method: 'POST',
      data: this.authentication,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => 
      {
        if (response.status === 200)
        {
          this.backendSrv.datasourceRequest(
          {
            url: this.url + '/sessions/' + response.data.session,
            method: 'DELETE',
            headers: { 'X-SessionId': response.data.session } 
          })
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
    return this.backendSrv.datasourceRequest({
      url: this.url + '/grafana/' + url,
      method: 'GET',
      params: options,
      headers: { 'X-SessionId': this.sessionId,
                 'X-Login': this.user,
                 'X-Password': this.password }
    }).then(this.mapToTextValue);
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