"use client";

import React from "react";
import Link from "next/link";

export const FeedbackPanel: React.FC = () => {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="lg:col-span-2 row-span-1 lg:pl-8 text-[#593116]"
    >
      <header className="mb-4">
        <h3
          id="next-steps-heading"
          className="text-3xl font-bold text-center tracking-tight"
        >
          Next Steps
        </h3>
      </header>

      <nav aria-label="Deployment steps">
        <ol className="list-decimal flex ml-4 flex-col gap-4 text-lg">
          <li>
            <strong>Set Up GitHub Repository:</strong> Create a new GitHub repository
            for your links page. Refer to the "Setting Up GitHub Repository" section
            in our documentation, which includes visual examples of the entire setup
            process.
          </li>
          <li>
            <strong>Add Your Code:</strong> Copy your generated code into a new
            "index.html" file in your GitHub repository. The "Adding Your Code to
            GitHub" section of our documentation shows you exactly how to do this
            with clear visual guides.
          </li>
          <li>
            <strong>Deploy with Vercel:</strong> Follow our detailed Vercel
            deployment guide in the documentation's "Deploying with Vercel" section.
            We've included comprehensive screenshots of each step to make the process
            straightforward.
          </li>
        </ol>
      </nav>

      <footer className="mt-6 bg-[#E6CCB2] p-6 rounded-lg">
        <div className="mb-3">
          <p className="text-lg font-semibold">💡 Pro Tip:</p>
          <p className="text-lg">
            <Link
              href="/docs/getting-started"
              className="text-[#7F5539] font-bold hover:underline"
              aria-label="View comprehensive documentation with visual guides"
            >
              Our documentation {" "}
            </Link>
            includes detailed screenshots and examples for each step.
            Make sure to reference them as you go through the deployment process.
          </p>
        </div>
        <p className="italic text-sm">
          Need assistance? Visit our{" "}
          <Link
            href="https://github.com/egeuysall/links/issues"
            className="text-[#7F5539] font-bold hover:underline"
            aria-label="Open an issue on GitHub"
          >
            GitHub repository
          </Link>{" "}
          to open an issue or review common questions.
        </p>
      </footer>
    </section>
  );
};