import { sys } from '@kalink-ui/seedly/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const canvasOptionsForm = style({
  alignItems: 'flex-end',
});

globalStyle('[data-radix-select-viewport]', {
  boxShadow: sys.elevation.moderate,
});
