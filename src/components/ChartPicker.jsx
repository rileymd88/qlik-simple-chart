import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, selectOpen } from '../states/mainSlice';
import ChartIcon from './ChartIcon';



export default function ChartPicker({ chartType }) {
  const open = useSelector(selectOpen)
  const dispatch = useDispatch()

  useEffect(async () => {

  }, []);

  const ChartPickerContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    minHeight: '40px',
    maxHeight: '40px',
    cursor: 'pointer',
  });

  return (
    <ChartPickerContainer onClick={() => dispatch(setOpen(!open))}>
      <ChartIcon chartType={chartType}></ChartIcon>
    </ChartPickerContainer>
  );
}