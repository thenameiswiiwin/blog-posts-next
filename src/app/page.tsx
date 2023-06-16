'use client';

import { Timeline } from '@components/Timeline';
import { useEffect, useState } from 'react';

import Loading from './loading';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <Timeline />
      )}
    </div>
  );
};

export default HomePage;
