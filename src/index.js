import { useElement, useLayout, useEffect, useApp, useConstraints, useRect } from '@nebula.js/stardust';
import { applyExecutionToken, getAutomations } from './services/backend';
import properties from './object-properties';
import extDefinition from './extDefinition'
import data from './data';
import { render } from './root';
import { embed } from '@nebula.js/stardust';
import table from '@nebula.js/sn-table';
import bar from '@nebula.js/sn-bar-chart'

let rendered = false

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
            name: 'barchart',
            load: () => Promise.resolve(bar),
          }
        ],
      });
      const n = e(app)
      

      useEffect(async () => {
        const object = await app.getObject(id)
        const props = await object.getProperties()
        const dimensions = props.qHyperCubeDef.qDimensions
        const measures = props.qHyperCubeDef.qMeasures
        render(app, id, dimensions, measures, element, edit, layout.qHyperCube, n, rect, layout.props.chartType)
      }, [JSON.stringify(toggles), layout.props.chartType]);
    },
  };
}
