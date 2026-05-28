import { useState } from 'react'

const SaveButton = ({ weatherData, location }) => {
  const [ saved, setSaved ] = useState(false)

  const handleSave = async () => {
    try {
      const res = await fetch('/api/locations', {
        method: 'POST', 
        headers: { "Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({
          locationName: weatherData.city.locality, 
          lat: location.lat, 
          lng: location.lng
        })
      })

      if(!res.ok) {
        throw new Error('Save Failed')
      }

      setSaved(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {!saved ? 
        <div className=' flex justify-center'>
          <button className='w-96 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white/60 text-sm flex justify-center gap-2' onClick={handleSave}>☆ Save this location</button>
        </div>
      :
        <div className='flex justify-center'>
          <button className='w-96 py-3 rounded-lg bg-white/10 text-white/60 text-sm flex justify-center gap-2 border border-white/10'><span className='text-[#09b8d4]'>★</span> Location saved!</button>
        </div>
      }
    </>
  )
}

export default SaveButton