import React, { useEffect } from 'react';
import MuiList from '@mui/material/List';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, ListItemText, ListSubheader, IconButton, Icon } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from './Chip'


export default function List({ app, id, type, fields, selFields, edit }) {
  const dispatch = useDispatch();

  useEffect(async () => {
  }, []);

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
        console.log('f', f)
        return <ListItem
        >
          <Chip
            app={app} 
            id={id} 
            edit={edit}
            field={f}
            selFields={selFields}
            canDelete={false}
            index={i}
          >
          </Chip>
        </ListItem>
      })}
    </MuiList>
  );
}