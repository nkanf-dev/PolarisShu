import { spawn } from 'bun';

const frontendProcess = spawn({
  cmd: ['bun', 'dev'],
  cwd: './frontend',
  stdout: 'inherit',
  stderr: 'inherit',
});

const backendProcess = spawn({
  cmd: ['cargo', 'watch', '-x', 'run'],
  cwd: './backend',
  stdout: 'inherit',
  stderr: 'inherit',
});

process.on('SIGINT', () => {
  frontendProcess.kill();
  backendProcess.kill();
  process.exit(0);
});
