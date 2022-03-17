import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { setFields } from '../services/backend';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectMeasures, selectDimensions } from '../states/mainSlice';


export default function SaveButton({ app, id, edit, setShowDialog }) {
  const dispatch = useDispatch();
  const dimensions = useSelector(selectDimensions)
  const measures = useSelector(selectMeasures)

  useEffect(async () => {

  }, []);

  const handleSave = () => {
    setFields(app, id, 'dimension', edit, dimensions.filter(d => d.checked))
    setFields(app, id, 'measure', edit, measures.filter(m => m.checked))
    setShowDialog(false)
  }

  return (
    <Button onClick={handleSave} autoFocus>
    Save
  </Button>
  );
}