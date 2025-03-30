import React from "react";
import changes from "./changes";  // correct import as it's in the same directory
import Change from "../../components/Change";  // adjust path if needed

const ChangelogPage = () => {
  // Sort changes by date (most recent first)
  const sortedChanges = [...changes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="w-full h-full flex items-center justify-center flex-col gap-8">
      <section className="flex flex-col gap-4 w-full">
        <h1 className="text-5xl font-bold text-center text-[#593116] tracking-tighter break-normal whitespace-normal">
          Changelog
        </h1>
        <p className="text-center text-[#593116] tracking-tight text-xl">
          Stay up to date with the latest improvements, features, and fixes. The changelog documents 
          every step of our journey, ensuring continuous progress.
        </p>
      </section>

      {/* All changes in a simple list */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-4 mb-24">
        {sortedChanges && sortedChanges.length > 0 ? (
          sortedChanges.map((change) => (
            <Change
              key={change.id}
              id={change.id}
              title={change.title}
              desc={change.desc}
              date={change.date}
            />
          ))
        ) : (
          <p>No changelog entries available</p>
        )}
      </section>
    </main>
  );
};

export default ChangelogPage;
