import hljs from 'highlight.js';
import { marked } from 'marked';

export const parseMarkdown = (content: string): string => {
  const options = {
    mangle: false,
    headerIds: false,
    gfm: true,
    breaks: true,
    highlight: (code: string) => {
      return hljs.highlightAuto(code).value;
    },
  };

  marked.setOptions(options);

  return marked(content);
};
