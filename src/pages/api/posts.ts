import { thisMonth, thisWeek, today } from '@lib/posts';
import type { NextApiRequest, NextApiResponse } from 'next';

const allPosts = [today, thisWeek, thisMonth];

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  res.json(allPosts);
}
