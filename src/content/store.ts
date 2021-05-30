import * as Redux from 'redux';
import { configureStore, createSlice, PayloadAction as Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as reduxUseSelector, useDispatch as reduxUseDispatch } from 'react-redux';

type TabType = number| 'plus';
export interface State {
  prev?: TabType,
  selected: TabType,
  pageId?: string
}

const initialState: Redux.PreloadedState<State> = {
  selected: 0,
}

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setPageId: (state, {payload}:Action<string>) => {
      state.pageId = payload;
    },
    changeTab: (state, {payload}:Action<TabType>) => {
      state.prev = state.selected;
      state.selected = payload
    }
  },
})

const store = configureStore<State>({
  reducer: slice.reducer,
  preloadedState: initialState
});

export default store;

export const { setPageId, changeTab } = slice.actions;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<State> = reduxUseSelector;