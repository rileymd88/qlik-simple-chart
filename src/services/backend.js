export const getMeasures = (app) => {
  return new Promise(async function (resolve, reject) {
    try {
      let params = {
        "qProp": {
          "qInfo": {
            "qType": "MeasureList"
          },
          "qMeasureListDef": {
            "qType": "measure",
            "qData": {
              "title": "/title",
              "tags": "/tags"
            }
          }
        }
      };
      let measureObjects = await app.createSessionObject(params);
      let measuresLayout = await measureObjects.getLayout();
      return resolve(measuresLayout.qMeasureList.qItems.map(function (item) {
        return { "id": item.qInfo.qId, "name": item.qMeta.title, "checked": false };
      }));
    }
    catch (err) {
      reject(err);
    }
  })
}

export const getDimensions = (app) => {
  return new Promise(async function (resolve, reject) {
    try {
      let params = {
        "qProp": {
          "qInfo": {
            "qType": "DimensionList"
          },
          "qDimensionListDef": {
            "qType": "dimension",
            "qData": {
              "title": "/title",
              "tags": "/tags"
            }
          }
        }
      };
      let dimensionObjects = await app.createSessionObject(params);
      let dimensionsLayout = await dimensionObjects.getLayout();
      return resolve(dimensionsLayout.qDimensionList.qItems.map(function (item) {
        return { "id": item.qInfo.qId, "name": item.qMeta.title, "checked": false };
      }));
    }
    catch (err) {
      reject(err);
    }
  });
};

export const getMasterItem = (app, id, type) => {
  return new Promise(async function (resolve, reject) {
    try {
      if (type === 'dimension') {
        const object = await app.getDimension(id)
        resolve(await object.getProperties())
      }
      else {
        const object = await app.getMeasure(id)
        resolve(await object.getProperties())
      }
    }
    catch (err) {
      reject(err)
    }
  })
}

export const setFields = async (app, id, type, edit, fields) => {
  const object = await app.getObject(id)
  const softPatch = edit === false
  let fieldPath
  if (type === 'dimension') {
    fieldPath = 'qDimensions'
  }
  else {
    fieldPath = 'qMeasures'
  }
  const finalFields = fields.map((f) => {
    return { qLibraryId: f.id, qType: type }
  })
  try {
    const patchParams = {
      qSoftPatch: softPatch,
      qPatches: [{
        qPath: `/qHyperCubeDef/${fieldPath}`,
        qOp: 'replace',
        qValue: JSON.stringify(finalFields)
      }]
    }
    await object.applyPatches(patchParams)
  }
  catch (e) {
    console.info('Set fields error', e)
  }
}


export const updateField = async (app, id, type, edit, index, useInChart) => {
  const object = await app.getObject(id)
  const props = await object.getProperties()
  const softPatch = edit === false
  let fieldPath
  if (type === 'dimension') {
    fieldPath = 'qDimensions'
  }
  else {
    fieldPath = 'qMeasures'
  }
  let finalPath
  let finalValue
  if(typeof props.qHyperCubeDef[fieldPath][index].qDef.useInChart !== 'undefined') {
    finalPath = 'qDef/useInChart'
    finalValue = useInChart
  }
  else {
    finalPath = 'qDef'
    finalValue = {...props.qHyperCubeDef[fieldPath][index].qDef}
    finalValue.useInChart = useInChart
  }
  try {
    const patchParams = {
      qSoftPatch: softPatch,
      qPatches: [{
        qPath: `/qHyperCubeDef/${fieldPath}/${index}/${finalPath}`,
        qOp: 'replace',
        qValue: JSON.stringify(finalValue)
      }]
    }
    await object.applyPatches(patchParams)
  }
  catch (e) {
    console.info('Update field error', e)
  }
}

export const updateChart = async (app, id, edit, chartType) => {
  const object = await app.getObject(id)
  const softPatch = edit === false
  try {
    const patchParams = {
      qSoftPatch: softPatch,
      qPatches: [{
        qPath: `/props/chartType`,
        qOp: 'replace',
        qValue: JSON.stringify(chartType)
      }]
    }
    await object.applyPatches(patchParams)
  }
  catch (e) {
    console.info('Uh oh! There was an error')
  }
}
