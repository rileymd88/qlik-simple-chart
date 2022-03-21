import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpen } from '../states/mainSlice';




export default function RowContainer() {
  const open = useSelector(selectOpen)
  const RowContainerDiv = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: open ? 'calc(100% + 200px)' : '100%',
    height: '100%',
  });

  useEffect(async () => {

  }, []);


  return (
    <RowContainerDiv>
    </RowContainerDiv>
  );
}