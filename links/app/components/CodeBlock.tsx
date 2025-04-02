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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

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
        setError(null);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setError('Failed to highlight code');
        setHighlightedCode(code);
      }
    };
    highlight();
  }, [code, language, theme]);

  const handleCopy = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (!successful) {
            throw new Error('Copy command failed');
          }
        } catch (err) {
          throw new Error('Fallback copy failed');
        } finally {
          document.body.removeChild(textArea);
        }
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Increased to 2 seconds for better visibility
    } catch (error) {
      console.error('Failed to copy code:', error);
      setError('Failed to copy to clipboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Render code with line numbers
  const CodeWithLineNumbers = () => {
    const codeLines = code.split('\n');
    const lineNumbers = Array.from({ length: codeLines.length }, (_, i) => i + 1);

    return (
      <div className={`p-3 flex w-full ${jetBrainsMono.className}`}>
        <div className="pr-4 text-right select-none text-[#B08968] border-r border-[#DDB892] mr-4 min-w-[2rem]">
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
    <figure className="relative w-full">
      <div className="rounded-lg bg-[#E6CCB2] overflow-hidden border-2 border-[#9C6644]">
        {fileName && (
          <figcaption className="flex items-center justify-between px-4 py-2 border-b border-[#DDB892] bg-[#E6CCB2]">
            <span className="text-sm font-bold text-[#593116]">{`${fileName}.${language}`}</span>
            {error && (
              <span className="text-xs text-red-600">{error}</span>
            )}
          </figcaption>
        )}
        <div className="relative group bg-[#E6CCB2]">
          <pre className={`text-sm leading-tight overflow-x-auto bg-[#E6CCB2] ${jetBrainsMono.className}`}>
            <CodeWithLineNumbers />
          </pre>
          <button
            onClick={handleCopy}
            disabled={isLoading}
            aria-label={copied ? "Copied!" : isLoading ? "Copying..." : "Copy code"}
            className={`absolute right-2 top-2 text-slate-500 transition-all duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-60 hover:opacity-100'
            }`}
            title={copied ? "Copied!" : isLoading ? "Copying..." : "Copy code"}
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9C6644"
                className="w-4 h-4 mr-2 mt-2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9C6644"
                className="w-4 h-4 mr-2 mt-2 animate-spin"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v2M12 16v2M6 12h2m8 0h2" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9C6644"
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