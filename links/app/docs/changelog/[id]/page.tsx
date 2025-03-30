import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import changes from "../changes";
import type { ChangelogEntry } from "../changes";

// Define types according to your specific Next.js configuration
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate metadata for the page dynamically based on the entry
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Resolve params
  const { id } = await params;
  
  // Find the specific change entry
  const entry = changes.find((change) => change.id === id);
  
  // Return default metadata if entry not found
  if (!entry) {
    return {
      title: "Changelog Entry Not Found",
    };
  }
  
  return {
    title: `${entry.title} | Changelog`,
    description: entry.desc,
  };
}

// Optional: Generate static params for better performance
export async function generateStaticParams() {
  return changes.map((change) => ({
    id: change.id,
  }));
}

export default async function ChangelogEntryPage({ params }: PageProps) {
  // We need to await the params since it's a Promise in your configuration
  const { id } = await params;

  // Find the specific change entry
  const entry = changes.find((change) => change.id === id);

  // Handle 404 case properly
  if (!entry) {
    notFound();
  }

  return (
    <main className="w-full h-full flex items-center justify-center flex-col gap-8 p-4">
      <div className="w-full max-w-4xl">
        <Link
          href="/docs/changelog"
          className="text-[#7F5539] hover:underline mb-6 inline-block"
          aria-label="Back to Changelog"
        >
          ← Back to Changelog
        </Link>

        <article className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] p-6 rounded-lg">
          <header className="flex items-center gap-3 mb-4">
            <Image
              width={32}
              height={32}
              alt={`${entry.title} icon`}
              src={entry.iconPath}
              priority
            />
            <h1 className="text-xl font-semibold">{entry.title}</h1>
          </header>

          <time dateTime={entry.date} className="text-sm text-[#7F5539]/80 mb-4 block">
            {entry.date}
          </time>

          <div className="border-t-2 border-[#7F5539] pt-4">
            <p className="mb-4">{entry.desc}</p>
            {entry.detailedDesc && (
              <div className="mt-4">
                <p>{entry.detailedDesc}</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
