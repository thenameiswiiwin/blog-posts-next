import { PostWriter } from '@components/PostWriter';

export default function NewPostsPage() {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        New Post
      </h2>
      <PostWriter />
    </div>
  );
}
