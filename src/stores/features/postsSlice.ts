import type { Post } from '@lib/posts';
import { thisMonth, thisWeek, today } from '@lib/posts';
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
}

const initialState = {
  ids: [today.id, thisWeek.id, thisMonth.id],
  all: new Map([
    [today.id, today],
    [thisWeek.id, thisWeek],
    [thisMonth.id, thisMonth],
  ]),
} as PostsState;

export const usePosts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    /* decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    }, */
  },
});

export const {} = usePosts.actions;
export default usePosts.reducer;
