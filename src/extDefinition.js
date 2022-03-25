


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

  var dimensions = {
    label: 'Chart type',
    component: 'expression',
    type: 'string',
    ref: 'props.dimensions',
    defaultValue: '[]',
    show: () => {
      return false
    }
  }

  var measures = {
    label: 'Chart type',
    component: 'expression',
    type: 'string',
    ref: 'props.measures',
    defaultValue: '[]',
    show: () => {
      return false
    }
  }
  
  var settings = {
    type: "items",
    label: "Settings",
    component: "items",
    items: {
      chartType: chartType,
      dimensions: dimensions,
      measures: measures
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
      },
      measures: {
        uses: 'measures',
        min: 0,
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
