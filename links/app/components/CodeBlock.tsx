'use client';

import React, { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';
import { JetBrains_Mono } from 'next/font/google';
import "../globals.css"

// Load JetBrains Mono font
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  preload: true,
});

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string | null;
  theme?: 'github-light' | 'github-dark';
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  fileName = null,
  theme = 'vitesse-light'
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    const highlight = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: theme,
        });
        // Replace the background color in the highlighted HTML
        const modifiedHtml = html.replace(
          /background-color:[^;]+;/g, 
          'background-color: #E6CCB2;'
        );
        setHighlightedCode(modifiedHtml);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(code);
      }
    };
    highlight();
  }, [code, language, theme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  // Render code with line numbers
  const CodeWithLineNumbers = () => {
    const codeLines = code.split('\n');
    const lineNumbers = Array.from({ length: codeLines.length }, (_, i) => i + 1);
    
    return (
      <div className={`flex w-full ${jetBrainsMono.className}`}>
        <div className="pr-4 text-right select-none text-gray-400 border-r border-gray-200 mr-4 min-w-[2rem]">
          {lineNumbers.map(num => (
            <div key={num} className={`leading-tight text-sm ${jetBrainsMono.className}`}>
              {num}
            </div>
          ))}
        </div>
        <div 
          className={`overflow-x-auto w-full ${jetBrainsMono.className}`}
          dangerouslySetInnerHTML={{ 
            __html: highlightedCode.replace(
              /<pre class="(.*?)"/g, 
              `<pre class="$1 ${jetBrainsMono.className} m-0 p-0 bg-[#E6CCB2]"`
            ).replace(
              /<code class="(.*?)"/g, 
              `<code class="$1 !${jetBrainsMono.className} leading-tight bg-[#E6CCB2]"`
            ) 
          }}
        />
      </div>
    );
  };

  return (
    <figure className="relative w-full my-4">
      <div className="rounded-lg bg-[#E6CCB2] overflow-hidden">
        {fileName && (
          <figcaption className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-[#E6CCB2]">
            <span className="text-sm text-slate-600 font">{fileName}</span>
          </figcaption>
        )}
        <div className="relative group bg-[#E6CCB2]">
          <pre className={`p-4 text-sm leading-tight overflow-x-auto bg-[#E6CCB2] ${jetBrainsMono.className}`}>
            <CodeWithLineNumbers />
          </pre>
          <button
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy code"}
            className="absolute right-2 top-2 text-slate-500 transition-opacity duration-200 opacity-60 hover:opacity-100"
            title="Copy code"
          >
            {copied ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-4 h-4 mr-2 mt-2"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 mr-2 mt-2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </figure>
  );
};

export default CodeBlock;