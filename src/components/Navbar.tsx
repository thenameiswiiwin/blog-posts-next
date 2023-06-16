import { PlusIcon } from '@heroicons/react/20/solid';

import { Button } from './Button';

export const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-end gap-2 pb-4 pt-8">
        <div className="shrink-0">
          <Button href="/post/new" type="button" size="small" intent="primary">
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Post
          </Button>
        </div>
        <div className="shrink-0">
          <Button type="button" size="small" intent="secondary">
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
