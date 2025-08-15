import * as React from "react";

export function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor" 
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.99998 14.6667C11.6819 14.6667 14.6666 11.6819 14.6666 8.00004C14.6666 4.31814 11.6819 1.33337 7.99998 1.33337C4.31808 1.33337 1.33331 4.31814 1.33331 8.00004C1.33331 11.6819 4.31808 14.6667 7.99998 14.6667Z" />
      <path d="M7.99998 1.33337C6.28814 3.13081 5.33331 5.51787 5.33331 8.00004C5.33331 10.4822 6.28814 12.8693 7.99998 14.6667C9.71182 12.8693 10.6666 10.4822 10.6666 8.00004C10.6666 5.51787 9.71182 3.13081 7.99998 1.33337Z" />
      <path d="M1.33331 8H14.6666" />
    </svg>
  );
}
