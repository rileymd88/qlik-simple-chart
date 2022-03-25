import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { selectDraggedField } from '../states/mainSlice';

let chart

export default function DragSpace({ index, fullWidth }) {
  const draggedField = useSelector(selectDraggedField)
  const [width, setWidth] = React.useState(50)
  const [margin, setMargin] = React.useState(-25)

  useEffect(() => {
    (async function setup() {

    })();
    return async () => {
    }
  }, []);

  const DragSpaceContainer = styled('div')({
    width: fullWidth ? '100%' : width,
    height: 32,
    display: 'flex',
    flexDirection: 'row',
    zIndex: typeof draggedField.width !== 'undefined' ? 1001 : 999,
    marginLeft: index === 0 ? 0 : margin,
    marginRight: margin,
  });

  const onMouseOver = (e) => {
    if (typeof draggedField.width !== 'undefined') {
      setWidth(draggedField.width)
      setMargin(0)
    }
  }

  const onMouseLeave = () => {
    setWidth(50)
    setMargin(-25)
  }
  const onMouseExit = () => {
    setWidth(50)
    setMargin(-25)
  }

  return (
    <DragSpaceContainer id={`qscDragSpace${index}`} className='drop-target' onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} onMouseExit={onMouseExit}>

    </DragSpaceContainer>
  );
}