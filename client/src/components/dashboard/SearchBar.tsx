const SearchBar = () => {
  return (
    <form className="flex w-full max-w-3xl mb-10">
      <div className="relative flex-1">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full px-5 py-4 pl-14 rounded-l-lg border border-slate-300 bg-white text-lg focus:outline-none focus:ring-2 focus:ring-[#09b8d4]"
        />
      </div>

      <button
        type="submit"
        className="px-8 py-4 rounded-r-lg bg-[#09b8d4] text-white font-semibold text-lg hover:bg-[#09b8d4]/80"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
