"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image"

// TypeScript interface for Circle props
interface CircleProps {
  children?: React.ReactNode;
  className?: string;
}

// Create a forwardRef component for Circle
const Circle = React.forwardRef<HTMLDivElement, CircleProps>(
  ({ children, className = "" }, ref) => (
    <div
      ref={ref}
      className={`z-10 flex size-24 items-center justify-center rounded-full border-2 border-[#593116] bg-[#E6CCB2] p-2 ${className}`}
    >
      {children}
    </div>
  )
);

Circle.displayName = "Circle";

export default function Connections(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full md:w-3/4 items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <Image
                width={32}
                height={32}
                src="/icons/user.svg"
                alt="User icon"
            />
          </Circle>
          <Circle ref={div2Ref}>
          <Image
                width={20}
                height={20}
                src="/logos/input-logo.svg"
                alt="Links logo"
            />
          </Circle>
        </div>
      </div>

      {/* First beam going one direction */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-45}
      />

      {/* Second beam going the opposite direction */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={-10}
        endYOffset={-10}
        curvature={45}
        reverse
      />
    </div>
  );
}