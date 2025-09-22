import React, { useState, useEffect, useRef } from 'react'

const Carousel = ({ items = [], height = 500, showDots = true }) => {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Auto-advance every 4s
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4000)

    return () => clearTimeout(timeoutRef.current)
  }, [index, items.length])

  const goTo = (i) => setIndex(i % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  if (!items || items.length === 0) return null

  return (
    <div className="w-full mx-auto" style={{ maxWidth: '900px' }}>
      <div className="relative overflow-hidden rounded-lg" style={{ height }}>
        {items.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src={src} alt={`carousel-${i}`} className="max-w-full max-h-full object-contain" />
          </div>
        ))}

        {/* Controls */}
        <button onClick={prev} className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full">
          ‹
        </button>

      </div>

      {showDots && (
        <div className="flex items-center justify-center space-x-2 mt-3">
          {items.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-cyan-400' : 'bg-gray-600'}`}></button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
