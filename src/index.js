import { useElement, useLayout, useEffect, useApp, useConstraints, useRect } from '@nebula.js/stardust';
import { updateDefaultProps } from './services/backend';
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
        if(typeof layout.props.dimensions === 'undefined' || typeof layout.props.measures === 'undefined') {
          updateDefaultProps(app, id, edit)
        }
        const object = await app.getObject(id)
        const props = await object.getProperties()
        const dimensions = props.qHyperCubeDef.qDimensions.map((d, i) => {
          if (typeof d.qLibraryId === 'undefined') {
            let clone = {...d}
            clone.qscName = layout.qHyperCube.qDimensionInfo[i].qFallbackTitle
            return clone
          }
          else {
            return { qLibraryId: d.qLibraryId, type: 'dimension', qscName: layout.qHyperCube.qDimensionInfo[i].qFallbackTitle }
          }
        })
        const measures = props.qHyperCubeDef.qMeasures.map((m, i) => {
          if (typeof m.qLibraryId === 'undefined') {
            let clone = {...m}
            clone.qscName = layout.qHyperCube.qMeasureInfo[i].qFallbackTitle
            return clone
          }
          else {
            return { qLibraryId: m.qLibraryId, type: 'measure', qscName: layout.qHyperCube.qMeasureInfo[i].qFallbackTitle }
          }
        })
        const selDimensions = typeof layout.props.dimensions !== 'undefined' && layout.props.dimensions !== "[]" ? JSON.parse(layout.props.dimensions) : []
        const selMeasures = typeof layout.props.measures !== 'undefined' && layout.props.measures !== "[]" ? JSON.parse(layout.props.measures) : []
        render(app, id, dimensions, measures, element, edit, n, rect, layout.props.chartType, selDimensions, selMeasures)
      }, [JSON.stringify(layout.props.dimensions),JSON.stringify(layout.props.measures), layout.props.chartType, rect]);
    },
  };
}
