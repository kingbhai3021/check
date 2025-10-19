import { cn } from "../../lib/utils";

export function Icon({ icon: IconComponent, className, size = 20, ...props }) {
  return (
    <IconComponent
      className={cn("text-gray-600", className)}
      size={size}
      {...props}
    />
  );
}
