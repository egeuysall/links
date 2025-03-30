"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps, Variants } from "motion/react";
import { ElementType, useEffect, useState } from "react";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

interface TextAnimateProps extends MotionProps {
  /**
   * The text content to animate
   */
  children: string;
  /**
   * The class name to be applied to the component
   */
  className?: string;
  /**
   * The class name to be applied to each segment
   */
  segmentClassName?: string;
  /**
   * The delay before the animation starts
   */
  delay?: number;
  /**
   * The duration of the animation
   */
  duration?: number;
  /**
   * Custom motion variants for the animation
   */
  variants?: Variants;
  /**
   * The element type to render
   */
  as?: ElementType;
  /**
   * How to split the text ("text", "word", "character")
   */
  by?: AnimationType;
  /**
   * Whether to start animation when component enters viewport
   */
  startOnView?: boolean;
  /**
   * Whether to animate only once
   */
  once?: boolean;
  /**
   * The animation preset to use
   */
  animation?: AnimationVariant;
  /**
   * Whether to disable animation on mobile devices
   */
  disableOnMobile?: boolean;
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.05,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.05 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.05,
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.05 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.2 },
          opacity: { duration: 0.2 },
          filter: { duration: 0.2 },
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        transition: {
          y: { duration: 0.05 },
          opacity: { duration: 0.05 },
          filter: { duration: 0.05 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.05 },
          opacity: { duration: 0.05 },
          filter: { duration: 0.05 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.05,
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.05 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.05 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.05 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.05 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.05 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.05 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.05,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.05 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.05,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.05 },
      },
    },
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.05,
  variants,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  disableOnMobile = false,
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If on mobile and animation should be disabled, render without animation
  if (isMobile && disableOnMobile) {
    return (
      <Component className={className}>
        {children}
      </Component>
    );
  }
  
  // Adjust animation behavior for mobile
  const mobileAdjustedBy = isMobile && by === "character" ? "word" : by;

  let segments: string[] = [];
  switch (mobileAdjustedBy) {
    case "word":
      segments = children.split(/(\s+)/).filter(Boolean);
      break;
    case "character":
      segments = Array.from(children);
      break;
    case "line":
      segments = children.split("\n");
      break;
    case "text":
    default:
      segments = [children];
      break;
  }

  const staggerTime = isMobile 
    ? Math.min(staggerTimings[mobileAdjustedBy], 0.03) // Reduce stagger time on mobile
    : staggerTimings[mobileAdjustedBy];

  const finalVariants = variants
    ? {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              opacity: { duration: 0.01, delay },
              delayChildren: delay,
              staggerChildren: staggerTime,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: staggerTime,
              staggerDirection: -1,
            },
          },
        },
        item: variants,
      }
    : animation
      ? {
          container: {
            ...defaultItemAnimationVariants[animation].container,
            show: {
              ...defaultItemAnimationVariants[animation].container.show,
              transition: {
                delayChildren: delay,
                staggerChildren: staggerTime,
              },
            },
            exit: {
              ...defaultItemAnimationVariants[animation].container.exit,
              transition: {
                staggerChildren: staggerTime,
                staggerDirection: -1,
              },
            },
          },
          item: defaultItemAnimationVariants[animation].item,
        }
      : { container: defaultContainerVariants, item: defaultItemVariants };

  return (
    <AnimatePresence mode="wait">
      <MotionComponent
        variants={finalVariants.container as Variants}
        initial="hidden"
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        exit="exit"
        className={cn("whitespace-pre-wrap", className)}
        viewport={{ once, margin: "-50px" }}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${mobileAdjustedBy}-${i}`}
            variants={finalVariants.item}
            custom={i * staggerTime}
            className={cn(
              mobileAdjustedBy === "line" ? "block" : "inline-block",
              // Improved whitespace handling for different segments
              mobileAdjustedBy === "character" ? "whitespace-normal" : 
              mobileAdjustedBy === "word" ? "whitespace-pre-wrap" : "",
              // Add a small right margin for character mode to prevent squishing
              mobileAdjustedBy === "character" && !segment.match(/\s/) ? "mr-[0.01em]" : "",
              segmentClassName,
            )}
            style={{
              // Prevent text from breaking in character mode
              ...(mobileAdjustedBy === "character" && {
                display: "inline-block",
                textRendering: "optimizeLegibility"
              })
            }}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
}