'use strict';

System.register(['./datasource', './query_ctrl', './netxms_objects_list_directive'], function (_export, _context) {
  "use strict";

  var NetXMSDatasource, NetXMSDatasourceQueryCtrl, NetXMSConfigCtrl, NetXMSQueryOptionsCtrl, NetXMSAnnotationsQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      NetXMSDatasource = _datasource.NetXMSDatasource;
    }, function (_query_ctrl) {
      NetXMSDatasourceQueryCtrl = _query_ctrl.NetXMSDatasourceQueryCtrl;
    }, function (_netxms_objects_list_directive) {}],
    execute: function () {
      _export('ConfigCtrl', NetXMSConfigCtrl = function NetXMSConfigCtrl() {
        _classCallCheck(this, NetXMSConfigCtrl);
      });

      NetXMSConfigCtrl.templateUrl = 'partials/config.html';

      _export('QueryOptionsCtrl', NetXMSQueryOptionsCtrl = function NetXMSQueryOptionsCtrl() {
        _classCallCheck(this, NetXMSQueryOptionsCtrl);
      });

      NetXMSQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export('AnnotationsQueryCtrl', NetXMSAnnotationsQueryCtrl = function NetXMSAnnotationsQueryCtrl() {
        _classCallCheck(this, NetXMSAnnotationsQueryCtrl);
      });

      NetXMSAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

      _export('Datasource', NetXMSDatasource);

      _export('QueryCtrl', NetXMSDatasourceQueryCtrl);

      _export('ConfigCtrl', NetXMSConfigCtrl);

      _export('QueryOptionsCtrl', NetXMSQueryOptionsCtrl);

      _export('AnnotationsQueryCtrl', NetXMSAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
