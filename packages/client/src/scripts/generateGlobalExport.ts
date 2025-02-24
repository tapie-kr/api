import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SRC_DIR = resolve(__dirname, '..');
const excludeFiles = ['index.ts', 'index.tsx'];
const validExtensions = ['.ts', '.tsx'];

function getAllFiles(dir: string): string[] {
  const files: string[] = [];

  readdirSync(dir).forEach(file => {
    const fullPath = join(dir, file);

    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (
      validExtensions.some(ext => file.endsWith(ext)) &&
      !excludeFiles.includes(file) &&
      !file.endsWith('.test.ts') &&
      !file.endsWith('.test.tsx') &&
      !file.endsWith('.spec.ts') &&
      !file.endsWith('.spec.tsx')
    ) {
      files.push(fullPath);
    }
  });

  return files;
}

function generateExports(files: string[]): string {
  return files
    .map(file => {
      const relativePath = relative(SRC_DIR, file)
        .replace(/\.(ts|tsx)$/, '')
        .replace(/\\/g, '/');

      return `export * from './${relativePath}';`;
    })
    .join('\n');
}

function main() {
  const files = getAllFiles(SRC_DIR);
  const exportStatements = generateExports(files);
  const indexPath = join(SRC_DIR, 'index.ts');

  writeFileSync(indexPath, exportStatements + '\n');

}

main();
