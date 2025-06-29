'use client';

import { Button, Center } from '@kalink-ui/seedly';
import { useRef, useEffect, useTransition } from 'react';

import { canvasStyle, canvasWrapper } from './canvas.css';

const IMAGE_VARIANTS = 6;

export interface CanvasSketchProps {
  lettersCount?: number;
  colsCount?: number;
  canvasWidth?: number;
  canvasHeight?: number;
}

export function CanvasSketch({
  lettersCount = 100_000,
  colsCount = 250,
  canvasWidth = 10547,
  canvasHeight = 15118,
}: CanvasSketchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function handleImagesLoading() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();

          img.src = src;

          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      const imagePromises: Promise<HTMLImageElement>[] = [];

      for (let i = 1; i <= IMAGE_VARIANTS; i++) {
        const src = `/letters/o_${String(i).padStart(3, '0')}.png`;

        imagePromises.push(loadImage(src));
      }

      try {
        const images = await Promise.all(imagePromises);

        drawLetters({ canvas, images, lettersCount, colsCount });
      } catch (error) {
        console.error('Error loading images:', error);
      }
    }

    handleImagesLoading();
  }, [canvasHeight, canvasWidth, colsCount, lettersCount]);

  function handleExport() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    startTransition(async () => {
      return new Promise<void>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return;
            }

            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'o-leman.png';
            link.click();

            resolve();

            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 1000);
          },
          'image/png',
          1.0,
        );
      });
    });
  }

  return (
    <>
      <div className={canvasWrapper}>
        <canvas ref={canvasRef} className={canvasStyle} />
      </div>
      <Center>
        <Button variant="plain" onClick={handleExport} disabled={isPending}>
          {isPending ? 'Exporting' : 'Export as PNG'}
        </Button>
      </Center>
    </>
  );
}

interface DrawLettersParams {
  canvas: HTMLCanvasElement;
  images: HTMLImageElement[];
  lettersCount: number;
  colsCount: number;
}

function drawLetters({
  canvas,
  images,
  lettersCount,
  colsCount,
}: DrawLettersParams) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const cols = colsCount;
  const rows = Math.ceil(lettersCount / cols);
  const cellWidth = canvasWidth / cols;
  const cellHeight = canvasHeight / rows;
  const cellSize = Math.min(cellWidth, cellHeight);
  const imageSize = cellSize * 0.9;

  let count = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (count++ >= lettersCount) return;

      const dx =
        x * cellWidth + cellWidth / 2 + (Math.random() - 0.5) * cellSize * 0.1;
      const dy =
        y * cellHeight +
        cellHeight / 2 +
        (Math.random() - 0.5) * cellSize * 0.1;
      const rotation = (Math.random() - 0.5) * 0.1;
      const imageIndex = Math.floor(Math.random() * images.length);
      const img = images[imageIndex];

      if (!img) {
        console.error(`Image at index ${imageIndex} not found`);
        continue;
      }

      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(rotation);
      ctx.drawImage(img, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
      ctx.restore();
    }
  }
}
