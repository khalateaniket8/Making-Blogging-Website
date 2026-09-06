
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium transition ${
        copied
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
      }`}
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}

      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}

export default CopyLinkButton
