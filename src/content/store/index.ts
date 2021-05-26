import * as Redux from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as reduxUseSelector, useDispatch as reduxUseDispatch } from 'react-redux';

export interface State {
  selected: 'plus'|'other',
}

const initialState: Redux.PreloadedState<State> = {
  selected: 'other'
}

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    increment: (state) => {
      state.selected = 'plus'
    },
  },
})

const store = configureStore<State>({
  reducer: slice.reducer,
  preloadedState: initialState
});

console.log(store.getState())


export default store;

export const { increment } = slice.actions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<State> = reduxUseSelector;