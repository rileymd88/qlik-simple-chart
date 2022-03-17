import React, {  useEffect } from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@material-ui/core';
import TableChartIcon from '@mui/icons-material/TableChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import { updateChart } from '../services/backend';



export default function ChartPicker({ app, id, edit, chartType }) {
  
  useEffect(async () => {

  }, []);

  const ChartPickerContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    minHeight: '40px',
    maxHeight: '40px'
  });


  return (
    <ChartPickerContainer>
      <IconButton onClick={()=>updateChart(app, id, edit, 'table')}>
        <TableChartIcon sx={chartType === 'table' ? {color: 'green'} : {color: 'gray'}}></TableChartIcon>
      </IconButton>
      <IconButton onClick={()=>updateChart(app, id, edit, 'barchart')}>
        <BarChartIcon sx={chartType === 'barchart' ? {color: 'green'} : {color: 'gray'}}></BarChartIcon>
      </IconButton>
    </ChartPickerContainer>
  );
}