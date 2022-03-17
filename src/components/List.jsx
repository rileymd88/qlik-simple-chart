import React, { useEffect } from 'react';
import MuiList from '@mui/material/List';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, getMasterItem } from '../services/backend';
import { ListItem, ListItemText, ListSubheader, IconButton, Icon } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';


export default function List({ app, id, type, fields, edit, hypercube }) {
  const dispatch = useDispatch();

  useEffect(async () => {
  }, []);

  const onFieldChange = async (checked, index) => {
    await updateField(app, id, type, edit, index, checked)
  }

  return (
    <MuiList
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {type === 'dimension' ? 'Dimensions' : 'Measures'}
        </ListSubheader>
      }
    >
      {fields.map((f, i) => {
        return <ListItem
          secondaryAction={
            <Checkbox checked={f.qDef.useInChart} onChange={(e) => onFieldChange(e.target.checked, i)}></Checkbox>
          }
        >
          <ListItemText
            primary={type === 'dimension' ? hypercube.qDimensionInfo[i].qFallbackTitle : hypercube.qMeasureInfo[i].qFallbackTitle}
          />
        </ListItem>
      })}
    </MuiList>
  );
}