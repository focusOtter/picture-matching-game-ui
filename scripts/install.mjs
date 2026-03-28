import { execSync } from 'child_process';

console.log('Installing dependencies...');
execSync('pnpm install', { 
  cwd: '/vercel/share/v0-project',
  stdio: 'inherit' 
});
console.log('Dependencies installed successfully!');
