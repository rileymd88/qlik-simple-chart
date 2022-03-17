import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { updateDimension, updateMeasure, selectDimensions, selectMeasures, setDimensions, setMeasures } from '../states/mainSlice';
import { ListItem, ListItemText, ListSubheader } from '@mui/material';
import MuiList from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { getDimensions, getMeasures } from '../services/backend';


export default function SelectList({ type }) {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = React.useState(false)
  let fields
  if (type === 'dimension') {
    fields = useSelector(selectDimensions)
  }
  else {
    fields = useSelector(selectMeasures)
  }

  useEffect(async () => {

  }, []);

  const onFieldChange = async (checked, index) => {
    const data = {
      index,
      checked
    }
    if (type === 'dimension') {
      dispatch(updateDimension(data))
    }
    else {
      dispatch(updateMeasure(data))
    }
  }

  const onSelectAll = (checked) => {
    setSelectAll(checked)
    if (type === 'dimension') {
      fields.forEach((f, i) => dispatch(updateDimension({ index: i, checked: checked })))
    }
    else {
      fields.forEach((f, i) => dispatch(updateMeasure({ index: i, checked: checked })))
    }
  }

  const ListSubContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
  });

  return (
    <MuiList
      sx={{ paddingRight: 16 }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubContainer>
          <ListSubheader component="div" id="nested-list-subheader">
            {type === 'dimension' ? 'Dimensions' : 'Measures'}
          </ListSubheader>
          <Checkbox checked={selectAll} style={{ paddingLeft: 12 }} onChange={(e) => onSelectAll(e.target.checked)}></Checkbox>
        </ListSubContainer>
      }
    >
      {fields.map((f, i) => {
        return <ListItem>
          <ListItemText
            primary={f.name}
          />
          <Checkbox style={{ paddingLeft: 12 }} checked={f.checked} onChange={(e) => onFieldChange(e.target.checked, i)}></Checkbox>
        </ListItem>
      })}
    </MuiList>
  );
}