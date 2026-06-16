import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground tracking-wide">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`
            flex h-12 w-full rounded-md border border-border bg-input/10 px-4 py-2 text-sm text-foreground
            ring-offset-background placeholder:text-muted-foreground 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50
            transition-all duration-300 ease-in-out hover:border-ring/50
            ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
            ${className || ''}
          `}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
