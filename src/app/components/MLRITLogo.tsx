import React from "react";

interface MLRITLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const MLRITLogo: React.FC<MLRITLogoProps> = ({ width = 520, height = 200, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 200"
      width={width}
      height={height}
      className={className}
    >
      {/* Gear / Cog Shape */}
      <g transform="translate(80, 100)">
        {/* Gear teeth */}
        <path
          d="
            M 0,-62 L 6,-62 L 8,-55 L 12,-55 L 14,-62 L 20,-60
            A 62,62 0 0,1 42,-44
            L 48,-50 L 52,-47 L 48,-41 L 52,-38 L 58,-42 L 60,-36
            A 62,62 0 0,1 62,0
            L 62,6 L 55,8 L 55,12 L 62,14 L 60,20
            A 62,62 0 0,1 44,42
            L 50,48 L 47,52 L 41,48 L 38,52 L 42,58 L 36,60
            A 62,62 0 0,1 0,62
            L -6,62 L -8,55 L -12,55 L -14,62 L -20,60
            A 62,62 0 0,1 -42,44
            L -48,50 L -52,47 L -48,41 L -52,38 L -58,42 L -60,36
            A 62,62 0 0,1 -62,0
            L -62,-6 L -55,-8 L -55,-12 L -62,-14 L -60,-20
            A 62,62 0 0,1 -44,-42
            L -50,-48 L -47,-52 L -41,-48 L -38,-52 L -42,-58 L -36,-60
            A 62,62 0 0,1 0,-62
            Z
          "
          fill="#3A7D2C"
        />
        {/* Inner circle cutout */}
        <circle cx="0" cy="0" r="38" fill="#3A7D2C" />
        <circle cx="0" cy="0" r="28" fill="white" />

        {/* Curved arrows inside the gear */}
        {/* Outer arc arrow */}
        <path
          d="M -18,-18 A 25,25 0 0,1 18,-18"
          fill="none"
          stroke="#3A7D2C"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon
          points="18,-18 24,-12 14,-13"
          fill="#3A7D2C"
        />

        {/* Middle arc arrow */}
        <path
          d="M 14,2 A 18,18 0 0,1 -14,2"
          fill="none"
          stroke="#3A7D2C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <polygon
          points="-14,2 -20,-4 -10,-3"
          fill="#3A7D2C"
        />

        {/* Inner arc arrow */}
        <path
          d="M -8,16 A 12,12 0 0,1 8,16"
          fill="none"
          stroke="#3A7D2C"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <polygon
          points="8,16 14,22 5,20"
          fill="#3A7D2C"
        />
      </g>

      {/* MLRIT Text */}
      <text
        x="155"
        y="130"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="110"
        fontWeight="bold"
        fill="#E8751A"
        letterSpacing="2"
      >
        MLRIT
      </text>

      {/* Tagline */}
      <text
        x="195"
        y="162"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="16"
        fontStyle="italic"
        fill="#3A7D2C"
        letterSpacing="1"
      >
        Engineering Ideas, Engineering Careers
      </text>
    </svg>
  );
};

export default MLRITLogo;
