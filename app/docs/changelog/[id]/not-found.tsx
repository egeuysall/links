import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] p-6 rounded-lg text-center">
      <h2 className="mb-4">Changelog Entry Not Found</h2>
      <Link href="/changelog" className="text-[#7F5539] hover:underline">
        Back to Changelog
      </Link>
    </div>
  );
}
