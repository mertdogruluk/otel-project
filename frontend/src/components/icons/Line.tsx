// src/components/icons/Line.tsx
import * as React from "react";

export function Line(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="1200"
      height="1"
      viewBox="0 0 1200 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1200" height="1" fill="currentColor" />
    </svg>
  );
}
