import React, { useEffect } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * TextArea Component
 **/
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, rows, name = '', defaultValue, ...props }, ref) => {
    const { control, setValue } = useFormContext()
    const {
      field,
      fieldState: { error },
      formState: { isSubmitting },
    } = useController({
      name,
      control,
    })

    useEffect(() => {
      setValue(name, defaultValue)
    }, [defaultValue])

    return (
      <div className="w-full">
        <div className={`relative flex w-full overflow-hidden`}>
          <textarea
            {...field}
            className={twMerge(
              `flex w-full rounded-md border ${
                error ? 'border-red-600' : 'border-shade-medium/80'
              } bg-transparent px-3 py-2 text-shade-dark font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-shade-medium/50 placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
              className,
            )}
            disabled={isSubmitting}
            ref={ref}
            rows={rows}
            {...props}
          />
        </div>
        {error?.message && (
          <p className="text-xs text-red-600">{error?.message}</p>
        )}
      </div>
    )
  },
)
TextArea.displayName = 'TextArea'
