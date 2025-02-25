import { defineConfig } from 'tsup';
import { dependencies, peerDependencies } from './package.json';

export default defineConfig({
  entry: ['src/index.ts', 'src/enum.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  target: 'node20',
  minify: false,
  // banner: { js: '"use client"' },
  outExtension: ({ format }) =>
    format === 'esm' ? { js: '.mjs' } : { js: '.cjs' },
  dts: true,
  external: [
    ...Object.keys(peerDependencies || {}),
    ...Object.keys(dependencies || {}),
  ],
});
