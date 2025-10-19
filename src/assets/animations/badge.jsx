import { cn } from "../../lib/utils";

export function Badge({ variant = "default", className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
        variant === "default" && "bg-blue-100 text-blue-800",
        variant === "success" && "bg-green-100 text-green-800",
        variant === "warning" && "bg-yellow-100 text-yellow-800",
        variant === "danger" && "bg-red-100 text-red-800",
        className
      )}
      {...props}
    />
  );
}
