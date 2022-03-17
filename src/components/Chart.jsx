import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';

import { useSelector, useDispatch } from 'react-redux';


export default function Chart({ n, rect, fields, chartType }) {
  const dispatch = useDispatch();
  const ref = useRef(null)
  

  useEffect(async () => {
    n.render({
      element: ref.current,
      type: chartType,
      fields: fields,
    })
  }, []);
  

  const ChartContainer = styled('div')({
    width: '100%',
    height: `calc(${rect.height}px - 40px)`,
  });

  return (
    <ChartContainer id='test' ref={ref}>
    </ChartContainer>
  );
}