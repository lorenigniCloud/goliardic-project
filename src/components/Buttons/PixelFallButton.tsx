import { motion, useAnimate } from "framer-motion";
import { useCallback, useState } from "react";

import styled from "styled-components";

const ButtonContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background-color: #282c34;
  border: 2px solid #00cc88;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  &:hover {
    border-color: #00ff99;
  }
`;

const PixelGrid = styled.div<{
  gridCols: number;
  gridRows: number;
  pixelSize: number;
}>`
  display: grid;
  grid-template-columns: repeat(${({ gridCols }) => gridCols}, 1fr);
  grid-template-rows: repeat(${({ gridRows }) => gridRows}, 1fr);
  gap: 1px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Pixel = styled(motion.div)<{ pixelSize: number }>`
  width: ${({ pixelSize }) => pixelSize}px;
  height: ${({ pixelSize }) => pixelSize}px;
  background-color: #00cc88;
  border-radius: 1px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00cc88;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  z-index: 10;
`;

interface IPixelFallButtonProps {
  width?: number;
  height?: number;
  gridCols?: number;
  gridRows?: number;
  onComplete?: () => void;
}

// Pattern per la scritta "LOADING" - coordinate [riga, colonna] in una griglia 30x15
const LOADING_PATTERN = [
  // L (colonne 1-3, righe 3-9)
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 1],
  [9, 1],
  [9, 2],
  [9, 3],

  // O (colonne 5-7, righe 3-9)
  [3, 5],
  [3, 6],
  [3, 7],
  [4, 5],
  [4, 7],
  [5, 5],
  [5, 7],
  [6, 5],
  [6, 7],
  [7, 5],
  [7, 7],
  [8, 5],
  [8, 7],
  [9, 5],
  [9, 6],
  [9, 7],

  // A (colonne 9-11, righe 3-9)
  [3, 9],
  [3, 10],
  [3, 11],
  [4, 9],
  [4, 11],
  [5, 9],
  [5, 11],
  [6, 9],
  [6, 10],
  [6, 11],
  [7, 9],
  [7, 11],
  [8, 9],
  [8, 11],
  [9, 9],
  [9, 11],

  // D (colonne 13-15, righe 3-9)
  [3, 13],
  [3, 14],
  [4, 13],
  [4, 15],
  [5, 13],
  [5, 15],
  [6, 13],
  [6, 15],
  [7, 13],
  [7, 15],
  [8, 13],
  [8, 15],
  [9, 13],
  [9, 14],

  // I (colonna 17, righe 3-9)
  [3, 17],
  [4, 17],
  [5, 17],
  [6, 17],
  [7, 17],
  [8, 17],
  [9, 17],

  // N (colonne 19-23, righe 3-9) - più larga con diagonale definita
  [3, 19],
  [3, 23],
  [4, 19],
  [4, 20],
  [4, 23],
  [5, 19],
  [5, 21],
  [5, 23],
  [6, 19],
  [6, 22],
  [6, 23],
  [7, 19],
  [7, 22],
  [7, 23],
  [8, 19],
  [8, 23],
  [9, 19],
  [9, 23],

  // G (colonne 25-27, righe 3-9) - spostata per fare spazio alla N
  [3, 25],
  [3, 26],
  [3, 27],
  [4, 25],
  [5, 25],
  [6, 25],
  [6, 26],
  [6, 27],
  [7, 25],
  [7, 27],
  [8, 25],
  [8, 27],
  [9, 25],
  [9, 26],
  [9, 27],
];

export const PixelFallButton = ({
  width = 320,
  height = 160,
  gridCols = 30,
  gridRows = 15,
  onComplete,
}: IPixelFallButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [scope, animate] = useAnimate();

  const pixelSize = Math.min(
    (width - (gridCols - 1)) / gridCols,
    (height - (gridRows - 1)) / gridRows,
  );

  const shouldKeepPixel = useCallback((row: number, col: number): boolean => {
    // Controlla direttamente se la posizione [row, col] è nel pattern LOADING
    return LOADING_PATTERN.some(([pRow, pCol]) => pRow === row && pCol === col);
  }, []);

  const handleClick = async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Anima tutti i pixel che non fanno parte del pattern "LOADING"
    const pixels = scope.current?.querySelectorAll(".pixel");

    if (pixels) {
      const animations = Array.from(pixels).map((pixel, index) => {
        const row = Math.floor(index / gridCols);
        const col = index % gridCols;

        if (shouldKeepPixel(row, col)) {
          // Mantieni i pixel che formano "LOADING" con un piccolo effetto
          return animate(
            pixel,
            {
              scale: [1, 1.2, 1],
              backgroundColor: ["#00cc88", "#00ff99", "#00cc88"],
            },
            {
              duration: 0.5,
              delay: Math.random() * 0.2,
            },
          );
        } else {
          // Fai cadere gli altri pixel
          return animate(
            pixel,
            {
              y: window.innerHeight + 100,
              rotate: Math.random() * 360,
              scale: [1, 0.8, 0],
              opacity: [1, 0.8, 0],
            },
            {
              duration: 1.5 + Math.random() * 0.5,
              delay: Math.random() * 0.3,
              ease: "easeIn",
            },
          );
        }
      });

      // Mostra "Loading" dopo un breve delay
      //   setTimeout(() => {
      //     setShowLoading(true);
      //   }, 500);

      await Promise.all(animations);

      // Callback opzionale quando l'animazione è completa
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setShowLoading(false);

    // Reset tutti i pixel
    const pixels = scope.current?.querySelectorAll(".pixel");
    if (pixels) {
      pixels.forEach((pixel: any) => {
        animate(
          pixel,
          {
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            backgroundColor: "#00cc88",
          },
          { duration: 0 },
        );
      });
    }
  };

  return (
    <ButtonContainer
      width={width}
      height={height}
      onClick={handleClick}
      onDoubleClick={resetAnimation}
    >
      <PixelGrid
        ref={scope}
        gridCols={gridCols}
        gridRows={gridRows}
        pixelSize={pixelSize}
      >
        {Array.from({ length: gridCols * gridRows }).map((_, index) => {
          const row = Math.floor(index / gridCols);
          const col = index % gridCols;

          return (
            <Pixel
              key={`${row}-${col}`}
              className="pixel"
              pixelSize={pixelSize}
              initial={{ y: 0, rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              style={{
                opacity:
                  shouldKeepPixel(row, col) && showLoading
                    ? 1
                    : showLoading
                    ? 0
                    : 1,
              }}
            />
          );
        })}
      </PixelGrid>

      {/* {showLoading && (
        <LoadingContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            LOADING...
          </motion.div>
        </LoadingContainer>
      )} */}
    </ButtonContainer>
  );
};
