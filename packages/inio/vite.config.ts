import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import {dirname, resolve} from 'path'

const dir = dirname(new URL(import.meta.url).pathname)

export default defineConfig(({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    server: {
      port: +(process.env.VITE_PORT ?? 3000)
    },

    plugins: [
      tsconfigPaths({loose: true}),
      solid(),
    ],

    define: {
      'process.env.BABEL_TYPES_8_BREAKING': 'true',
    },  

    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
      minify: false,
      chunkSizeWarningLimit: 600,
      sourcemap: true,
      rollupOptions: {
        input: './src/client/main.tsx',
        output: {
          assetFileNames: "assets/[name][extname]",
          chunkFileNames: "assets/[name].js",
          entryFileNames: "assets/[name].js",
          manualChunks: () => "main.js"
        }
      }
    },

    optimizeDeps: {
      esbuildOptions: { target: 'esnext' }
    },

    test: {
      environmentMatchGlobs: [
        ['tests/client/**', 'jsdom'],
        ['tests/server/**', 'node'],
        ['tests/shared/**', 'node'],
      ],
      transformMode: { web: [/\.[jt]sx?$/] },
      threads: true,
      isolate: true,
      globals: true,
      include: ['./tests/{client,server,shared}/**/*.test.{ts,tsx}'],
    },

    // For @mhsdesign/jit-browser-tailwindcss. The library works without these but logs loads of warnings
    resolve: {
      conditions: ['development', 'browser'],
      alias: [
        {find: 'fs', replacement: resolve(dir, 'src/client/fake-modules.ts')},
        {find: 'path', replacement: resolve(dir, 'src/client/fake-modules.ts')},
        {find: 'source-map-js', replacement: resolve(dir, 'src/client/fake-modules.ts')},
        {find: 'url', replacement: resolve(dir, 'src/client/fake-modules.ts')},
      ]
    },

  }
})
