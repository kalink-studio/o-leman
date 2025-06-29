'use client';

import { Heading, Stack } from '@kalink-ui/seedly';
import { useState } from 'react';

import { Center } from '@/components/center';

import { CanvasSketch } from './_ui/canvas';
import { CanvasOptions } from './_ui/canvas-options';
import { CanvasOptionsData } from './_ui/canvas-options.schema';
import { main } from './page.css';

export default function Home() {
  const [options, setOptions] = useState<Partial<CanvasOptionsData>>({});

  return (
    <main className={main}>
      <Center gutters={8}>
        <Stack align="stretch" spacing={8}>
          <Heading use="h1" variant="display" size="large" align="center">
            {`o-Léman`}
          </Heading>
          <CanvasOptions onOptionsChange={setOptions} />
          <CanvasSketch {...options} />
        </Stack>
      </Center>
    </main>
  );
}
