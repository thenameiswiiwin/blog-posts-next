'use client';

import type { TimelinePost } from '@lib/posts';
import { thisMonth, thisWeek, today } from '@lib/posts';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { TimelineItem } from './TimelineItem';

const periods = ['Today', 'This Week', 'This Month'] as const;

type Period = (typeof periods)[number];

export const Timeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Today');

  const posts = useMemo<TimelinePost[]>(() => {
    return [today, thisWeek, thisMonth]
      .map((post) => {
        return {
          ...post,
          created: DateTime.fromISO(post.created),
        };
      })
      .filter((post) => {
        if (selectedPeriod === 'Today') {
          return post.created >= DateTime.now().minus({ days: 1 });
        }

        if (selectedPeriod === 'This Week') {
          return post.created >= DateTime.now().minus({ week: 1 });
        }

        return post;
      });
  }, [selectedPeriod]);

  const selectPeriod = (period: Period) => setSelectedPeriod(period);
  return (
    <div>
      <div className="rounded-lg px-4 py-5 shadow-lg sm:px-6 sm:py-2">
        <div>
          <div className="sm:hidden">
            <label htmlFor="periods" className="sr-only">
              Select a period
            </label>
            <select
              id="periods"
              name="periods"
              className="block w-full cursor-pointer rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
            >
              {periods.map((period) => (
                <option key={period}>{period}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex justify-center" aria-label="Tabs">
                {periods.map((period) => (
                  <Link
                    key={period}
                    href="#"
                    aria-current={period ? 'page' : undefined}
                    onClick={() => selectPeriod(period)}
                    className={clsx(
                      'w-1/4 cursor-pointer border-b-2 px-1 py-4 text-center text-sm font-medium',
                      selectedPeriod === period
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    {period}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-hidden rounded-md bg-white shadow">
          <ul role="list" className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li
                key={post.id}
                className="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
              >
                <TimelineItem post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
