import Image from "next/image";
import Link from "next/link";
import changes from "../changes";

// Don't define any custom types here - use the project's existing types

export default async function ChangelogEntryPage(props: any) {
  // Extract id from params, handling both Promise and non-Promise cases
  const id = props.params && props.params.then 
    ? (await props.params).id 
    : props.params.id;

  // Find the entry
  const entry = changes.find((change) => change.id === id);

  // Simple error handling
  if (!entry) {
    return <div>Entry not found</div>;
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
