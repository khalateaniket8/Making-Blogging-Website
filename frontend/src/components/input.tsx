import { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold mb-1.5">{label}</label>
    <input
      ref={ref}
      className="w-full px-3 py-2.5 border border-[--border] rounded-md text-sm"
      {...props}
    />
    {error && <p className="text-xs text-[--danger] mt-1">{error}</p>}
  </div>
))

Input.displayName = 'Input'
export default Input