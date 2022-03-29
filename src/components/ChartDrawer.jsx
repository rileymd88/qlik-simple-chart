import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChartIcon from './ChartIcon';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, selectOpen } from '../states/mainSlice';
import { updateChart } from '../services/backend'

export default function ChartDrawer({ app, id, edit, chartType }) {
  const open = useSelector(selectOpen)
  const dispatch = useDispatch()
  const charts = [
    { key: 'table', name: 'Table' },
    { key: 'bar', name: 'Bar' },
    { key: 'pie', name: 'Pie' },
    { key: 'combo', name: 'Combo' },
    { key: 'kpi', name: 'KPI' },
    { key: 'bullet', name: 'Bullet' },
    { key: 'grid', name: 'Grid' },
    { key: 'histogram', name: 'Histogram' },
    { key: 'box', name: 'Box' },
    { key: 'scatter', name: 'Scatter' },
    { key: 'sankey', name: 'Sankey' },
    { key: 'funnel', name: 'Funnel' },
    { key: 'waterfall', name: 'Waterfall' },
    { key: 'mekko', name: 'Mekko' },
    { key: 'line', name: 'Line' },
  ]

  useEffect(async () => {

  }, []);

  const handleDrawerClose = (chartType) => {
    dispatch(setOpen(false));
    updateChart(app, id, edit, chartType)
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        position: "relative",
        marginLeft: "auto",
        "& .MuiBackdrop-root": {
          display: "none"
        },
        "& .MuiDrawer-paper": {
          position: "absolute",
          transition: "none !important"
        }
      }}

    >
      <List sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-end' }}>
        {charts.map((chart) => (
          <ListItem
            selected={chartType === chart.key}
            sx={{cursor: 'pointer'}}
            key={chart.key}
            onClick={() => handleDrawerClose(chart.key)}>
            <ListItemIcon>
              <ChartIcon chartType={chart.key} size='medium' button={false}></ChartIcon>
            </ListItemIcon>
            <ListItemText primary={chart.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}