const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="search"
        id="search"
        className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300
  rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500
   outline-none"
        placeholder="Search products"
        required
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
