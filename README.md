# Simple chart for Qlik Sense

# Release Notes
* 1.0.0
  * First release

# Developing the extension
1. Clone the repository
2. In the package.json file replace `nebula sense --ext src/extDefinition.js --meta ./meta.json && cd ../ && python build.py extension` with `nebula sense --ext src/extDefinition.js --meta ./meta.json` 
2. Run `npm i`
3. Run `npm run build`
4. Run `npm run sense`
5. Then zip the contents in the folder qlik-simple-chart-ext and then upload as an extension

