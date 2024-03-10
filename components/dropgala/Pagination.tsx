import Link from '@components/dropgala/common/Link';

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <div className="space-y-2 px-5 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            rel="previous"
            className="cursor-auto rounded-sm border border-blue-100 bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`
            }
          >
            <button
              rel="previous"
              className="rounded-sm border border-blue-100 bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Previous
            </button>
          </Link>
        )}
        <div className="flex items-center justify-center text-gray-500">
          <div className="text-xl">{currentPage}</div>
          <div className="mx-1 text-sm uppercase">of</div>
          <div className="text-lg">{totalPages}</div>
        </div>
        {!nextPage && (
          <button
            rel="next"
            className="cursor-auto rounded-sm border border-blue-100 bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button
              rel="next"
              className="rounded-sm border border-blue-100 bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Next
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}
