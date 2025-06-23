"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          value,
          onValueChange: (newValue) => {
            onValueChange(newValue)
            setIsOpen(false) // Close dropdown after selection
          },
          isOpen,
          setIsOpen,
        }),
      )}
    </div>
  )
}

const SelectTrigger = React.forwardRef(
  ({ className, children, value, onValueChange, isOpen, setIsOpen, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
    </button>
  ),
)
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, value }) => (
  <span className={value ? "" : "text-slate-500"}>{value || placeholder}</span>
)

const SelectContent = ({ children, value, onValueChange, isOpen, setIsOpen }) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop to close dropdown when clicking outside */}
      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-slate-200 bg-white shadow-lg max-h-60 overflow-auto">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: () => {
              onValueChange(child.props.value)
              setIsOpen(false)
            },
            isSelected: value === child.props.value,
          }),
        )}
      </div>
    </>
  )
}

const SelectItem = ({ children, value, onClick, isSelected, className }) => (
  <div
    className={cn(
      "px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 transition-colors",
      isSelected && "bg-slate-100 font-medium",
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
