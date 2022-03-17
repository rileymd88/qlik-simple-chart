import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'main',
  initialState: {
    dimensions: [],
    measures: [],
  },
  reducers: {
    setDimensions: (state, action) => {
      state.dimensions = action.payload
    },
    updateDimension: (state, action) => {
      state.dimensions[action.payload.index].checked = action.payload.checked
    },
    setMeasures: (state, action) => {
      state.measures = action.payload
    },
    updateMeasure: (state, action) => {
      state.measures[action.payload.index].checked = action.payload.checked
    },
  },
});


export const selectDimensions = state => state.main.dimensions;
export const selectMeasures = state => state.main.measures;

export const { setDimensions, setMeasures, updateDimension, updateMeasure } = slice.actions;

export default slice.reducer;