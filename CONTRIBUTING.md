# Development instructions

1. Clone the repository to your `$GRAFANA_HOME/data/plugins/datasources` directory
1. run `yarn` to download and install the required dependencies
1. run `yarn grunt` to package everything into dist/ folder
1. add `allow_loading_unsigned_plugins = radensolutions-netxms-datasource` to grafana.ini
1. restart Grafana

# Publishing

Note: all command should be run in root folder

1. `set -x GRAFANA_API_KEY …`
1. `yarn grunt`
1. `npx @grafana/toolkit plugin:sign`
1. `rm -rf radensolutions-netxms-datasource radensolutions-netxms-datasource-*.zip`
1. `cp -R dist radensolutions-netxms-datasource`
1. `zip radensolutions-netxms-datasource-(grep version dist/plugin.json | cut -d\" -f4).zip radensolutions-netxms-datasource -r`
1. upload to https://grafana.com/ -> My Plugins
