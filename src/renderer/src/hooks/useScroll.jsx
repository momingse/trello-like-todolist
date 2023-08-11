import { useEffect, useState } from 'react'

const useScroll = (el) => {
  const [scrollValue, setScrollValue] = useState(0)

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollLeft } = e.target.scrollingElement
      setScrollValue(scrollLeft)
    }

    if (!el) return
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [el])

  const scrollTo = (scrollLeft) => {
    el.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }

  return [scrollValue, scrollTo]
}

export default useScroll
