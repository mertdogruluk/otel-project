import * as React from "react";

export function BellIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 5.33337C4 4.27251 4.42143 3.25509 5.17157 2.50495C5.92172 1.7548 6.93913 1.33337 8 1.33337C9.06087 1.33337 10.0783 1.7548 10.8284 2.50495C11.5786 3.25509 12 4.27251 12 5.33337C12 10 14 11.3334 14 11.3334H2C2 11.3334 4 10 4 5.33337Z" />
      <path d="M6.86664 14C6.97823 14.203 7.14227 14.3722 7.34163 14.4901C7.54099 14.608 7.76836 14.6702 7.99997 14.6702C8.23159 14.6702 8.45895 14.608 8.65831 14.4901C8.85767 14.3722 9.02172 14.203 9.1333 14" />
    </svg>
  );
}
