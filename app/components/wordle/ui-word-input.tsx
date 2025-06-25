import { memo, useMemo } from 'react'
import { cn } from '~/lib/utils'
import type { ValidationStatus } from '~/types/wordle'

export interface WordInputProps {
  word: string[]
  size?: number
  status?: ValidationStatus
}

function PureWordInputUI({ word, size = 5, status = 'idle' as ValidationStatus }: WordInputProps) {
  const squares = useMemo(() => Array(size).fill(null), [size])

  const statusClasses = {
    idle: 'border-gray-300 dark:border-gray-600',
    valid: 'border-green-500',
    invalid: 'border-red-500',
  }

  return (
    <div className="flex justify-center items-center gap-2 md:gap-3 mb-4">
      {squares.map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-14 h-14 md:w-16 md:h-16 border-4 rounded-md flex items-center justify-center text-3xl md:text-4xl font-bold uppercase bg-white dark:bg-gray-800 transition-colors duration-300',
            statusClasses[status],
          )}
        >
          {word[index] || ''}
        </div>
      ))}
    </div>
  )
}

export const WordInputUI = memo(PureWordInputUI)

