/* eslint-disable no-param-reassign */
import type { Period } from '@lib/constants';
import type { Post, TimelinePost } from '@lib/posts';
import { thisMonth, thisWeek, today } from '@lib/posts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

const initialState = {
  ids: [today.id, thisWeek.id, thisMonth.id],
  all: new Map([
    [today.id, today],
    [thisWeek.id, thisWeek],
    [thisMonth.id, thisMonth],
  ]),
  selectedPeriod: 'Today',
} as PostsState;

export const usePosts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPeriod: (state, action: PayloadAction<Period>) => {
      state.selectedPeriod = action.payload;
    },
  },
});

export const { setSelectedPeriod } = usePosts.actions;
export default usePosts.reducer;

export const filteredPosts = (state: PostsState): TimelinePost[] => {
  return state.ids
    .map((id) => {
      const post = state.all.get(id);
      if (!post) {
        throw Error(`Post with id of ${id} was expected but not found.`);
      }

      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (state.selectedPeriod === 'Today') {
        return post.created >= DateTime.now().minus({ days: 1 });
      }
      if (state.selectedPeriod === 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 });
      }

      return post;
    });
};
