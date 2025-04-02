import { SVGProps } from "react";

export interface Iphone15ProProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
  color?: "black" | "white" | "natural" | "blue";
}

export default function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  color = "black",
  ...props
}: Iphone15ProProps) {
  // Color configurations based on iPhone model colors
  const colorSchemes = {
    black: {
      frame: "#593116",
      side: "#7F5539",
      border: "#333333",
      button: "#7F5539",
      camera: "#0A0A0A",
      cameraBorder: "#333333",
      notchBg: "#0A0A0A",
    },
    white: {
      frame: "#F5F5F5",
      side: "#E0E0E0",
      border: "#CCCCCC",
      button: "#DBDBDB",
      camera: "#1A1A1A",
      cameraBorder: "#CCCCCC",
      notchBg: "#1A1A1A",
    },
    natural: {
      frame: "#E3D0C0",
      side: "#D5C2B3",
      border: "#C7B5A6",
      button: "#C7B5A6",
      camera: "#1A1A1A",
      cameraBorder: "#C7B5A6",
      notchBg: "#1A1A1A",
    },
    blue: {
      frame: "#99B2C9",
      side: "#89A2B9",
      border: "#7992A9",
      button: "#7992A9",
      camera: "#1A1A1A",
      cameraBorder: "#7992A9",
      notchBg: "#1A1A1A",
    }
  };
  
  const theme = colorSchemes[color];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Main device frame with subtle gradients */}
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.frame} />
          <stop offset="100%" stopColor={theme.side} />
        </linearGradient>
        <filter id="phoneDropShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="5" stdDeviation="10" floodOpacity="0.2" />
        </filter>
        <filter id="buttonShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Outer frame with rounded corners and shadow */}
      <path
        d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
        fill="url(#frameGradient)"
        filter="url(#phoneDropShadow)"
      />

      {/* Volume buttons with subtle shadow */}
      <path
        d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
        fill={theme.button}
        filter="url(#buttonShadow)"
      />
      <path
        d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
        fill={theme.button}
        filter="url(#buttonShadow)"
      />
      <path
        d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
        fill={theme.button}
        filter="url(#buttonShadow)"
      />
      
      {/* Power button with subtle shadow */}
      <path
        d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
        fill={theme.button}
        filter="url(#buttonShadow)"
      />

      {/* Phone inner area with slight highlight */}
      <path
        d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
        fill={theme.frame}
      />

      {/* Screen bezel with thin border */}
      <path
        d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
        fill="#000000"
        stroke={theme.border}
        strokeWidth="0.5"
      />

      {/* Content display areas */}
      {src && (
        <image
          href={src}
          x="21.25"
          y="19.25"
          width="389.5"
          height="843.5"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}
      {videoSrc && (
        <foreignObject x="21.25" y="19.25" width="389.5" height="843.5" clipPath="url(#roundedCorners)">
          <video
            className="size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </foreignObject>
      )}

      {/* Dynamic Island notch with realistic styling */}
      <path
        d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
        fill={theme.notchBg}
      />
      
      {/* Camera lens with realistic styling */}
      <path
        d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
        fill={theme.camera}
        stroke={theme.cameraBorder}
        strokeWidth="0.5"
      />
      
      {/* Camera lens inner details */}
      <path
        d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
        fill="#666666"
      />
      <circle cx="259.5" cy="48.5" r="4" fill="#333333" />
      <circle cx="259.5" cy="48.5" r="2" fill="#111111" />
      <circle cx="258" cy="47" r="0.75" fill="#FFFFFF" opacity="0.6" />

      {/* Display reflection highlight */}
      <path
        d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
        fill="url(#screenGloss)"
        opacity="0.05"
        clipPath="url(#roundedCorners)"
      />

      {/* Screen clip path for rounded corners */}
      <defs>
        <clipPath id="roundedCorners">
          <rect
            x="21.25"
            y="19.25"
            width="389.5"
            height="843.5"
            rx="55.75"
            ry="55.75"
          />
        </clipPath>
        <linearGradient id="screenGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}