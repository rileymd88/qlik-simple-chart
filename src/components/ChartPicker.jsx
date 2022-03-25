import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, selectOpen } from '../states/mainSlice';
import ChartIcon from './ChartIcon';
import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';
import Chip from './Chip'
import DragSpace from './DragSpace'



export default function ChartPicker({ dimensions, measures, chartType }) {
  const open = useSelector(selectOpen)
  const [dragSpaceWidth, setDragSpaceWidth] = React.useState(10)
  const dispatch = useDispatch()
  console.log('dimensions', dimensions)

  useEffect(async () => {

  }, []);

  const ChartPickerContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: '40px',
    maxHeight: '40px',
    cursor: 'pointer',
  });

  const ChipContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row'
  });

  return (
    <ChartPickerContainer id='chartpicker' >
      <Stack direction='row' alignItems="center" justifyContent='flex-start' spacing={2}>
        <Stack direction='row' alignItems="center">
            <DragSpace id='what'></DragSpace>
          {dimensions.map((d) => {
            return <ChipContainer>
              <Chip label={d.qscName} canDelete={true} landingArea={true}></Chip>
              <DragSpace></DragSpace>
            </ChipContainer>
          })}
        </Stack>
      </Stack>
      <div onClick={() => dispatch(setOpen(!open))}>
        <ChartIcon sx={{ flex: 1 }} chartType={chartType}></ChartIcon>
      </div>
    </ChartPickerContainer>
  );
}