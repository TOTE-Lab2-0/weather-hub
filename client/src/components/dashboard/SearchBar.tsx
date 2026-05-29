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
      setInput('')
      console.error(err)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mb-2">
        <div className="relative flex-1">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setError('')
            }}
            type="text"
            placeholder="Search for a city..."
            className={`w-full px-5 py-3 pl-14 rounded-l-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#09b8d4] ${error ? 'border-red-400' : 'border-slate-300'}`}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-r-lg bg-[#09b8d4] text-white font-semibold text-sm hover:bg-[#09b8d4]/80"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-400 text-xs mt-1 pl-1 mb-8">{error}</p>}
    </>
  );
};

export default SearchBar;
