
import { Share2 } from 'lucide-react'

function ShareButton({ title = 'BlogSphere Blog' }) {
  const handleShare = async () => {
    const shareData = {
      title,
      text: `Check out this blog: ${title}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Blog link copied to clipboard!')
      }
    } catch (error) {
      console.log('Share cancelled or failed:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 font-medium text-stone-600 transition hover:bg-stone-50 hover:text-orange-700"
    >
      <Share2 size={18} />
      Share
    </button>
  )
}

export default ShareButton
