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
    this.objectList = [];
    this.dciList = [];
    this.objectId = 0;
  }

  getObjects() 
  {
    if (_.isEmpty(this.objectList))
    {
      this.objectList = this.datasource.metricFindQuery('', 'datacollection')
         .then(result => { return result; });
    }
    return this.objectList;
  }

  getDCIs()
  {
    if (this.objectId != this.target.dciTarget.id)
    {
      this.objectId = this.target.dciTarget.id;
      this.dciList = this.datasource.metricFindQuery({ target: this.target.dciTarget ? this.target.dciTarget.id : 0 }, 'datacollection')
         .then(result => { return result; });
    }

    return this.dciList;
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
    this.target.dci = {name: "", id: 0};
  }

  onSelectionChange()
  {
    this.panelCtrl.refresh();
  }
}

NetXMSDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';

