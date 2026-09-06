
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!showButton) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-700"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default BackToTop
