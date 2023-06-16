'use client';

import { parseMarkdown } from '@lib/parsedMarkdown';
import type { TimelinePost } from '@lib/posts';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { Button } from './Button';

interface PostWriterProps {
  post: TimelinePost;
}

export const PostWriter = ({ post }: PostWriterProps) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.markdown);
  const [html, setHtml] = useState('');
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const debouncedParseMarkdown = useRef(
    debounce((newContent: string) => {
      const parsedHtml = parseMarkdown(newContent);
      setHtml(parsedHtml);
    }, 250)
  ).current;

  useEffect(() => {
    debouncedParseMarkdown(content);

    return () => {
      debouncedParseMarkdown.cancel();
    };
  }, [content]);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerText = content;
    }
  }, []);

  const handleInput = () => {
    if (contentEditableRef.current) {
      setContent(contentEditableRef.current.innerText);
    }
  };

  return (
    <div>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-6 flex flex-col gap-x-6 gap-y-8">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="block w-full border-0 bg-transparent p-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="prose">
            <div className="grid grid-cols-2">
              <div
                id="content"
                contentEditable
                ref={contentEditableRef}
                onInput={handleInput}
                className="p-2"
              />
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: html }}
                  className="p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Button
          href="/"
          type="button"
          size="small"
          intent="secondary"
          className="text-gray-900"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="small"
          intent="primary"
          /* onClick={handleClick} */
        >
          Save Post
        </Button>
      </div>
    </div>
  );
};
