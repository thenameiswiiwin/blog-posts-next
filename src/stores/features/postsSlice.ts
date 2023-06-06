/* eslint-disable no-param-reassign */
import type { Period } from '@lib/constants';
import type { Post, TimelinePost } from '@lib/posts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

const initialState = {
  ids: [],
  all: new Map(),
  selectedPeriod: 'Today',
} as PostsState;

function delay() {
  return new Promise<void>((res) => {
    setTimeout(res, 1500);
  });
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await window.fetch('/api/posts');
  const data = (await res.json()) as Post[];
  await delay();
  return data;
});

export const usePosts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPeriod: (state, action: PayloadAction<Period>) => {
      state.selectedPeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const ids: string[] = [];
      const all = new Map<string, Post>();
      action.payload.forEach((post) => {
        ids.push(post.id);
        all.set(post.id, post);
      });

      state.ids = ids;
      state.all = all;
    });
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
