
  var useInChart = {
    ref: "qDef.useInChart",
    label: "Use in chart",
    component: 'switch',
    type: "boolean",
    options: [{
      value: false,
      label: "Off"
    }, {
      value: true,
      label: "On"
    }
    ],
    defaultValue: true
  };

  var chartType = {
    label: 'Chart type',
    component: 'expression-with-dropdown',
    dropdownOnly: true,
    type: 'string',
    ref: 'props.chartType',
    defaultValue: 'barchart',
    options: [
      { value: 'barchart', label: 'Barchart' },
      { value: 'table', label: 'Table' },
    ]
  }
  
  var settings = {
    type: "items",
    label: "Settings",
    component: "items",
    items: {
      chartType: chartType
    }
  } 

export default {
  definition: {
    type: 'items',
    component: 'accordion',
    items: {
      dimensions: {
        uses: 'dimensions',
        items: {
          useInChart: useInChart
        }
      },
      measures: {
        uses: 'measures',
        items: {
          useInChart: useInChart
        }
      },
      settings: settings
    },
  },
  support: {
    export: false,
    exportData: false,
    snapshot: false,
    viewData: false,
  },
};
