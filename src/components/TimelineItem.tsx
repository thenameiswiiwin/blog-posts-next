import type { TimelinePost } from '@lib/posts';
import Link from 'next/link';

interface TimelineItemProps {
  post: TimelinePost;
}

export const TimelineItem = ({ post }: TimelineItemProps) => {
  return (
    <Link href={''} className="flex gap-x-4">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          <span className="absolute inset-x-0 -top-px bottom-0" />
          {post.title}
        </p>
        <p className="mt-1 flex text-xs leading-5 text-gray-500">
          {post.created.toFormat('MMMM dd, yyyy')}
        </p>
      </div>
    </Link>
  );
};
