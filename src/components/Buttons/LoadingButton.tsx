import { motion, useAnimate } from "framer-motion";
import styled, { keyframes } from "styled-components";

import { useState } from "react";

const ButtonStyle = styled.button<{ size: number }>`
  padding: 0;
  border-radius: 50%;
  background-color: #282c34;
  font-size: ${({ size }) => size * 0.3}px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const SvgStyle = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ size: number }>`
  border: ${({ size }) => size * 0.05}px solid #f3f3f3;
  border-top: ${({ size }) => size * 0.05}px solid #00cc88;
  border-radius: 50%;
  width: ${({ size }) => size * 0.3}px;
  height: ${({ size }) => size * 0.3}px;
  animation: ${spin} 1s linear infinite;
`;

interface ILoadingButtonProps {
  size?: number;
  strokeWidth?: number;
}

export const LoadingButton = ({
  size = 80,
  strokeWidth = 4,
}: ILoadingButtonProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [scope, animate] = useAnimate();
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;

  const fakePromise = async (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };

  const handleClick = async () => {
    setStatus("loading");

    animate(
      scope.current,
      {
        strokeDasharray: `${circumference}px ${circumference}px`,
        strokeDashoffset: 0,
      },
      { duration: 1.5, repeat: Infinity },
    );

    await fakePromise(5000);

    animate(
      scope.current,
      { strokeDashoffset: `${circumference}px` },
      { duration: 0.5 },
    );
    setStatus("complete");
  };

  return (
    <ButtonStyle onClick={handleClick} size={size}>
      {status === "loading" ? (
        <Spinner size={size} />
      ) : status === "complete" ? (
        "✅"
      ) : (
        "Click Me"
      )}
      <SvgStyle viewBox={`0 0 ${size} ${size}`}>
        <motion.circle
          ref={scope}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00cc88"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference}px ${circumference}px`}
          strokeDashoffset={`${circumference}px`}
        />
      </SvgStyle>
    </ButtonStyle>
  );
};
