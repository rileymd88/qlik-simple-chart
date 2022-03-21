import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { selectOpen } from '../states/mainSlice';

let chart

export default function Chart({ n, rect, fields, chartType }) {
  const ref = useRef(null)
  
  useEffect(() => {
    (async function setup() {
      chart = await n.render({
        element: ref.current,
        type: chartType,
        fields: fields,
      })
    })();
    return async () => {
      chart.destroy()
    }
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