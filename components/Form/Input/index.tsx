import React, { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export interface ControlledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showError?: boolean;
}

/**
 * Controlled Input Component
 **/
export const Input = React.forwardRef<HTMLInputElement, ControlledInputProps>(
  (
    {
      className,
      name = "",
      type,
      showError = true,
      defaultValue,
      id,
      ...props
    },
    ref
  ) => {
    const { control, setValue } = useFormContext();
    const {
      field,
      fieldState: { error },
      formState: { isSubmitting },
    } = useController({
      name,
      control,
    });

    useEffect(() => {
      const input = document.getElementById(id ?? "") as HTMLInputElement;
      if (input && defaultValue) input.value = "" + defaultValue ?? "";
    }, [defaultValue, id, name]);

    return (
      <div className="w-full">
        <div className={`relative flex w-full flex-col overflow-hidden`}>
          <input
            {...field}
            type={type}
            ref={ref}
            id={id}
            className={twMerge(
              `flex w-full rounded-md border ${
                error ? "border-red-600" : "border-shade-medium/80"
              } bg-transparent px-3 py-2 text-shade-dark font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-shade-medium/50 placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80`,
              className
            )}
            disabled={isSubmitting}
            {...props}
          />
        </div>
        {showError && error?.message && (
          <p className="text-xs text-red-600">{error?.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
