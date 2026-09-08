
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'dark' | 'outline'
}

export default function Button({
  variant = 'dark',
  className = '',
  ...props
}: Props) {
  const base =
    'px-4 py-2.5 rounded-md text-sm font-semibold transition-colors'

  const variants = {
    accent:
      'bg-orange-600 text-white border border-orange-600 hover:bg-orange-700',

    dark:
      'bg-orange-600 text-white border border-orange-600 hover:bg-orange-700',

    outline:
      'bg-white text-stone-900 border border-stone-300 hover:bg-stone-100',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
