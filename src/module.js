import {NetXMSDatasource} from './datasource';
import {NetXMSDatasourceQueryCtrl} from './query_ctrl';
import './netxms_objects_list_directive';

class NetXMSConfigCtrl {}
NetXMSConfigCtrl.templateUrl = 'partials/config.html';

class NetXMSQueryOptionsCtrl {}
NetXMSQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

class NetXMSAnnotationsQueryCtrl {}
NetXMSAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html'

export {
  NetXMSDatasource as Datasource,
  NetXMSDatasourceQueryCtrl as QueryCtrl,
  NetXMSConfigCtrl as ConfigCtrl,
  NetXMSQueryOptionsCtrl as QueryOptionsCtrl,
  NetXMSAnnotationsQueryCtrl as AnnotationsQueryCtrl
};