import { z } from 'zod';

export const canvasOptionsSchema = z.object({
  canvasSizes: z.enum(['f4', 'a4p', 'a4l', 'a5p', 'a5l']),
  lettersCount: z.coerce.number().min(1).max(1_000_000),
  colsCount: z.coerce.number().min(1).max(1_000),
});

export type CanvasOptionsData = z.infer<typeof canvasOptionsSchema>;
