import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
	input: 'src/main.ts',
	output: {
		file: 'test/bundle.js',
		format: 'umd',
		name: 'gameOfLife'
	},
	plugins: [typescript(), resolve(), commonjs(), serve(), livereload({watch: 'src'})]
};
