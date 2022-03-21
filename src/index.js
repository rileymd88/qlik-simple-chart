import { useElement, useLayout, useEffect, useApp, useConstraints, useRect } from '@nebula.js/stardust';
import properties from './object-properties';
import extDefinition from './extDefinition'
import data from './data';
import { render } from './root';
import { embed } from '@nebula.js/stardust';
import table from '@nebula.js/sn-table';
import bar from '@nebula.js/sn-bar-chart'
import pie from '@nebula.js/sn-pie-chart'
import line from '@nebula.js/sn-line-chart';
import kpi from '@nebula.js/sn-kpi'
import histogram from '@nebula.js/sn-histogram'
import sankey from '@nebula.js/sn-sankey-chart'
import combo from '@nebula.js/sn-combo-chart'
import bullet from '@nebula.js/sn-bullet-chart'
import funnel from '@nebula.js/sn-funnel-chart'
import grid from '@nebula.js/sn-grid-chart'
import box from '@nebula.js/sn-boxplot'
import mekko from '@nebula.js/sn-mekko-chart'
import scatter from '@nebula.js/sn-scatter-plot'
import waterfall from '@nebula.js/sn-waterfall'

export default function supernova() {
  return {
    qae: {
      properties,
      data,
    },
    component()  {
      const app = useApp()
      const element = useElement()
      const layout = useLayout()
      const id = layout.qInfo.qId
      const { active } = useConstraints()
      const edit = active
      const rect = useRect()
      const toggles = layout.qHyperCube.qDimensionInfo.map(d=>d.useInChart).concat(layout.qHyperCube.qMeasureInfo.map(m=>m.useInChart))
      const e = embed.createConfiguration({
        types: [
          {
            name: 'table',
            load: () => Promise.resolve(table),
          },
          {
            name: 'combo',
            load: () => Promise.resolve(combo),
          },
          {
            name: 'bar',
            load: () => Promise.resolve(bar),
          },
          {
            name: 'pie',
            load: () => Promise.resolve(pie),
          },
          {
            name: 'line',
            load: () => Promise.resolve(line),
          },
          {
            name: 'kpi',
            load: () => Promise.resolve(kpi),
          },
          {
            name: 'sankey',
            load: () => Promise.resolve(sankey),
          },
          {
            name: 'histogram',
            load: () => Promise.resolve(histogram),
          },
          {
            name: 'bullet',
            load: () => Promise.resolve(bullet),
          },
          {
            name: 'funnel',
            load: () => Promise.resolve(funnel),
          },
          {
            name: 'grid',
            load: () => Promise.resolve(grid),
          },
          {
            name: 'box',
            load: () => Promise.resolve(box),
          },
          {
            name: 'mekko',
            load: () => Promise.resolve(mekko),
          },
          {
            name: 'scatter',
            load: () => Promise.resolve(scatter),
          },
          {
            name: 'waterfall',
            load: () => Promise.resolve(waterfall),
          },
        ],
      });
      const n = e(app)
      

      useEffect(async () => {
        const object = await app.getObject(id)
        const props = await object.getProperties()
        const dimensions = props.qHyperCubeDef.qDimensions
        const measures = props.qHyperCubeDef.qMeasures
        render(app, id, dimensions, measures, element, edit, layout.qHyperCube, n, rect, layout.props.chartType)
      }, [JSON.stringify(toggles), layout.props.chartType, rect]);
    },
  };
}
