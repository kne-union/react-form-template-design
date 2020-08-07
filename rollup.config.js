import babel from 'rollup-plugin-babel'
import cssBundle from 'rollup-plugin-css-bundle'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

import path from 'path';
import pkg from './package.json'


import React from 'react';
import ReactIs from 'react-is';
import ReactDOM from 'react-dom';

export default [
    {
        input: 'lib/index.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            babel( {
                exclude: 'node_modules/**',
                runtimeHelpers: true
            } ),
            cssBundle( {
                include: ['**/*.scss'],
                output: path.resolve( 'dist/style.scss' )
            } ),
        ]
    },
    // {
    //     input: 'lib/index.js',
    //     output: [
    //         {
    //             file: pkg.umd,
    //             name: "ReactFormTempleteDesign",
    //             format: 'umd',
    //             sourcemap: true
    //         },
    //         {
    //             file: pkg['umd:min'],
    //             name: "ReactFormTempleteDesign",
    //             format: 'umd',
    //             sourcemap: true,
    //             plugins: [terser()]
    //         }
    //     ],
    //     plugins: [
    //         external(),
    //         babel( {
    //             exclude: 'node_modules/**',
    //             runtimeHelpers: true
    //         } ),
    //         cssBundle( {
    //             include: ['**/*.scss'],
    //             output: path.resolve( 'dist/style.scss' )
    //         } ),
    //         resolve({
    //         }),
    //         commonjs({
    //             include: /node_modules/,
    //             namedExports: {
    //                 'react-is': Object.keys(ReactIs),
    //                 'react': Object.keys(React),
    //                 'react-dom': Object.keys(ReactDOM),
    //             //     'styled-components': [ 'styled', 'css', 'ThemeProvider' ]
    //             }
    //         } ),
    //         json()
    //     ]
    // }
]
