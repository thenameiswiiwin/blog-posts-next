import { marked } from 'marked';

export const parseMarkdown = (content: string): string => {
  const options = {
    mangle: false,
    headerIds: false,
  };

  marked.setOptions(options);

  return marked(content);
};
