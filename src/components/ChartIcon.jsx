import React from 'react';
import { IconButton } from '@material-ui/core';
import TableChartIcon from '@mui/icons-material/TableChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import MultilineChartIcon from '@mui/icons-material/MultilineChart'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import Filter1Icon from '@mui/icons-material/Filter1'
import GridViewIcon from '@mui/icons-material/GridView'
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AirIcon from '@mui/icons-material/Air';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

export default function ChartIcon({ chartType })  {

  const getIcon = () => {
    let icon
    if(chartType === 'table') {
      icon = <TableChartIcon fontSize='medium' sx={{ color: 'gray' }}></TableChartIcon>
    }
    if(chartType === 'bar') {
      icon = <BarChartIcon fontSize='medium' sx={{ color: 'gray' }}></BarChartIcon>
    }
    if(chartType === 'pie') {
      icon = <PieChartIcon fontSize='medium' sx={{ color: 'gray' }}></PieChartIcon>
    }
    if(chartType === 'combo') {
      icon = <MultilineChartIcon fontSize='medium' sx={{ color: 'gray' }}></MultilineChartIcon>
    }
    if(chartType === 'line') {
      icon = <ShowChartIcon fontSize='medium' sx={{ color: 'gray' }}></ShowChartIcon>
    }
    if(chartType === 'kpi') {
      icon = <Filter1Icon fontSize='medium' sx={{ color: 'gray' }}></Filter1Icon>
    }
    if(chartType === 'sankey') {
      icon = <LooksOneIcon fontSize='medium' sx={{ color: 'gray' }}></LooksOneIcon>
    }
    if(chartType === 'grid') {
      icon = <GridViewIcon fontSize='medium' sx={{ color: 'gray' }}></GridViewIcon>
    }
    if(chartType === 'bullet') {
      icon = <AlignVerticalCenterIcon fontSize='medium' sx={{ color: 'gray' }}></AlignVerticalCenterIcon>
    }
    if(chartType === 'box') {
      icon = <AlignVerticalCenterIcon fontSize='medium' sx={{ color: 'gray' }}></AlignVerticalCenterIcon>
    }
    if(chartType === 'histogram') {
      icon = <EqualizerIcon fontSize='medium' sx={{ color: 'gray' }}></EqualizerIcon>
    }
    if(chartType === 'sankey') {
      icon = <AirIcon fontSize='medium' sx={{ color: 'gray' }}></AirIcon>
    }
    if(chartType === 'waterfall') {
      icon = <WaterfallChartIcon fontSize='medium' sx={{ color: 'gray' }}></WaterfallChartIcon>
    }
    if(chartType === 'scatter') {
      icon = <ScatterPlotIcon fontSize='medium' sx={{ color: 'gray' }}></ScatterPlotIcon>
    }
    if(chartType === 'funnel') {
      icon = <FilterAltIcon fontSize='medium' sx={{ color: 'gray' }}></FilterAltIcon>
    }
    if(chartType === 'mekko') {
      icon = <AutoAwesomeMosaicIcon fontSize='medium' sx={{ color: 'gray' }}></AutoAwesomeMosaicIcon>
    }
    return icon
  }

  return (
    <div>
      {getIcon()}
    </div>
  );
}