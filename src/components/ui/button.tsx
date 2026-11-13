import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "success" | "destructive" | "warning";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  ghost: "button-ghost",
  success: "button-success",
  destructive: "button-destructive",
  warning: "button-warning",
};
const sizeClasses: Record<ButtonSize, string> = { sm: "button-sm", md: "button-md", lg: "button-lg" };

export function Button({ variant = "primary", size = "md", loading = false, children, className = "", disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; children: ReactNode }) {
  return <button {...props} disabled={disabled || loading} aria-busy={loading || undefined} className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>{loading && <span aria-hidden="true" className="button-spinner" />}{loading ? "Working…" : children}</button>;
}
