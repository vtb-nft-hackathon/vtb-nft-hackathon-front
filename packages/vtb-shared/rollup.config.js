import path from 'path'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import autoprefixer from 'autoprefixer'
import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript2'
import postCSS from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'
import replace from '@rollup/plugin-replace'
// import flatDts from 'rollup-plugin-flat-dts';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import json from "@rollup/plugin-json";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      // format: 'cjs',
      format: 'esm',
      // sourcemap: true,
      // plugins: [flatDts({
      //   moduleName: 'cube-components',
      // })]
    },
    external: ['@radix-ui/themes', 'react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
      replace({
        values: {},
        preventAssignment: true,
      }),
      alias({
        entries: [
          {
            find: /^(src\/.+)$/,
            replacement: path.join(path.resolve(__dirname), '$1'),
          },
        ],
      }),
      svgr({
        prettier: false,
        svgo: false,
        svgoConfig: {
          plugins: [{ removeViewBox: false }],
        },
        titleProp: true,
        ref: true,
      }),
      commonjs(),
      typescript({
        typescript: require('typescript'),
        tsconfig: './tsconfig.json',
        // declaration: true,
        // declarationDir: 'dist',
      }),
      postCSS({
        extract: true,
        plugins: [autoprefixer()],
        minimize: true,
        modules: true,
      }),
      image(),
      copy({
        targets: [],
      }),
      terser(),
    ],
  },
  // {
  //   input: './src/index.ts',
  //   output: {
  //     format: 'esm',
  //     sourcemap: true,
  //     dir: 'types',
  //     // plugins: [flatDts({
  //     // })],
  //   },
  //   plugins: [
  //     commonjs(),
  //     json(),
  //     typescript({
  //       typescript: require('typescript'),
  //       tsconfig: './tsconfig.json',
  //       outDir: "./types"
  //       // declaration: true,
  //       // declarationDir: 'dist',
  //     }),
  //     nodeResolve(),
  //     flatDts()
  //   ],
  //   external: [/\.scss$/, /\.svg$/, /\.json$/, /\.css$/, /\.file$/, /dist\//, /types\//],
  // }
]
