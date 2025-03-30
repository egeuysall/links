import Image from "next/image";
import Link from "next/link";
import changes from "../changes";
import { IoArrowBack } from "react-icons/io5";

// Import just the base interfaces we need without redefining them
import type { AppProps } from "next/app";

export default async function ChangelogEntryPage(props: unknown) {
  // Use type assertion to work with the props
  const { params } = props as { params: Promise<{ id: string }> };

  // Await the params
  const { id } = await params;

  // Find the entry
  const entry = changes.find((change) => change.id === id);

  // Simple error handling
  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-full">
        <Link
          href="/docs/changelog"
          className="text-[#7F5539] hover:underline mb-6 flex items-center gap-1"
        >
          <IoArrowBack />
          Back to Changelog
        </Link>

        <article className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-2">
            <Image
              width={24}
              height={24}
              alt={`${entry.title} icon`}
              src="/logos/input-logo.svg"
            />
            <div className="pt-2">
              <h4 className="text-2xl text-[#593116] font-bold">
                {entry.title}
              </h4>
              <p className="text-sm text-[#7F5539] mb-2">{entry.date}</p>
            </div>
          </div>

          <div className="border-t-2 border-[#7F5539]">
            <p className="mb-2 mt-4 font-bold text-[#593116]">{entry.desc}</p>
            {entry.detailedDesc && (
              <div className="mt-2">
                <p className="text-[#593116]">{entry.detailedDesc}</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
