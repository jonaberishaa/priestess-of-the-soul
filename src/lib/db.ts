import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

export function readJSON<T>(filename: string, fallback: T): T {
  const path = join(DATA_DIR, filename);
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(filename: string, data: T): void {
  const path = join(DATA_DIR, filename);
  ensureDir(path);
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}
