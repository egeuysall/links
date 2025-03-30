import React from "react";
import CodeBlock from "../../components/CodeBlock";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Current date information for freshness
  const lastUpdated = "2025-03-30";
  const authorName = "egeuysall";

  return (
    <main className="w-full h-full flex items-center justify-center flex-col gap-8 overflow-hidden">
      {/* Section 1: Introduction with semantic HTML */}
      <section className="flex flex-col gap-4" aria-labelledby="main-heading">
        <h1
          id="main-heading"
          className="text-5xl text-center font-bold text-[#593116] tracking-tighter break-normal whitespace-normal"
        >
          Create professional links pages with ease
        </h1>

        <p className="text-center text-[#593116] tracking-tight text-xl">
          Build your own customizable links page to showcase all your important
          profiles, websites, and content in one elegant, centralized location.
        </p>

        <div className="text-sm text-[#7F5539] text-center">
          <time dateTime={lastUpdated}>Last updated: {lastUpdated}</time> by{" "}
          <span itemProp="author">@{authorName}</span>
        </div>
      </section>

      {/* Section 2: Guide with semantic HTML */}
      <article className="flex flex-col gap-2 bg-[#E6CCB2] w-full p-8 rounded-lg border-2 border-[#9C6644] mb-24">
        <header>
          <h2 className="text-4xl font-bold text-[#593116]">
            Guide to Build Your Links Page
          </h2>
          <p className="text-[#593116] text-lg">
            Whether you're a content creator, professional, or business owner,
            having a central hub for all your links provides a clean,
            professional way to share your online presence. This detailed
            tutorial will walk you through every step of creating your custom
            links page, from initial setup to final deployment.
          </p>
        </header>

        <section aria-labelledby="getting-started">
          <h3
            id="getting-started"
            className="text-3xl font-bold text-[#593116] mt-4"
          >
            Step 1: Getting Started with Links
          </h3>

          <figure className="my-4">
            <Image
              src="/images/home.jpg"
              alt="Homepage of Links showing the claim your link input field"
              width={300}
              height={400}
              className="rounded-lg"
            />
            <figcaption className="text-sm text-[#7F5539] mt-2">
              The Links homepage interface
            </figcaption>
          </figure>

          <p className="text-[#593116] text-lg">
            Begin by visiting{" "}
            <Link href="https://www.links.egeuysal.com/">
              <span className="font-bold text-[#7F5539]">Links</span>
            </Link>
            . On the homepage, you'll find a clean interface with an input field
            and a "Claim your link" button. Follow these steps:
          </p>
          <ul className="list-disc pl-8 text-[#593116] text-lg">
            <li>
              Enter your desired subdomain in the input field (e.g., "yourname")
            </li>
            <li>Click the "Claim your link" button</li>
            <li>
              You'll be redirected to the creation page at{" "}
              <Link href="https:/links.egeuysal.com/create/new-links/">
                <span className="font-bold text-[#7F5539]">
                  links.egeuysal.com/create/new-links
                </span>
              </Link>
            </li>
          </ul>

          <aside className="bg-[#DBC1A4] p-4 rounded-md mt-2 mb-4">
            <p className="text-[#593116] text-lg font-semibold">💡 Pro Tip:</p>
            <p className="text-[#593116] text-lg">
              Choose a subdomain that's memorable and aligns with your personal
              brand. Keep it short, easy to type, and professional.
            </p>
          </aside>
        </section>

        <section aria-labelledby="customizing-profile">
          <h3
            id="customizing-profile"
            className="text-3xl font-bold text-[#593116] mt-4"
          >
            Step 2: Customizing Your Profile
          </h3>

          <figure className="my-4">
            <Image
              src="/images/create.jpg"
              alt="Creation page interface showing profile customization options"
              width={300}
              height={400}
              className="rounded-lg"
            />
            <figcaption className="text-sm text-[#7F5539] mt-2">
              The profile customization interface
            </figcaption>
          </figure>

          <p className="text-[#593116] text-lg">
            The creation page offers a comprehensive form to customize your
            links page. Here's what each field represents:
          </p>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Profile Section
            </h4>
            <ul className="list-disc pl-8 text-[#593116] text-lg">
              <li>
                <strong>Username:</strong> Your display name (e.g., "John Doe"
                or "@johnsmith")
              </li>
              <li>
                <strong>Bio:</strong> A brief description about yourself (1-2
                sentences recommended)
              </li>
              <li>
                <strong>Avatar URL:</strong> The direct URL to your profile
                picture
              </li>
            </ul>
          </section>

          <aside className="bg-[#DBC1A4] p-4 rounded-md mt-2 mb-4">
            <p className="text-[#593116] text-lg font-semibold">
              🖼️ Image Hosting Guide:
            </p>
            <p className="text-[#593116] text-lg">
              For avatar and icon URLs, you need direct image links. Here's how
              to get them:
              <br />
              1. Create a free{" "}
              <a
                href="https://cloudinary.com/users/register/free"
                className="text-[#7F5539] font-bold underline"
              >
                Cloudinary account
              </a>
              <br />
              2. Upload your image to Cloudinary
              <br />
              3. Copy the direct image URL (Format:
              https://res.cloudinary.com/your-cloud-name/image/upload/...)
              <br />
              4. Alternative services:{" "}
              <a
                href="https://imgur.com/"
                className="text-[#7F5539] font-bold underline"
              >
                Imgur
              </a>{" "}
              or{" "}
              <a
                href="https://imgbb.com/"
                className="text-[#7F5539] font-bold underline"
              >
                ImgBB
              </a>
            </p>

            <figure className="my-3">
              <Image
                src="/images/original-url.jpg"
                alt="Screenshot showing how to copy a direct image URL from Cloudinary"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-1">
                Copying a direct image URL from Cloudinary
              </figcaption>
            </figure>
          </aside>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Links Section
            </h4>
            <p className="text-[#593116] text-lg">
              This is where you'll add all the links you want to display on your
              page:
            </p>
            <ul className="list-disc pl-8 text-[#593116] text-lg">
              <li>
                <strong>Title:</strong> The name of the link (e.g., "Portfolio",
                "Twitter", "YouTube")
              </li>
              <li>
                <strong>URL:</strong> The full web address including https://
                (e.g., "https://twitter.com/username")
              </li>
              <li>
                <strong>Icon URL:</strong> A direct link to an icon representing
                this link (optional)
              </li>
            </ul>

            <figure className="my-4">
              <Image
                src="/images/add-link.jpg"
                alt="Interface for adding multiple links with title, URL and icon fields"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Adding and arranging multiple links
              </figcaption>
            </figure>

            <p className="text-[#593116] text-lg mt-2">
              You can add multiple links by clicking the "Add Link" button. Each
              link can be reordered by dragging and dropping, or removed using
              the delete button.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Theme Customization
            </h4>
            <p className="text-[#593116] text-lg">
              The platform offers various customization options to match your
              personal brand:
            </p>
            <ul className="list-disc pl-8 text-[#593116] text-lg">
              <li>
                <strong>Background Color:</strong> Set the page background (HEX
                or color name)
              </li>
              <li>
                <strong>Text Color:</strong> Choose text colors that contrast
                well with your background
              </li>
              <li>
                <strong>Button Style:</strong> Select from various button styles
                (rounded, squared, etc.)
              </li>
              <li>
                <strong>Font:</strong> Choose from available font families
              </li>
            </ul>

            <figure className="my-4">
              <Image
                src="/images/customize-theme.jpg"
                alt="Theme customization panel showing color pickers and style options"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Theme customization options panel
              </figcaption>
            </figure>

            <p className="text-[#593116] text-lg mt-2">
              As you make changes, the live preview updates in real-time,
              allowing you to see exactly how your links page will appear to
              visitors.
            </p>
          </section>
        </section>

        <section aria-labelledby="deploying">
          <h3 id="deploying" className="text-3xl font-bold text-[#593116] mt-4">
            Step 3: Deploying Your Links Page
          </h3>

          <p className="text-[#593116] text-lg">
            Once you're satisfied with your design, it's time to deploy your
            links page. Follow these steps:
          </p>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Exporting Your Code
            </h4>
            <p className="text-[#593116] text-lg">
              Click the "Export Code" button at the bottom of the preview
              section. This will generate the HTML, CSS, and JavaScript code for
              your links page. You'll see a code block similar to this:
            </p>

            <figure className="my-4">
              <Image
                src="/images/export-code.jpg"
                alt="Export code button and generated code preview"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Exporting your generated code
              </figcaption>
            </figure>

            <CodeBlock
              code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Links</title>
  <meta name="description" content="Connect with Your Name across all platforms">
  <!-- Additional generated code will appear here -->
  <style>
    /* Your custom styling will be here */
  </style>
</head>
<body>
  <!-- Your links page structure will be here -->
  <script>
    // Any JavaScript functionality will be here
  </script>
</body>
</html>`}
              language="html"
              fileName="generated-code"
            />
          </section>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Setting Up GitHub Repository
            </h4>
            <p className="text-[#593116] text-lg">
              To deploy your links page, you'll need to create a GitHub
              repository:
            </p>

            <figure className="my-4">
              <Image
                src="/images/create-repo.png"
                alt="GitHub interface showing the new repository creation screen"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Creating a new GitHub repository
              </figcaption>
            </figure>

            <ol className="list-decimal pl-8 text-[#593116] text-lg">
              <li>
                Create a{" "}
                <a
                  href="https://github.com/signup"
                  className="text-[#7F5539] font-bold underline"
                >
                  GitHub account
                </a>{" "}
                if you don't already have one
              </li>
              <li>
                Click the "+" icon in the top-right corner and select "New
                repository"
              </li>
              <li>Name your repository (e.g., "my-links-page")</li>
              <li>
                Add a description (optional): "My personal links page created
                with Links"
              </li>
              <li>Choose "Public" visibility</li>
              <li>Check "Add a README file"</li>
              <li>Click "Create repository"</li>
            </ol>
          </section>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Adding Your Code to GitHub
            </h4>
            <p className="text-[#593116] text-lg">
              Next, add your generated code to the repository:
            </p>

            <figure className="my-4">
              <Image
                src="/images/add-code.jpg"
                alt="GitHub interface showing how to add a new file to repository"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Adding a new file to your GitHub repository
              </figcaption>
            </figure>

            <ol className="list-decimal pl-8 text-[#593116] text-lg">
              <li>Navigate to your new repository on GitHub</li>
              <li>Click the "Add file" button and select "Create new file"</li>
              <li>Name the file "index.html"</li>
              <li>Paste the entire code block that was generated by Links</li>
              <li>Scroll down and click "Commit new file"</li>
            </ol>
          </section>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Deploying with Vercel
            </h4>
            <p className="text-[#593116] text-lg">
              Vercel provides a quick and free way to deploy your links page:
            </p>

            <figure className="my-4">
              <Image
                src="/images/create-vercel.jpg"
                alt="Vercel dashboard showing import of GitHub repository"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Importing your GitHub repository into Vercel
              </figcaption>
            </figure>

            <ol className="list-decimal pl-8 text-[#593116] text-lg">
              <li>
                Create a{" "}
                <a
                  href="https://vercel.com/signup"
                  className="text-[#7F5539] font-bold underline"
                >
                  Vercel account
                </a>
                , preferably by signing up with your GitHub account
              </li>
              <li>Once logged in, click "Add New" and select "Project"</li>
              <li>Find and select your GitHub repository from the list</li>
              <li>The default settings should work fine - click "Deploy"</li>
              <li>
                Wait for the deployment to complete (usually takes less than a
                minute)
              </li>
              <li>
                Once deployed, Vercel will provide you with a URL (e.g.,
                my-links-page.vercel.app)
              </li>
            </ol>

            <figure className="my-4">
              <Image
                src="/images/deploy-vercel.jpg"
                alt="Vercel successful deployment screen showing the deployed URL"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Successful deployment with your new URL
              </figcaption>
            </figure>
          </section>

          <aside className="bg-[#DBC1A4] p-4 rounded-md mt-2 mb-4">
            <p className="text-[#593116] text-lg font-semibold">
              🔄 Automatic Updates:
            </p>
            <p className="text-[#593116] text-lg">
              Any changes you make to your GitHub repository will automatically
              trigger a new deployment on Vercel. To update your links page,
              simply edit the index.html file in your GitHub repository.
            </p>
          </aside>

          <section>
            <h4 className="text-2xl font-bold text-[#593116] mt-3">
              Using a Custom Domain (Optional)
            </h4>
            <p className="text-[#593116] text-lg">
              If you want to use your own domain instead of the Vercel
              subdomain:
            </p>

            <figure className="my-4">
              <Image
                src="/images/add-domain.jpg"
                alt="Vercel domain settings page showing custom domain configuration"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <figcaption className="text-sm text-[#7F5539] mt-2">
                Adding a custom domain in Vercel
              </figcaption>
            </figure>

            <ol className="list-decimal pl-8 text-[#593116] text-lg">
              <li>
                Purchase a domain from a provider like Namecheap, GoDaddy, or
                Google Domains
              </li>
              <li>In your Vercel dashboard, select your project</li>
              <li>Go to "Settings" then "Domains"</li>
              <li>Enter your domain name and click "Add"</li>
              <li>
                Follow Vercel's instructions to configure DNS settings at your
                domain provider
              </li>
            </ol>
            <p className="text-[#593116] text-lg">
              For detailed instructions on connecting your domain, refer to{" "}
              <Link href="https://vercel.com/docs/domains/working-with-domains/add-a-domain">
                <span className="font-bold text-[#7F5539]">
                  Vercel's documentation on adding domains
                </span>
              </Link>
              .
            </p>
          </section>
        </section>

        <section aria-labelledby="sharing">
          <h3 id="sharing" className="text-3xl font-bold text-[#593116] mt-4">
            Step 4: Sharing Your Links Page
          </h3>

          <figure className="my-4">
            <Image
              src="/featured-links/ege-uysal.png"
              alt="Example of a completed links page on multiple devices"
              width={300}
              height={400}
              className="rounded-lg"
            />
            <figcaption className="text-sm text-[#7F5539] mt-2">
              Your links page will look great on all devices
            </figcaption>
          </figure>

          <p className="text-[#593116] text-lg">
            Once your page is live, it's time to share it with the world:
          </p>
          <ul className="list-disc pl-8 text-[#593116] text-lg">
            <li>Add your links page URL to your social media profiles</li>
            <li>Include it in your email signature</li>
            <li>Share it on your existing websites or blogs</li>
            <li>Print it on business cards or promotional materials</li>
          </ul>
        </section>

        <section aria-labelledby="maintaining">
          <h3
            id="maintaining"
            className="text-3xl font-bold text-[#593116] mt-4"
          >
            Step 5: Maintaining Your Links Page
          </h3>
          <p className="text-[#593116] text-lg">
            Keep your links page current by updating it regularly:
          </p>
          <ul className="list-disc pl-8 text-[#593116] text-lg">
            <li>Add new links as you create new profiles or content</li>
            <li>Remove outdated links</li>
            <li>Update your bio and profile picture as needed</li>
            <li>Refresh your design periodically to keep it looking modern</li>
          </ul>
        </section>

        <aside className="bg-[#DBC1A4] p-4 rounded-md mt-4">
          <p className="text-[#593116] text-lg font-semibold">
            📈 Analytics Integration (Advanced):
          </p>
          <p className="text-[#593116] text-lg">
            To track visits to your links page, you can add Google Analytics or
            similar tracking code to your index.html file. This allows you to
            see how many people are visiting your page and which links they're
            clicking.
          </p>
          <CodeBlock
            code={`<!-- Add this before the closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
            language="html"
            fileName="analytics-code"
          />
          <p className="text-[#593116] text-lg mt-2">
            Replace G-XXXXXXXXXX with your actual Google Analytics measurement
            ID.
          </p>

          <figure className="my-4">
            <Image
              src="/images/analytics.jpg"
              alt="Google Analytics dashboard showing visitor statistics for a links page"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <figcaption className="text-sm text-[#7F5539] mt-2">
              Track your page's performance with analytics
            </figcaption>
          </figure>
        </aside>

        <footer className="mt-8 pt-4 border-t border-[#9C6644] text-center">
          <p className="text-[#593116]">
            <strong>Last Updated:</strong>{" "}
            <time dateTime="2025-03-30">March 30, 2025</time> by{" "}
            <span itemProp="author">@egeuysall</span>
          </p>
          <p className="text-[#593116] text-sm mt-2">
            If you have any questions or need assistance, please reach out
            through our{" "}
            <Link href="https://github.com/egeuysall/links/issues">
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
