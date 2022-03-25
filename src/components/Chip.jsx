import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpen, setDraggedField } from '../states/mainSlice';
import MuiChip from '@mui/material/Chip';
import Draggable from 'react-draggable';

export default function Chip({ label, canDelete, landingArea }) {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [fontWeight, setFontWeight] = React.useState('normal')
  const [position, setPosition] = React.useState(null)
  const [dragging, setDragging] = React.useState(false)

  useEffect(() => {
    (async function setup() {

    })();
    return async () => {
    }
  }, []);

  const onDragStop = () => {
    setPosition({ x: 0, y: 0 })
    setFontWeight('normal')
    setDragging(false)
    dispatch(setDraggedField({}))
  }

  const onDragStart = () => {
    setDragging(true)
    setFontWeight('bold')
  }

  const onDrag = (e, position) => {
    setPosition(position);
    const field = {
      width: ref.current.clientWidth
    }
    dispatch(setDraggedField(field))
  };

  const onDelete = (e, position) => {
    setPosition(position);
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
          label={label}
        >
        </MuiChip>
      </Draggable>
  }

  let draggableChip
  if (canDelete) {
    draggableChip = <MuiChip
      bounds="parent"
      axis="x"
      ref={ref}
      sx={{
        maxWidth: 150,
        minWidth: 60,
        cursor: 'pointer',
        '& .MuiChip-label': {
          fontWeight
        },
      }}
      label={label}
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
      label={label}
    >
    </MuiChip>
  }

  const onMouseOver = (e) => {
    e.preventDefault()
    if(landingArea) {
      const { width, x } = ref.current.getBoundingClientRect();
      console.log(e.clientX > (width/2) + x)
    }
  }
  const onDrop = (e) => {
    
  }

  return (
    <div style={{ zIndex: 1000 }}>
      <Draggable
        onStart={onDragStart}
        onStop={onDragStop}
        onDrag={onDrag}
        onDrop={onDrop}
        position={position}
      >
        {draggableChip}
      </Draggable>
      {fixedChip}
    </div>
  );
}