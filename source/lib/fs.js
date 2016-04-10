import {readdir as readdirFs, stat as fsStat} from 'fs';
import denodeify from 'denodeify';
import nodeGlob from 'glob';

export const glob = denodeify(nodeGlob);
export const readdir = denodeify(readdirFs);
export const stat = denodeify(fsStat);

const tryFn = (fn, returns = null) => {
	return async (...args) => {
		try {
			return await fn(...args);
		} catch (error) {
			return returns;
		}
	};
};

export const tryReaddir = tryFn(readdir, null);
export const tryStat = tryFn(stat, null);
export const tryGlob = tryFn(glob, []);
