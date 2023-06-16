import { thisMonth, thisWeek, today } from "@lib/posts";
import type { NextApiRequest, NextApiResponse } from "next";

const allPosts = [today, thisWeek, thisMonth];

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.json(allPosts);
  }

  if (req.method === "POST") {
    const post = { ...req.body, id: (Math.random() * 100000).toFixed() };
    allPosts.push(post);
    res.json(post);
  }
}
