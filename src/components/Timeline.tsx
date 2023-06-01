'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

const periods = ['Today', 'This Week', 'This Month'];

export const Timeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const selectPeriod = (period: string) => setSelectedPeriod(period);
  return (
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
  );
};
