import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = process.env.PORT || 3002;
const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // Normaliser og hold forespørselen innenfor public/
  const safePath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': TYPES[extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch {
    // SPA-fallback: ukjente stier får index.html
    filePath = join(PUBLIC_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': TYPES['.html'] });
    res.end(await readFile(filePath));
  }
}).listen(PORT, () => {
  console.log(`Skoen trykker kjører på http://localhost:${PORT}`);
});
