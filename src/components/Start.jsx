import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { setFields, getDimensions, getMeasures } from '../services/backend';
import SelectList from './SelectList';
import { selectMeasures, selectDimensions, setDimensions, setMeasures } from '../states/mainSlice';
import SaveButton from './SaveButton';


export default function Start({ app, id, rect, edit }) {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = React.useState(false)


  useEffect(async () => {
    const [d, m] = await Promise.all([
      getDimensions(app),
      getMeasures(app)
    ])
    dispatch(setDimensions(d))
    dispatch(setMeasures(m))
  }, []);

  const handleClickOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };



  const StartContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: rect.height,
    alignItems: 'center',
    justifyContent: 'center',
  });

  const ListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    overflow: 'auto',
  });

  return (
    <StartContainer>
      <Button onClick={handleClickOpen} startIcon={<AddIcon></AddIcon>} variant='outlined'>Start setup</Button>
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select dimensions and measures"}
        </DialogTitle>
        <ListContainer id="test">
          <SelectList type='dimension'></SelectList>
          <SelectList type='measure'></SelectList>
        </ListContainer>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <SaveButton app={app} id={id} edit={edit} setShowDialog={setShowDialog}></SaveButton>
        </DialogActions>
      </Dialog>
    </StartContainer>
  );
}