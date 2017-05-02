# Grafana datasource for NetXMS open source monitoring system

![Alt text](https://raw.githubusercontent.com/netxms/grafana/master/src/img/grafana-screen.png)

We have finally developed a datasource that provides the possibility to create beautiful graphs using Grafana!
The datasource is in active development, to report bugs or create feature suggestions, please visit [our issue tracker](https://track.radensolutions.com/)

### The datasource currently provides the following functionality:
- Visualisation of configured data collection items for objects in graphs and tables
- Listing of active alarms on a general or a per object basis

### Installation instructions:
1. Clone the repository to your ```GRAFANA_HOME/data/plugins/datasources``` directory
2. Restart your Grafana server
3. Login to your Grafana web interface and add the NetXMS datasource in the Data Sources section

### Development instructions:
1. Clone the repository to your ```GRAFANA_HOME/data/plugins/datasources``` directory
2. run ```npm install``` to download and install the required dependencies
3. run ```grunt``` to update for changes in the source
