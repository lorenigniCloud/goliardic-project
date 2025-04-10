import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import styled from "styled-components";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  color?: string;
}

const LinkStyle = styled.a<{ color?: string }>`
  position: relative;
  text-decoration: none;
  color: ${({ color }) => color || "#00cc88"};
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  &:hover {
    text-decoration: none;
  }
`;

const Underline = styled(motion.div)<{ color?: string }>`
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 4px;
  background-color: ${({ color }) => color || "#00cc88"};
`;

export const AnimatedLink = ({
  href,
  children,
  color = "#00cc88",
}: AnimatedLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <LinkStyle
      href={href}
      color={color}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <Underline
            color={color}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </LinkStyle>
  );
};
