"use client";

import type { TimelinePost } from "@lib/posts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "./Button";

interface PostWriterProps {
  post: TimelinePost;
}

export const PostWriter = ({ post }: PostWriterProps) => {
  const [title, setTitle] = useState(post.title);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  console.log(contentEditableRef.current);

  useEffect(() => {
    console.log(contentEditableRef.current?.innerText);
  }, [contentEditableRef.current?.innerText]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-6 flex flex-col gap-x-6 gap-y-8">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleTitleChange}
                  className="w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600"
                />
              </div>
              {title}
            </div>

            <div>
              <div className="grid grid-cols-2">
                <div
                  id="content"
                  contentEditable={true}
                  ref={contentEditableRef}
                >
                  This is the post.
                </div>
                <div>
                  <div dangerouslySetInnerHTML={{ __html: "html" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Link href="/">
          <Button
            type="button"
            size="small"
            intent="secondary"
            className="text-gray-900"
          >
            Cancel
          </Button>
        </Link>
        <Button type="submit" size="small" intent="primary">
          Save Post
        </Button>
      </div>
    </div>
  );
};
