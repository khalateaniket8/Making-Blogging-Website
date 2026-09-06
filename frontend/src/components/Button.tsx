import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'dark' | 'outline'
}

export default function Button({ variant = 'dark', className = '', ...props }: Props) {
  const base = 'px-4 py-2.5 rounded-md text-sm font-semibold transition-colors'
  const variants = {
    accent: 'bg-[--accent] text-white border border-[--accent] hover:opacity-90',
    dark: 'bg-[--ink] text-white border border-[--ink] hover:opacity-90',
    outline: 'bg-transparent text-[--ink] border border-[--ink] hover:bg-gray-50',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}