
import { Loader2 } from 'lucide-react'

function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2
        size={40}
        className="animate-spin text-orange-700"
      />

      <p className="mt-4 font-medium text-stone-600">
        {text}
      </p>
    </div>
  )
}

export default LoadingSpinner
