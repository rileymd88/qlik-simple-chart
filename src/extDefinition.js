
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
    defaultValue: 'bar',
    options: [
      { value: 'bar', label: 'Bar chart' },
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
        min: 0,
        items: {
          useInChart: useInChart
        }
      },
      measures: {
        uses: 'measures',
        min: 0,
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
