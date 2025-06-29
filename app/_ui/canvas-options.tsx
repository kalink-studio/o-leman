import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Select,
  SelectItem,
  Switcher,
  TextField,
} from '@kalink-ui/seedly';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { CanvasSketchProps } from './canvas';
import { canvasOptionsForm } from './canvas-options.css';
import {
  CanvasOptionsData,
  canvasOptionsSchema,
} from './canvas-options.schema';

interface CanvasOptionsProps {
  onOptionsChange: (data: CanvasSketchProps) => void;
}

const canvasSizePresets: Record<string, { cols: number }> = {
  f4: { cols: 250 },
  a4p: { cols: 250 },
  a4l: { cols: 400 },
  a5p: { cols: 250 },
  a5l: { cols: 400 },
};

export function CanvasOptions({ onOptionsChange }: CanvasOptionsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CanvasOptionsData>({
    mode: 'onChange',
    resolver: zodResolver(canvasOptionsSchema),
    defaultValues: {
      canvasSizes: 'f4',
      lettersCount: 100_000,
      colsCount: 250,
    },
  });

  const selectedSize = useWatch({ control, name: 'canvasSizes' });

  useEffect(() => {
    const preset = canvasSizePresets[selectedSize];

    if (preset) {
      setValue('colsCount', preset.cols);
    }
  }, [selectedSize, setValue]);

  function onSubmit(data: CanvasOptionsData) {
    let canvasWidth: number;
    let canvasHeight: number;

    switch (data.canvasSizes) {
      case 'f4':
        canvasWidth = 10547;
        canvasHeight = 15118;
        break;

      case 'a4p':
        canvasWidth = 2480; // A4 at 300DPI
        canvasHeight = 3508; // A4 at 300DPI
        break;
      case 'a4l':
        canvasWidth = 3508; // A4 at 300DPI
        canvasHeight = 2480; // A4 at 300DPI
        break;

      case 'a5p':
        canvasWidth = 1748; // A5 at 300DPI
        canvasHeight = 2480; // A5 at 300DPI
        break;
      case 'a5l':
        canvasWidth = 2480; // A5 at 300DPI
        canvasHeight = 1748; // A5 at 300DPI
        break;

      default:
        throw new Error('Unknown canvas size');
    }

    onOptionsChange({
      ...data,
      canvasWidth,
      canvasHeight,
    });
  }

  return (
    <Switcher
      use="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      className={canvasOptionsForm}
    >
      <Controller
        key={'canvasSize'}
        control={control}
        name={'canvasSizes'}
        render={({ field, fieldState }) => (
          <Select
            name={field.name}
            label={'Select a canvas size'}
            errors={fieldState.error?.message || ''}
            onValueChange={field.onChange}
            value={field.value}
          >
            {[
              {
                label: 'F4',
                value: 'f4',
              },
              {
                label: 'A4 (portrait)',
                value: 'a4p',
              },
              {
                label: 'A4 (landscape)',
                value: 'a4l',
              },
              {
                label: 'A5 (portrait)',
                value: 'a5p',
              },
              {
                label: 'A5 (landscape)',
                value: 'a5l',
              },
            ].map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <TextField
        type="number"
        label="Letters count"
        {...register('lettersCount')}
        errors={errors.lettersCount?.message || ''}
      />
      <TextField
        type="number"
        label="Columns count"
        {...register('colsCount')}
        errors={errors.colsCount?.message || ''}
      />
      <Button variant="plain" type="submit">
        {'Update'}
      </Button>
    </Switcher>
  );
}
