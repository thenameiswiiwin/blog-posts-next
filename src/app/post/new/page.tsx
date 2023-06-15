import { PostWriter } from '@components/PostWriter';
import type { TimelinePost } from '@lib/posts';
import { DateTime } from 'luxon';

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  created: DateTime.now(),
};

export default function NewPostPage() {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        New Post
      </h2>
      <PostWriter post={post} />
    </div>
  );
}
