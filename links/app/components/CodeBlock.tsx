'use client';

import React, { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';
import { JetBrains_Mono } from 'next/font/google';
import "../globals.css";

// Import HTML and CSS icons from react-icons/fa
import { FaHtml5, FaCss3Alt } from 'react-icons/fa';
// Import modern outline icons from react-icons/io5 for code
import { IoCodeOutline } from 'react-icons/io5';
// Import modern outline icons for copy and check functionality
import { LuCopy } from "react-icons/lu";
import { IoCheckmark } from "react-icons/io5";
import { CgSpinner } from 'react-icons/cg';

// Load JetBrains Mono font
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  preload: true,
  style: ['normal', 'italic'],
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

  // Set a consistent color for all icons
  const iconColor = '#9C6644';

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
      setTimeout(() => setCopied(false), 1000); // Increased to 2 seconds for better visibility
    } catch (error) {
      console.error('Failed to copy code:', error);
      setError('Failed to copy to clipboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Get language icon based on language type - only using icons for HTML, CSS, and plaintext
  const getLangIcon = () => {
    const lang = language.toLowerCase();
    switch (lang) {
      case 'html':
        return <FaHtml5 className={`text-[${iconColor}]`} size={16} />;
      case 'css':
        return <FaCss3Alt className={`text-[${iconColor}]`} size={16} />;
      case 'text':
      case 'plaintext':
      case 'txt':
        return <IoCodeOutline className={`text-[${iconColor}]`} size={16} />;
      default:
        // For all other languages just display the code icon
        return <IoCodeOutline className={`text-[${iconColor}]`} size={16} />;
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
    <figure className="relative h-full w-full">
      <div className="rounded-lg bg-[#E6CCB2] overflow-hidden border-2 border-[#9C6644]">
        {fileName && (
          <figcaption className="flex items-center justify-between px-4 py-2 border-b border-[#DDB892] bg-[#E6CCB2]">
            <div className="flex items-center justify-center gap-2">
              <div className="flex-shrink-0 flex items-center justify-center">
                {getLangIcon()}
              </div>
              <span className="text-sm italic text-[#593116]">{`${fileName}${language ? `.${language}` : ''}`}</span>
            </div>
            <button
              onClick={handleCopy}
              disabled={isLoading}
              aria-label={copied ? "Copied!" : isLoading ? "Copying..." : "Copy code"}
              className={`flex items-center text-[#593116] transition-all duration-200 hover:bg-[#DDB892] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              title={copied ? "Copied!" : isLoading ? "Copying..." : "Copy code"}
            >
              {copied ? (
                <>
                  <IoCheckmark
                    className="w-5 h-5 text-[#9C6644]"
                    style={{ strokeWidth: '1' }}
                  />
                </>
              ) : isLoading ? (
                <>
                  <CgSpinner
                    className="w-4 h-4 text-[#9C6644] animate-spin"
                  />
                </>
              ) : (
                <>
                  <LuCopy
                    className="w-4 h-4 text-[#9C6644]"
                  />
                </>
              )}
            </button>
          </figcaption>
        )}
        <div className="relative group bg-[#E6CCB2]">
          {/* Fixed height with scrollable overflow */}
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#9C6644] scrollbar-track-[#DDB892]">
            <pre className={`text-sm leading-tight overflow-x-auto bg-[#E6CCB2] ${jetBrainsMono.className}`}>
              <CodeWithLineNumbers />
            </pre>
          </div>
          {/* Copy button when no filename is provided */}
          {!fileName && (
            <button
              onClick={handleCopy}
              disabled={isLoading}
              aria-label={copied ? "Copied!" : isLoading ? "Copying..." : "Copy code"}
              className={`absolute right-2 top-2 text-slate-500 transition-all duration-200 bg-[#DDB892] px-2 py-1 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                }`}
              title={copied ? "Copied!" : isLoading ? "Copying..." : "Copy code"}
            >
              {copied ? (
                <IoCheckmark
                  className="w-5 h-5 text-[#9C6644]"
                  style={{ strokeWidth: '1' }}
                />
              ) : isLoading ? (
                <CgSpinner
                  className="w-4 h-4 text-[#9C6644] animate-spin"
                />
              ) : (
                <LuCopy
                  className="w-4 h-4 text-[#9C6644]"
                />
              )}
            </button>
          )}
        </div>
      </div>
    </figure>
  );
};

export default CodeBlock;