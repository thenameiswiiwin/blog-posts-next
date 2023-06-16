/* eslint-disable no-param-reassign */
import type { Period } from '@lib/constants';
import type { Post, TimelinePost } from '@lib/posts';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
  loading: boolean;
}

const initialState = {
  ids: [],
  all: new Map(),
  selectedPeriod: 'Today',
  loading: false,
} as PostsState;

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await fetch('/api/posts');
    const data = await res.json();
    await delay();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch posts.');
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPeriod: (state, action: PayloadAction<Period>) => {
      state.selectedPeriod = action.payload;
    },
    createPost: (state, action: PayloadAction<TimelinePost>) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const ids: string[] = [];
        const all = new Map<string, Post>();

        state.loading = false;
        action.payload.forEach((post: Post) => {
          ids.push(post.id);
          all.set(post.id, post);
        });

        state.ids = ids;
        state.all = all;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedPeriod, createPost } = postsSlice.actions;
export default postsSlice.reducer;

export const filteredPosts = createSelector(
  (state: PostsState) => state,
  (state): TimelinePost[] => {
    try {
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
    } catch (error) {
      throw new Error('Failed to filter posts.');
    }
  }
);
