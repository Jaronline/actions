import { defineConfig, type UserConfig } from 'tsdown';

const baseOptions: UserConfig = {
	minify: true,
	target: 'node24'
};

export default [
	defineConfig({
		...baseOptions,
		tsconfig: 'semver/tsconfig.json',
		entry: ['semver/src/semver.mts'],
		outDir: 'semver/dist/'
	})
];
