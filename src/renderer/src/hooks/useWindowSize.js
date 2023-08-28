import { useState, useLayoutEffect } from 'react'

const useWindowSize = (el) => {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!el) return
      setSize([el.innerWidth || el.offsetWidth, el.innerHeight || el.offsetHeight])
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [el])

  return size
}

export default useWindowSize
