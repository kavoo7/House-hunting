type SkeletonProps = {
  className?: string;
  shape?: "text" | "rectangular" | "circle";
  width?: string;
  height?: string;
};

export function Skeleton({ className = "", shape = "rectangular", width, height }: SkeletonProps) {
  const shapeClass = shape === "circle" ? "rounded-full" : shape === "text" ? "rounded-md" : "rounded-lg";

  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse motion-reduce:animate-none bg-sand/45 ${shapeClass} ${className}`}
      style={{ width, height }}
    />
  );
}
