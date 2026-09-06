
import { useEffect, useState } from 'react'

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight

      if (documentHeight <= 0) {
        setProgress(0)
        return
      }

      const scrollProgress =
        (scrollTop / documentHeight) * 100

      setProgress(
        Math.min(100, Math.max(0, scrollProgress))
      )
    }

    window.addEventListener('scroll', updateProgress)

    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full bg-stone-200">
      <div
        className="h-full bg-orange-700 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ReadingProgress
