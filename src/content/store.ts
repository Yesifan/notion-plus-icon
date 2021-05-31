import * as Redux from 'redux';
import { configureStore, createSlice, PayloadAction as Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as reduxUseSelector, useDispatch as reduxUseDispatch } from 'react-redux';

import { getUUID } from '@/content/lib/utils';

export type TabType = number| 'plus';
export interface State {
  icons: string[],
  selected: TabType,
  pageId?: string,
}

const initialState: Redux.PreloadedState<State> = {
  icons: [],
  selected: 0,
}

const slice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setIcons:(state, {payload}) => {
      state.icons = payload;
    },
    setPageId: (state) => {
      state.pageId = getUUID(location.href);
    },
    changeTab: (state, {payload}:Action<TabType>) => {
      state.selected = payload
    },
  },
})

const store = configureStore<State>({
  reducer: slice.reducer,
  preloadedState: initialState
});

export default store;

export const { setIcons, setPageId, changeTab } = slice.actions;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<State> = reduxUseSelector;