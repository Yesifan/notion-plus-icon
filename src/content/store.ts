import * as Redux from 'redux';
import { configureStore, createSlice, PayloadAction as Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as reduxUseSelector, useDispatch as reduxUseDispatch } from 'react-redux';

import { parsePageId } from 'notion-utils';

type TabType = number| 'plus';
export interface State {
  prev?: TabType,
  pageId?: string,
  selected: TabType,
}

const initialState: Redux.PreloadedState<State> = {
  prev: undefined,
  selected: 0,
  pageId: undefined,
}

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    changeTab: (state, {payload}:Action<TabType>) => {
      state.prev = state.selected;
      state.selected = payload
    },
    updatePageId(state){
      state.pageId = parsePageId(location.href);
    },
  },
})

const store = configureStore<State>({
  reducer: slice.reducer,
  preloadedState: initialState
});

export default store;

export const { updatePageId, changeTab } = slice.actions;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<State> = reduxUseSelector;