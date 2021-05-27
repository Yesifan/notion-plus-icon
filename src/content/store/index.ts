import * as Redux from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as reduxUseSelector, useDispatch as reduxUseDispatch } from 'react-redux';

export interface State {
  selected: 'plus'|number,
}

const initialState: Redux.PreloadedState<State> = {
  selected: 0
}

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    tabPluse: (state) => {
      state.selected = 'plus'
    },
    tabOther: (state, {payload}:{payload:number}) => {
      state.selected = payload
    }, 
  },
})

const store = configureStore<State>({
  reducer: slice.reducer,
  preloadedState: initialState
});

export default store;

export const { tabPluse, tabOther } = slice.actions;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<State> = reduxUseSelector;