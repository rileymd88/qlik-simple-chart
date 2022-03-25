import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpen, setDraggedField } from '../states/mainSlice';
import { updateFields } from '../services/backend';
import MuiChip from '@mui/material/Chip';
import Draggable from 'react-draggable';

export default function Chip({ app, id, edit, field, selFields, canDelete, index }) {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [fontWeight, setFontWeight] = React.useState('normal')
  const [position, setPosition] = React.useState(null)
  const [dragging, setDragging] = React.useState(false)
  const [zIndex, setzIndex] = React.useState(1000)

  useEffect(() => {
    (async function setup() {

    })();
    return async () => {
    }
  }, []);

  const onDragStop = (e) => {
    console.log('dropping')
    setPosition({ x: 0, y: 0 })
    setFontWeight('normal')
    setDragging(false)
    dispatch(setDraggedField({}))
    console.log(e.target.classList)
    if (e.target.classList.contains("drop-target")) {
      console.log("Dropped!", e.target.id);
      const i = parseInt(e.target.id.split('qscDragSpace')[1])
      selFields.splice(i, 0, field)
      updateFields(app, id, `${field.type}s`, edit, selFields)
    }
  }

  const onDragStart = () => {
    setDragging(true)
    setFontWeight('bold')
  }

  const onDrag = (e, position) => {
    setPosition(position);
    let f = { ...field }
    f.width = ref.current.clientWidth
    dispatch(setDraggedField(f))
  };

  const onMouseOver = () => {
    if (!dragging) {
      setzIndex(1003)
    }
    else {
      setzIndex(1000)
    }
  }

  const onMouseExit = () => {
    setzIndex(1000)
  }

  const onDelete = () => {
    console.log('deleting')
    selFields.splice(index, 1)
    updateFields(app, id, `${field.type}s`, edit, selFields)
  };

  let fixedChip
  if (dragging) {
    fixedChip =
      <Draggable
        onStart={() => false}
        position={{ x: 0, y: 0 }}
      >
        <MuiChip
          sx={{
            maxWidth: 150,
            minWidth: 60,
            marginLeft: `-${ref.current.clientWidth}px`,
            cursor: 'pointer',
            zIndex: 1,
          }}
          label={field.qscName}
        >
        </MuiChip>
      </Draggable>
  }

  let draggableChip
  if (canDelete) {
    draggableChip = <MuiChip
      onMouseOver={onMouseOver}
      onMouseExit={onMouseExit}
      bounds="parent"
      axis="x"
      onDelete={onDelete}
      ref={ref}
      sx={{
        maxWidth: 150,
        minWidth: 60,
        cursor: 'pointer',
        '& .MuiChip-label': {
          fontWeight
        },
      }}
      label={field.qscName}
    >
    </MuiChip>
  }
  else {
    draggableChip = <MuiChip
      ref={ref}
      sx={{
        maxWidth: 150,
        cursor: 'pointer',
        '& .MuiChip-label': {
          fontWeight
        },
      }}
      label={field.qscName}
    >
    </MuiChip>
  }

  return (
    <div style={{ zIndex: 1000 }}>
      <Draggable
        onStart={canDelete ? () => false : (e) => onDragStart(e)}
        onStop={onDragStop}
        onDrag={onDrag}
        position={position}
      >
        {draggableChip}
      </Draggable>
      {fixedChip}
    </div>
  );
}