
import { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-semibold text-stone-900">
        {label}
      </label>

      <input
        ref={ref}
        className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
)

Input.displayName = 'Input'

export default Input

