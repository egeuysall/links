import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import changes from "../changes";
import type { ChangelogEntry } from "../changes";

// Remove the custom PageProps interface entirely

export default async function ChangelogEntryPage({
  params,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params;

  // Find the specific change entry
  const entry = changes.find((change) => change.id === id);

  if (!entry) {
    notFound();
  }

  return (
    <main className="w-full h-full flex items-center justify-center flex-col gap-8 p-4">
      <div className="w-full max-w-4xl">
        <Link
          href="/docs/changelog"
          className="text-[#7F5539] hover:underline mb-6 inline-block"
        >
          ← Back to Changelog
        </Link>

        <article className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Image
              width={32}
              height={32}
              alt={`${entry.title} icon`}
              src={entry.iconPath}
            />
            <h1 className="text-xl font-semibold">{entry.title}</h1>
          </div>

          <p className="text-sm text-[#7F5539]/80 mb-4">{entry.date}</p>

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
