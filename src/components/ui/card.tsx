import * as React from "react";
import { cn } from "@/lib/utils"; // Nếu chưa có, có thể bỏ dòng này

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-2xl bg-white/10 backdrop-blur p-4 shadow-md border border-white/20 ${className}`}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`mt-4 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";
