import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '' }) => {
  // Parse inline math ($...$) and block math ($$...$$)
  const renderedHtml = useMemo(() => {
    if (!content) return '';
    
    // First handle block math $$ ... $$
    let parsed = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
      try {
        return `<div class="my-2 py-1 overflow-x-auto text-center">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch (e) {
        return math;
      }
    });

    // Then handle inline math $ ... $
    parsed = parsed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      } catch (e) {
        return math;
      }
    });

    // Replace linebreaks with <br/> if not within HTML tags
    return parsed.replace(/\n/g, '<br/>');
  }, [content]);

  return (
    <div 
      className={`leading-relaxed text-slate-200 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
