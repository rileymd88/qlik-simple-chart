import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, selectOpen } from '../states/mainSlice';
import ChartIcon from './ChartIcon';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Typography } from '@material-ui/core';
import Chip from './Chip'
import DragSpace from './DragSpace'



export default function ChartPicker({ app, id, edit, selDimensions, selMeasures, chartType }) {
  const open = useSelector(selectOpen)
  const dispatch = useDispatch()
  console.log('selDimensions', selDimensions)

  useEffect(async () => {

  }, []);

  const ChartPickerContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    heihgt: '100%',
    cursor: 'pointer',
  });

  const ChipContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row'
  });

  const FieldContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row'
  });

  let finalDimensionDragSpace
  if (selDimensions.length > 0) {
    finalDimensionDragSpace = <DragSpace index={selDimensions.length} fullWidth={true}></DragSpace>
  }

  return (
    <ChartPickerContainer id='chartpicker' >
      <Stack sx={{ width: '100%', marginLeft: 4 }} direction='column' alignItems="center" justifyContent='flex-start'>
        <Stack sx={{ width: '100%', border: '1px solid lightgray' }} direction='row' alignItems="center" justifyContent='center' spacing={1}>
          <DragSpace index={0} fullWidth={selDimensions.length === 0}></DragSpace>
          {selDimensions.map((d, i) => {
            let dragSpace
            if (i !== selDimensions.length - 1) {
              dragSpace = <DragSpace index={i + 1} fullWidth={false}></DragSpace>
            }
            return <ChipContainer>
              <Chip app={app} id={id} edit={edit} field={d} selFields={selDimensions} canDelete={true} index={i}></Chip>
              {dragSpace}
            </ChipContainer>
          })}
          {finalDimensionDragSpace}
        </Stack>
        <Stack sx={{ width: '100%', border: '1px solid lightgray' }} direction='row' alignItems="center" justifyContent='center' spacing={1}>
          <DragSpace index={0} fullWidth={selMeasures.length === 0}></DragSpace>
          {selMeasures.map((m, i) => {
            let dragSpace
            if (i !== selMeasures.length - 1) {
              dragSpace = <DragSpace index={i + 1} fullWidth={false}></DragSpace>
            }
            return <ChipContainer>
              <Chip app={app} id={id} edit={edit} field={m} selFields={selMeasures} canDelete={true} index={i}></Chip>
              {dragSpace}
            </ChipContainer>
          })}
          {finalDimensionDragSpace}
        </Stack>
      </Stack>
      <div style={{ marginLeft: 4 }} onClick={() => dispatch(setOpen(!open))}>
        <ChartIcon size='large' sx={{ flex: 1, zIndex: 1002 }} chartType={chartType}></ChartIcon>
      </div>
    </ChartPickerContainer>
  );
}