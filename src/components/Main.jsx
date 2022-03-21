import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import List from './List'
import Chart from './Chart'
import ChartDrawer from "./ChartDrawer";
import { selectOpen } from '../states/mainSlice';

const RowContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const ColumnContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export default function Main({ app, id, dimensions, measures, element, edit, hypercube, n, rect, chartType }) {
  const open = useSelector(selectOpen)
  const dimensionsFilterd = dimensions.filter(d => d.qDef.useInChart).map((d)=>{
    if(typeof d.qLibraryId === 'undefined') {
      return d
    }
    else {
      return {qLibraryId: d.qLibraryId, type: 'dimension'}
    }
    
  })
  const measuresFilterd = measures.filter(m => m.qDef.useInChart).map((m)=>{
    if(typeof m.qLibraryId === 'undefined') {
      return m
    }
    else {
      return {qLibraryId: m.qLibraryId, type: 'measure'}
    }
  })
  const fields = dimensionsFilterd.concat(measuresFilterd)
  
  

  useEffect(async () => {

  }, []);


  return (
    <RowContainer>
      <ChartDrawer chartType={chartType}></ChartDrawer>
      <ColumnContainer id='test' sx={{ width: '30%' }}>
        <List app={app} id={id} type='dimension' fields={dimensions} edit={edit} hypercube={hypercube}></List>
        <List app={app} id={id} type='measure' fields={measures} edit={edit} hypercube={hypercube}></List>
      </ColumnContainer>
      <Chart n={n} rect={rect} fields={fields} chartType={chartType} sx={{ width: '70%' }}></Chart>

    </RowContainer>
  );
}