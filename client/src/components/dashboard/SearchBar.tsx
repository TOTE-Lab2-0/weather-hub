const SearchBar = () => {
  return (
    <form className="flex w-full max-w-3xl mb-10">
      <input
        type="text"
        placeholder="Search for a city..."
        className="flex-1 px-5 py-4 rounded-l-lg border border-slate-300 text-lg focus:outline-none focus:ring-2 focus:ring-[#09b8d4]"
      />

      <button
        type="submit"
        className="flex-1 px-5 py-4 rounded-l-lg border border-slate-300 text-lg focus:outline-none focus:ring-2 focus:ring-[#09b8d4]"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
