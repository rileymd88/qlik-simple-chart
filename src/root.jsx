import ReactDOM from "react-dom";
import React from "react";
import { styled } from '@mui/system';
import { Provider } from "react-redux";
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './states/mainSlice';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Start from './components/Start'
import List from './components/List'
import Chart from './components/Chart'
import ChartPicker from "./components/ChartPicker";
import ChartDrawer from "./components/ChartDrawer";


export function render(app, id, dimensions, measures, element, edit, hypercube, n, rect, chartType) {
  const dimensionsFilterd = dimensions.filter(d => d.qDef.useInChart).map((d) => {
    if (typeof d.qLibraryId === 'undefined') {
      return d
    }
    else {
      return { qLibraryId: d.qLibraryId, type: 'dimension' }
    }
  })
  const measuresFilterd = measures.filter(m => m.qDef.useInChart).map((m) => {
    if (typeof m.qLibraryId === 'undefined') {
      return m
    }
    else {
      return { qLibraryId: m.qLibraryId, type: 'measure' }
    }
  })
  const fields = dimensionsFilterd.concat(measuresFilterd)
  const theme = createTheme(adaptV4Theme({
    palette: {
      mode: 'light',
      text: {
        primary: 'rgba(0, 0, 0, 0.87)'
      }
    },
    typography: {
      button: {
        textTransform: 'none',
      },
      fontFamily: 'Source Sans Pro,sans-serif'
    },
  }));

  const store = configureStore({
    reducer: {
      main: mainReducer
    },
  });

  
  const RowContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  });

  const ColumnContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
  });

  let finalView
  if (dimensions.length === 0 && measures.length === 0) {
    finalView = <Start app={app} id={id} rect={rect} edit={edit}></Start>
  }
  else {
    finalView =
      <ColumnContainer>
        <ChartPicker chartType={chartType}></ChartPicker>
        <RowContainer>
          <ColumnContainer sx={{ width: '30%' }}>
            <List app={app} id={id} type='dimension' fields={dimensions} edit={edit} hypercube={hypercube}></List>
            <List app={app} id={id} type='measure' fields={measures} edit={edit} hypercube={hypercube}></List>
          </ColumnContainer>
          <Chart n={n} rect={rect} fields={fields} chartType={chartType} sx={{width: '70%'}}></Chart>
          <ChartDrawer app={app} id={id}  edit={edit} chartType={chartType}></ChartDrawer>
        </RowContainer>
      </ColumnContainer>
  }


  ReactDOM.render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {finalView}
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </LocalizationProvider>,
    element
  );
}

export function teardown(element) {
  ReactDOM.unmountComponentAtNode(element);
}
