import { thisMonth, thisWeek, today } from '@lib/posts';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json([today, thisWeek, thisMonth]);
  }
}
