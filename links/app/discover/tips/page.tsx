import React from "react";
import Link from "next/link";
import Image from "next/image";
import CodeBlock from "../../components/CodeBlock";

export default function Tips() {
  // Current date information for freshness
  const lastUpdated = "2025-03-30";
  const authorName = "egeuysall";

  return (
    <main className="w-full h-full flex items-center justify-center flex-col gap-8 overflow-hidden">
      {/* Section 1: Introduction */}
      <section className="flex flex-col gap-4" aria-labelledby="main-heading">
        <h1
          id="main-heading"
          className="text-5xl text-center font-bold text-[#593116] tracking-tighter break-normal whitespace-normal"
        >
          Pro Tips for Your Links Page
        </h1>

        <p className="text-center text-[#593116] tracking-tight text-xl">
          Make your links page stand out with these professional tips and best practices
          for maximizing engagement and visual appeal.
        </p>

        <div className="text-sm text-[#7F5539] text-center">
          <time dateTime={lastUpdated}>Last updated: {lastUpdated}</time> by{" "}
          <span itemProp="author">@{authorName}</span>
        </div>
      </section>

      {/* Main Content */}
      <article className="flex flex-col gap-2 bg-[#E6CCB2] w-full p-8 rounded-lg border-2 border-[#9C6644] mb-24">
        {/* Visual Optimization Section */}
        <section aria-labelledby="visual-optimization">
          <h2 id="visual-optimization" className="text-4xl font-bold text-[#593116] mb-4">
            Visual Optimization Tips
          </h2>

          <div className="flex flex-col gap-6">
            {/* Profile Picture Tips */}
            <section>
              <h3 className="text-2xl font-bold text-[#593116]">Profile Picture Excellence</h3>
              <figure className="my-4">
                <Image
                  src="/images/profile-example.jpg"
                  alt="Example of good vs bad profile pictures"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
                <figcaption className="text-sm text-[#7F5539] mt-2">
                  Good vs bad profile picture examples
                </figcaption>
              </figure>
              <ul className="list-disc pl-8 text-[#593116] text-lg">
                <li>Use a high-resolution image (recommended: 400x400 pixels minimum)</li>
                <li>Ensure your face is clearly visible and centered</li>
                <li>Choose good lighting and a clean background</li>
                <li>Keep the image professional yet approachable</li>
                <li>Update regularly to maintain relevance</li>
              </ul>
            </section>

            {/* Color Scheme Tips */}
            <section>
              <h3 className="text-2xl font-bold text-[#593116]">Color Scheme Strategy</h3>
              <p className="text-[#593116] text-lg mb-4">
                Choose colors that reflect your brand and ensure readability:
              </p>
              <aside className="bg-[#DBC1A4] p-4 rounded-md mb-4">
                <p className="text-[#593116] text-lg font-semibold">🎨 Color Combinations:</p>
                <CodeBlock
                  code={`/* Professional */
                  --background: #ffffff;
                  --text: #333333;
                  --accent: #0066cc;

                  /* Creative */
                  --background: #f5f0ff;
                  --text: #2d1832;
                  --accent: #7c4dff;

                  /* Minimal */
                  --background: #fafafa;
                  --text: #212121;
                  --accent: #424242;`}
                  language="css"
                  fileName="color-schemes"
                />
              </aside>
            </section>
          </div>
        </section>

        {/* Content Organization */}
        <section aria-labelledby="content-organization">
          <h2 id="content-organization" className="text-4xl font-bold text-[#593116] mt-8 mb-4">
            Content Organization
          </h2>

          <div className="flex flex-col gap-6">
            {/* Link Prioritization */}
            <section>
              <h3 className="text-2xl font-bold text-[#593116]">Link Prioritization</h3>
              <p className="text-[#593116] text-lg">
                Organize your links strategically:
              </p>
              <ul className="list-disc pl-8 text-[#593116] text-lg">
                <li>Place your most important/current links at the top</li>
                <li>Group similar links together (e.g., social media, portfolio works)</li>
                <li>Limit to 7-10 links for optimal engagement</li>
                <li>Use clear, action-oriented titles (e.g., "Watch My Latest Video" instead of just "YouTube")</li>
              </ul>
            </section>

            {/* Bio Writing */}
            <section>
              <h3 className="text-2xl font-bold text-[#593116]">Bio Optimization</h3>
              <aside className="bg-[#DBC1A4] p-4 rounded-md my-4">
                <p className="text-[#593116] text-lg font-semibold">✍️ Bio Examples:</p>
                <div className="text-[#593116] text-lg">
                  <p className="mb-2">🎯 Professional:</p>
                  <p className="ml-4 mb-3">
                    "Full-stack developer crafting user-friendly web solutions | Open source contributor | Tech writer"
                  </p>
                  <p className="mb-2">🎨 Creative:</p>
                  <p className="ml-4 mb-3">
                    "Digital artist turning imagination into reality | NFT creator | Teaching art on YouTube"
                  </p>
                  <p className="mb-2">🚀 Entrepreneur:</p>
                  <p className="ml-4">
                    "Founder @TechStartup | Helping businesses scale through AI | Speaker & Mentor"
                  </p>
                </div>
              </aside>
            </section>
          </div>
        </section>

        {/* Performance Tips */}
        <section aria-labelledby="performance-tips">
          <h2 id="performance-tips" className="text-4xl font-bold text-[#593116] mt-8 mb-4">
            Performance Optimization
          </h2>

          <div className="flex flex-col gap-6">
            {/* Image Optimization */}
            <section>
              <h3 className="text-2xl font-bold text-[#593116]">Image Optimization</h3>
              <p className="text-[#593116] text-lg mb-4">
                Optimize your images for faster loading:
              </p>
              <CodeBlock
                code={`// Recommended image sizes
                Profile Picture: 400x400px
                Icons: 64x64px
                Background Images: max 1MB

                // Image formats
                Profile & Icons: .webp or .png
                Background: .jpg for photos, .svg for patterns`}
                language="plaintext"
                fileName="image-optimization"
              />
            </section>

            {/* Analytics Integration */}
            <section>
              <h3 className="text-2xl font-bold text-[#593116]">Monitor Your Success</h3>
              <p className="text-[#593116] text-lg mb-4">
                Key metrics to track:
              </p>
              <ul className="list-disc pl-8 text-[#593116] text-lg">
                <li>Click-through rates per link</li>
                <li>Peak traffic times</li>
                <li>Visitor demographics</li>
                <li>Average time on page</li>
                <li>Mobile vs desktop usage</li>
              </ul>
            </section>
          </div>
        </section>

        {/* Mobile Optimization */}
        <section aria-labelledby="mobile-optimization">
          <h2 id="mobile-optimization" className="text-4xl font-bold text-[#593116] mt-8 mb-4">
            Mobile Optimization
          </h2>

          <div className="flex flex-col gap-6">
            <p className="text-[#593116] text-lg">
              Ensure your links page looks great on mobile devices:
            </p>
            <ul className="list-disc pl-8 text-[#593116] text-lg">
              <li>Test on multiple devices and screen sizes</li>
              <li>Use adequate button spacing (minimum 44x44px touch targets)</li>
              <li>Ensure text is readable without zooming</li>
              <li>Optimize images for faster mobile loading</li>
            </ul>

            <aside className="bg-[#DBC1A4] p-4 rounded-md mt-2">
              <p className="text-[#593116] text-lg font-semibold">📱 Mobile-First Tips:</p>
              <ul className="list-disc pl-8 text-[#593116] text-lg">
                <li>Keep your bio concise and scannable</li>
                <li>Use high-contrast colors for better readability</li>
                <li>Test your page&apos;s loading speed on mobile networks</li>
                <li>Ensure buttons have adequate touch targets</li>
              </ul>
            </aside>
          </div>
        </section>

        <footer className="mt-8 pt-4 border-t border-[#9C6644] text-center">
          <p className="text-[#593116]">
            <strong>Last Updated:</strong>{" "}
            <time dateTime={lastUpdated}>{lastUpdated}</time> by{" "}
            <span itemProp="author">@{authorName}</span>
          </p>
          <p className="text-[#593116] text-sm mt-2">
            Have suggestions for more tips? Share them in our{" "}
            <Link href="https://github.com/egeuysall/links/discussions">
              <span className="font-bold text-[#7F5539]">
                GitHub repository
              </span>
            </Link>
            .
          </p>
        </footer>
      </article>
    </main>
  );
}