import { spawnSync } from 'bun';

const frontendBuild = spawnSync({
  cmd: ['bun', 'run', 'build'],
  cwd: './frontend',
  stdout: 'inherit',
  stderr: 'inherit',
});
if (frontendBuild.exitCode !== 0) {
  console.error("[ERROR] frontend build failed");
  process.exit(1);
}

const backendBuild = spawnSync({
  cmd: ['cargo', 'build', '--release'],
  cwd: './backend',
  stdout: 'inherit',
  stderr: 'inherit',
});
if (backendBuild.exitCode !== 0) {
  console.error("[ERROR] backend build failed");
  process.exit(1);
}
