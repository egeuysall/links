'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CodeBlock } from "@/components/ui/code-block";
import createUserSite, { FormSubmissionResult } from '../userSite';

export default function ResultsPage() {
  const router = useRouter();
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would get the form results from a server or localStorage
    // For this example, we'll simulate getting the form results
    try {
      // Try to get form results from localStorage (in a real app)
      const storedResults = localStorage.getItem('formResults');
      
      if (storedResults) {
        const formResults: FormSubmissionResult[] = JSON.parse(storedResults);
        const userSite = createUserSite(formResults);
        setGeneratedHTML(userSite.html);
      } else {
        // Example form results for demonstration
        const exampleResults: FormSubmissionResult[] = [
          {
            type: 'profile',
            username: 'exampleuser',
            profileImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzc2NGJhMiIvPjx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkU8L3RleHQ+PC9zdmc+',
          },
          {
            type: 'default_link',
            platform: 'Instagram',
            url: 'https://instagram.com/exampleuser'
          },
          {
            type: 'default_link',
            platform: 'Twitter',
            url: 'https://twitter.com/exampleuser'
          },
          {
            type: 'default_link',
            platform: 'GitHub',
            url: 'https://github.com/exampleuser'
          },
          {
            type: 'custom_link',
            platform: 'Personal Website',
            url: 'https://example.com'
          }
        ];
        
        const userSite = createUserSite(exampleResults);
        setGeneratedHTML(userSite.html);
      }
    } catch (err) {
      setError('Error generating HTML. Please try again.');
      console.error('Error generating site:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoBack = () => {
    router.push('/create');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHTML)
      .then(() => alert('HTML code copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Generated Website</h1>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="mb-2">Here's the HTML code for your website. You can copy this code and host it anywhere!</p>
            
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={handleCopyCode}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Copy HTML Code
              </button>
              
              <button 
                onClick={handleGoBack}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Back to Editor
              </button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <CodeBlock
            language="html"
            code={generatedHTML}
            filename='Website'
            />
          </div>

          <div className="mt-8 border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">Preview</h2>
            <div className="border rounded-lg h-96 overflow-auto">
              <iframe 
                srcDoc={generatedHTML}
                title="Website Preview" 
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}