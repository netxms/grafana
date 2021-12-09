# Grafana datasource for NetXMS open source monitoring system

![Screenshot](https://raw.githubusercontent.com/netxms/grafana/master/src/img/grafana-screen.png)

[Issue tracker](https://track.radensolutions.com/)

### The datasource currently provides the following functionality:

-   Visualisation of configured data collection items for objects in graphs and tables
-   Listing of active alarms on a general or a per object basis

### Installation instructions:

1. Deploy netxms-websvc.war to any Java Servlet container of you liking (Jetty9, for example)
1. Make sure API is working by requesting `/info` page with your browser

Using grafana-cli:

1. `grafana-cli install radensolutions-netxms-datasource`
1. Restart Grafana server

Manually:

1. Clone the repository to your `$GRAFANA_HOME/data/plugins/datasources` directory
1. Restart Grafana server

### Configuration

1. Login to your Grafana web interface
1. Add the NetXMS datasource in the Data Sources section
1. Specify API endpoint
1. Select either "Basic Auth" in the "Auth" section or "With Credentials" if "Browser" access is used
