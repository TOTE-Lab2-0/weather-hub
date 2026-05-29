import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => { 
  const [input, setInput ] = useState('')
  const [error, setError ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    setError('')
    try {
      const res = await fetch(`/api/search?city=${input}`, {
        method: 'GET',
        credentials: 'include'
      })

      if(!res.ok) {
        throw new Error('Search failed')
      }

      const data = await res.json()
      const { lat, lng } = data

      navigate('/locations/current', { state: { lat, lng } })
    }catch(err) {
      setError('City not found. Please try again')
      console.error(err)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mb-10">
        <div className="relative flex-1">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search for a city..."
            className="w-full px-5 py-3 pl-14 rounded-l-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#09b8d4]"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-r-lg bg-[#09b8d4] text-white font-semibold text-sm hover:bg-[#09b8d4]/80"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default SearchBar;
