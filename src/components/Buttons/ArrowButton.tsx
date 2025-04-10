import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const CustomLi = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 1rem;
  width: auto;
`;

const ButtonLink = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: #06c;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

interface ButtonUnderlinedLinkProps {
  text: string;
  textColorOnHover: string;
}

const ArrowButton = (props: ButtonUnderlinedLinkProps) => {
  const [x, setX] = useState<number>(0);
  const [color, setColor] = useState<string>("black");
  const { text, textColorOnHover } = props;

  return (
    <CustomLi className="example">
      <ButtonLink
        style={{ color: `${color}` }}
        onMouseOver={() => {
          setX(x + 8);
          setColor(textColorOnHover);
        }}
        onMouseLeave={() => {
          setX(x - 8);
          setColor("black");
        }}
      >
        {text}
      </ButtonLink>
      <motion.svg
        animate={{ x }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        color={`${textColorOnHover}`}
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        className="bi bi-arrow-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
        />
      </motion.svg>
    </CustomLi>
  );
};

export default ArrowButton;
