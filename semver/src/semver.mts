import { getInput, setOutput, error, setFailed } from '@actions/core';
import semver, { type SemVer } from 'semver';

interface SemVerWithIdentifiers extends Pick<SemVer, 'version' | 'major' | 'minor' | 'patch'> {
	prerelease: string;
	prereleaseIdentifiers: ReadonlyArray<string | number>;
	build: string;
	buildIdentifiers: ReadonlyArray<String>;
}

function parseSemver(version: string): SemVerWithIdentifiers {
	try {
		const parsed = semver.parse(version, false, true);
		return {
			...parsed,
			prerelease: parsed.prerelease.join('.'),
			prereleaseIdentifiers: parsed.prerelease,
			build: parsed.build.join('.'),
			buildIdentifiers: parsed.build
		};
	} catch (err) {
		if (typeof err == 'string' || err instanceof Error) error(err);
		throw new Error(`Invalid semantic version: ${version}`);
	}
}

try {
	const version = getInput('version', { required: true });
	const parsed = parseSemver(version);

	setOutput('version', parsed.version);
	setOutput('major', parsed.major);
	setOutput('minor', parsed.minor);
	setOutput('patch', parsed.patch);
	setOutput('prerelease', parsed.prerelease);
	setOutput('prerelease-identifiers', parsed.prereleaseIdentifiers);
	setOutput('build', parsed.build);
	setOutput('build-identifiers', parsed.buildIdentifiers);
} catch (err) {
	if (typeof err == 'string' || err instanceof Error) setFailed(err);
	else setFailed('Unknown error');
}
