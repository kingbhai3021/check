import { cn } from "../../lib/utils";

export function Button({ children, className, variant = "default", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        variant === "outline" && "border border-gray-300 text-gray-700 hover:bg-gray-100",
        variant === "ghost" && "text-gray-700 hover:bg-gray-100",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
