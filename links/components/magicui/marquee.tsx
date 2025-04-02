"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "motion/react";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * The class name to apply to the component.
   */
  className?: string;
  /**
   * Whether or not to reverse the direction of the marquee.
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether or not to pause the marquee when the user hovers over the component.
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Whether or not to display the marquee vertically.
   * @default false
   */
  vertical?: boolean;
  /**
   * The content to display in the marquee.
   */
  children: React.ReactNode;
  /**
   * The margin size between items in pixels.
   * @default 4
   */
  margin?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  margin = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const duration = className?.match(/\[--duration:(\d+)s\]/)?.[1] || "40";
  const durationInSeconds = parseInt(duration);
  const controls = useAnimationControls();
  const [isHovering, setIsHovering] = useState(false);
  
  // Measure content dimensions after render
  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
        setContentHeight(contentRef.current.offsetHeight);
      }
    };
    
    // Initial measurement
    updateDimensions();
    
    // Setup ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(updateDimensions);
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [children]);
  
  // Start animation once we have dimensions
  useEffect(() => {
    if ((vertical && contentHeight > 0) || (!vertical && contentWidth > 0)) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, contentWidth, contentHeight, vertical, reverse, durationInSeconds]);
  
  // Handle pause on hover
  useEffect(() => {
    if (pauseOnHover && isHovering) {
      controls.stop();
    } else if ((vertical && contentHeight > 0) || (!vertical && contentWidth > 0)) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, isHovering, pauseOnHover, contentWidth, contentHeight, vertical, reverse, durationInSeconds]);

  const startAnimation = () => {
    controls.start({
      x: vertical ? 0 : reverse ? contentWidth : -contentWidth,
      y: vertical ? (reverse ? contentHeight : -contentHeight) : 0,
      transition: {
        duration: durationInSeconds,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        repeatDelay: 0,
      },
    });
  };

  // We only need to render two copies of the content for an infinite loop effect
  // This is more performant than rendering many copies
  const marginStyle = {
    margin: `${vertical ? `${margin}px 0` : `0 ${margin}px`}`,
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className={cn("flex", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}
        animate={controls}
        initial={{ x: 0, y: 0 }}
      >
        <div ref={contentRef} className="flex shrink-0 items-center" style={marginStyle}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={marginStyle}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}