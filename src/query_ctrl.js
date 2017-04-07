import {QueryCtrl} from 'app/plugins/sdk';
import './css/query-editor.css!';
import './netxms_objects_list_directive';

export class NetXMSDatasourceQueryCtrl extends QueryCtrl {

  constructor($scope, $injector, uiSegmentSrv)  {
    super($scope, $injector);

    this.scope = $scope;
    this.uiSegmentSrv = uiSegmentSrv;
    this.target.type = this.target.type || 'DCI';
    this.target.alarmSource = this.target.alarmSource;
    this.target.dciTarget = this.target.dciTarget;
    this.target.dci = this.target.dci;
    this.target.legend = this.target.legend || '';
  }

  getObjects() 
  {
    return this.datasource.metricFindQuery('', 'datacollection')
      .then(result => { return result; });
  }

  getDCIs()
  {
    return this.datasource.metricFindQuery({ target: this.target.dciTarget ? this.target.dciTarget.id : 0 }, 'datacollection')
      .then(result => { return result; });
  }

  getSourceObjects()
  {
    return this.datasource.metricFindQuery('', 'alarms')
      .then(result => { return result; });
  }

  toggleEditorMode() {
    this.target.rawQuery = !this.target.rawQuery;
  }

  clearDciField()
  {
    this.target.dci = {};
  }

  onSelectionChange()
  {
    this.panelCtrl.refresh();
  }
}

NetXMSDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';

